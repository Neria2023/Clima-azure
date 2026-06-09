export type WeatherDay = {
  date: string
  iconCode: number
  phrase: string
  tempMax: number
  tempMin: number
  precipProbability: number
}

export type WeatherResult = {
  location: {
    name: string
    country: string
    lat: number
    lon: number
  }
  current: {
    temperature: number
    realFeel: number
    phrase: string
    iconCode: number
    isDaytime: boolean
    humidity: number
    windSpeed: number
    windDirection: string
    pressure: number
    visibility: number
    uvIndex: number
    uvPhrase: string
  }
  forecast: WeatherDay[]
}
