import { Droplets, Wind, Gauge, Eye, Sun, Thermometer, MapPin } from "lucide-react"
import { WeatherIcon } from "@/components/weather-icon"
import type { Dict } from "@/lib/i18n"
import type { WeatherResult } from "@/lib/weather-types"

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-secondary/60 px-4 py-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-card text-primary">{icon}</div>
      <div className="min-w-0">
        <p className="truncate text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-card-foreground">{value}</p>
      </div>
    </div>
  )
}

export function CurrentWeather({ data, dict }: { data: WeatherResult; dict: Dict }) {
  const { location, current } = data

  return (
    <section
      aria-label={dict.appName}
      className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
    >
      <div className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4" aria-hidden="true" />
            <span className="text-sm font-medium">
              {location.name}
              {location.country ? `, ${location.country}` : ""}
            </span>
          </div>
          <div className="flex items-end gap-3">
            <span className="font-serif text-7xl font-light leading-none tracking-tight text-card-foreground sm:text-8xl">
              {current.temperature}&deg;
            </span>
          </div>
          <p className="text-lg text-card-foreground">{current.phrase}</p>
          <p className="text-sm text-muted-foreground">
            {dict.feelsLike} {current.realFeel}&deg;
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex size-32 items-center justify-center rounded-full bg-secondary/70 text-primary sm:size-40">
            <WeatherIcon code={current.iconCode} className="size-20 sm:size-24" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-border p-6 sm:grid-cols-3 sm:p-8 lg:grid-cols-6">
        <Metric
          icon={<Thermometer className="size-5" />}
          label={dict.feelsLike}
          value={`${current.realFeel}°`}
        />
        <Metric icon={<Droplets className="size-5" />} label={dict.humidity} value={`${current.humidity}%`} />
        <Metric
          icon={<Wind className="size-5" />}
          label={dict.wind}
          value={`${current.windSpeed} km/h`}
        />
        <Metric
          icon={<Gauge className="size-5" />}
          label={dict.pressure}
          value={`${current.pressure} mb`}
        />
        <Metric
          icon={<Eye className="size-5" />}
          label={dict.visibility}
          value={`${current.visibility} km`}
        />
        <Metric
          icon={<Sun className="size-5" />}
          label={dict.uvIndex}
          value={current.uvPhrase ? `${current.uvIndex} · ${current.uvPhrase}` : `${current.uvIndex}`}
        />
      </div>
    </section>
  )
}
