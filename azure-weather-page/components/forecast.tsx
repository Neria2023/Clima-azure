import { Droplets } from "lucide-react"
import { WeatherIcon } from "@/components/weather-icon"
import type { Dict, Lang } from "@/lib/i18n"
import type { WeatherResult } from "@/lib/weather-types"

function formatDay(dateStr: string, lang: Lang) {
  const date = new Date(dateStr)
  const locale = lang === "es" ? "es-ES" : "en-US"
  const weekday = date.toLocaleDateString(locale, { weekday: "short" })
  const dayNum = date.toLocaleDateString(locale, { day: "numeric", month: "short" })
  return { weekday, dayNum }
}

export function Forecast({
  data,
  dict,
  lang,
}: {
  data: WeatherResult
  dict: Dict
  lang: Lang
}) {
  if (!data.forecast.length) return null

  return (
    <section aria-label={dict.forecastTitle} className="flex flex-col gap-4">
      <h2 className="font-serif text-2xl font-medium text-foreground">{dict.forecastTitle}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {data.forecast.map((day, i) => {
          const { weekday, dayNum } = formatDay(day.date, lang)
          return (
            <div
              key={day.date}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm lg:flex-col lg:items-center lg:gap-3 lg:text-center"
            >
              <div className="lg:order-1">
                <p className="text-sm font-semibold capitalize text-card-foreground">
                  {i === 0 ? (lang === "es" ? "Hoy" : "Today") : weekday}
                </p>
                <p className="text-xs capitalize text-muted-foreground">{dayNum}</p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-full bg-secondary/70 text-primary lg:order-2 lg:size-14">
                <WeatherIcon code={day.iconCode} className="size-7 lg:size-8" />
              </div>
              <p className="hidden text-xs text-muted-foreground lg:order-3 lg:block lg:min-h-8 lg:text-balance">
                {day.phrase}
              </p>
              <div className="flex items-center gap-2 lg:order-4">
                <span className="text-base font-semibold text-card-foreground">{day.tempMax}&deg;</span>
                <span className="text-base text-muted-foreground">{day.tempMin}&deg;</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-primary lg:order-5">
                <Droplets className="size-3.5" aria-hidden="true" />
                <span>{day.precipProbability}%</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
