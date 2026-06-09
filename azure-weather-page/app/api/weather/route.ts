import { type NextRequest, NextResponse } from "next/server"
import type { WeatherResult } from "@/lib/weather-types"

const BASE = "https://atlas.microsoft.com"

function iconFromCode(code: number): number {
  return code
}

export async function GET(req: NextRequest) {
  const key = process.env.AZURE_MAPS_KEY
  if (!key) {
    return NextResponse.json({ error: "missing_key" }, { status: 500 })
  }

  const city = req.nextUrl.searchParams.get("city")?.trim()
  const lat = req.nextUrl.searchParams.get("lat")
  const lon = req.nextUrl.searchParams.get("lon")
  const lang = req.nextUrl.searchParams.get("lang") === "en" ? "en-US" : "es-ES"

  try {
    let coordLat: number
    let coordLon: number
    let name = ""
    let country = ""

    if (lat && lon) {
      coordLat = Number.parseFloat(lat)
      coordLon = Number.parseFloat(lon)
      // Reverse geocode for a friendly name
      const revUrl = `${BASE}/search/address/reverse/json?api-version=1.0&query=${coordLat},${coordLon}&language=${lang}&subscription-key=${key}`
      const revRes = await fetch(revUrl)
      if (revRes.ok) {
        const revData = await revRes.json()
        const addr = revData?.addresses?.[0]?.address
        name = addr?.municipality || addr?.countrySubdivisionName || addr?.freeformAddress || "—"
        country = addr?.country || ""
      }
    } else if (city) {
      const geoUrl = `${BASE}/search/address/json?api-version=1.0&query=${encodeURIComponent(
        city,
      )}&language=${lang}&limit=1&subscription-key=${key}`
      const geoRes = await fetch(geoUrl)
      if (!geoRes.ok) {
        return NextResponse.json({ error: "generic" }, { status: 502 })
      }
      const geoData = await geoRes.json()
      const top = geoData?.results?.[0]
      if (!top) {
        return NextResponse.json({ error: "not_found" }, { status: 404 })
      }
      coordLat = top.position.lat
      coordLon = top.position.lon
      name = top.address?.municipality || top.address?.freeformAddress || city
      country = top.address?.country || ""
    } else {
      return NextResponse.json({ error: "generic" }, { status: 400 })
    }

    const query = `${coordLat},${coordLon}`
    const [currentRes, forecastRes] = await Promise.all([
      fetch(
        `${BASE}/weather/currentConditions/json?api-version=1.1&query=${query}&language=${lang}&details=true&subscription-key=${key}`,
      ),
      fetch(
        `${BASE}/weather/forecast/daily/json?api-version=1.1&query=${query}&duration=5&language=${lang}&subscription-key=${key}`,
      ),
    ])

    if (!currentRes.ok || !forecastRes.ok) {
      return NextResponse.json({ error: "generic" }, { status: 502 })
    }

    const currentData = await currentRes.json()
    const forecastData = await forecastRes.json()
    const c = currentData?.results?.[0]
    if (!c) {
      return NextResponse.json({ error: "generic" }, { status: 502 })
    }

    const result: WeatherResult = {
      location: { name, country, lat: coordLat, lon: coordLon },
      current: {
        temperature: Math.round(c.temperature?.value ?? 0),
        realFeel: Math.round(c.realFeelTemperature?.value ?? c.temperature?.value ?? 0),
        phrase: c.phrase ?? "",
        iconCode: iconFromCode(c.iconCode ?? 1),
        isDaytime: c.isDayTime ?? true,
        humidity: Math.round(c.relativeHumidity ?? 0),
        windSpeed: Math.round(c.wind?.speed?.value ?? 0),
        windDirection: c.wind?.direction?.localizedDescription ?? "",
        pressure: Math.round(c.pressure?.value ?? 0),
        visibility: Math.round(c.visibility?.value ?? 0),
        uvIndex: c.uvIndex ?? 0,
        uvPhrase: c.uvIndexPhrase ?? "",
      },
      forecast: (forecastData?.forecasts ?? []).map((f: any) => ({
        date: f.date,
        iconCode: iconFromCode(f.day?.iconCode ?? 1),
        phrase: f.day?.shortPhrase ?? f.day?.iconPhrase ?? "",
        tempMax: Math.round(f.temperature?.maximum?.value ?? 0),
        tempMin: Math.round(f.temperature?.minimum?.value ?? 0),
        precipProbability: f.day?.precipitationProbability ?? 0,
      })),
    }

    return NextResponse.json(result)
  } catch (err) {
    console.log("[v0] weather route error:", err instanceof Error ? err.message : err)
    return NextResponse.json({ error: "generic" }, { status: 500 })
  }
}
