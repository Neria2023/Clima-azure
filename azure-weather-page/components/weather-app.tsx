"use client"

import { useCallback, useEffect, useState } from "react"
import { CloudSun, AlertCircle, Cloud } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { CurrentWeather } from "@/components/current-weather"
import { Forecast } from "@/components/forecast"
import { dictionaries, type Lang } from "@/lib/i18n"
import type { WeatherResult } from "@/lib/weather-types"

export function WeatherApp() {
  const [lang, setLang] = useState<Lang>("es")
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<WeatherResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const dict = dictionaries[lang]

  const fetchWeather = useCallback(
    async (params: { city?: string; lang: Lang }) => {
      if (!params.city) return
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/weather?city=${encodeURIComponent(params.city)}&lang=${params.lang}`)
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          setData(null)
          setError(body?.error === "not_found" ? dictionaries[params.lang].errorNotFound : dictionaries[params.lang].errorGeneric)
          return
        }
        const result: WeatherResult = await res.json()
        setData(result)
      } catch {
        setData(null)
        setError(dictionaries[params.lang].errorGeneric)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  // Load a default city on first mount.
  useEffect(() => {
    setQuery("Madrid")
    fetchWeather({ city: "Madrid", lang: "es" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSearch() {
    const trimmed = query.trim()
    if (trimmed) fetchWeather({ city: trimmed, lang })
  }

  function toggleLang() {
    const next: Lang = lang === "es" ? "en" : "es"
    setLang(next)
    // Re-fetch in the new language so phrases/labels update.
    if (data) fetchWeather({ city: data.location.name, lang: next })
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <CloudSun className="size-6" aria-hidden="true" />
          </span>
          <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">{dict.appName}</span>
        </div>
        <h1 className="max-w-xl text-balance font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
          {dict.tagline}
        </h1>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={handleSearch}
        loading={loading}
        lang={lang}
        onToggleLang={toggleLang}
        dict={dict}
      />

      {error && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 px-5 py-4 text-sm text-destructive"
        >
          <AlertCircle className="size-5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {!data && !error && !loading && (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <Cloud className="size-12 text-muted-foreground" aria-hidden="true" />
          <h2 className="font-serif text-xl font-medium text-foreground">{dict.emptyTitle}</h2>
          <p className="max-w-sm text-pretty text-sm text-muted-foreground">{dict.emptySubtitle}</p>
        </div>
      )}

      {data && (
        <div className="flex flex-col gap-8">
          <CurrentWeather data={data} dict={dict} />
          <Forecast data={data} dict={dict} lang={lang} />
        </div>
      )}

      <footer className="mt-auto pt-6 text-center text-xs text-muted-foreground">{dict.poweredBy}</footer>
    </main>
  )
}
