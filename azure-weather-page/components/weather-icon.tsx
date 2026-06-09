import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  Cloudy,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudLightning,
  CloudSnow,
  Snowflake,
  Wind,
  type LucideIcon,
} from "lucide-react"

// Maps Azure Maps Weather iconCode (1-44) to a Lucide icon.
const ICON_MAP: Record<number, LucideIcon> = {
  1: Sun, // Sunny
  2: Sun, // Mostly Sunny
  3: CloudSun, // Partly Sunny
  4: CloudSun, // Intermittent Clouds
  5: CloudSun, // Hazy Sunshine
  6: Cloudy, // Mostly Cloudy
  7: Cloud, // Cloudy
  8: Cloud, // Dreary (Overcast)
  11: CloudFog, // Fog
  12: CloudRain, // Showers
  13: CloudSun, // Mostly Cloudy w/ Showers
  14: CloudSun, // Partly Sunny w/ Showers
  15: CloudLightning, // T-Storms
  16: CloudLightning, // Mostly Cloudy w/ T-Storms
  17: CloudLightning, // Partly Sunny w/ T-Storms
  18: CloudRainWind, // Rain
  19: CloudSnow, // Flurries
  20: CloudSnow, // Mostly Cloudy w/ Flurries
  21: CloudSnow, // Partly Sunny w/ Flurries
  22: Snowflake, // Snow
  23: Snowflake, // Mostly Cloudy w/ Snow
  24: Snowflake, // Ice
  25: CloudSnow, // Sleet
  26: CloudDrizzle, // Freezing Rain
  29: CloudSnow, // Rain and Snow
  30: Sun, // Hot
  31: Snowflake, // Cold
  32: Wind, // Windy
  33: Moon, // Clear (night)
  34: Moon, // Mostly Clear (night)
  35: CloudMoon, // Partly Cloudy (night)
  36: CloudMoon, // Intermittent Clouds (night)
  37: CloudMoon, // Hazy Moonlight
  38: Cloudy, // Mostly Cloudy (night)
  39: CloudMoon, // Partly Cloudy w/ Showers (night)
  40: CloudMoon, // Mostly Cloudy w/ Showers (night)
  41: CloudLightning, // Partly Cloudy w/ T-Storms (night)
  42: CloudLightning, // Mostly Cloudy w/ T-Storms (night)
  43: CloudSnow, // Mostly Cloudy w/ Flurries (night)
  44: Snowflake, // Mostly Cloudy w/ Snow (night)
}

export function WeatherIcon({ code, className }: { code: number; className?: string }) {
  const Icon = ICON_MAP[code] ?? Cloud
  return <Icon className={className} aria-hidden="true" />
}
