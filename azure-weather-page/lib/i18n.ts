export type Lang = "es" | "en"

export type Dict = {
  appName: string
  tagline: string
  searchPlaceholder: string
  searchButton: string
  searching: string
  feelsLike: string
  humidity: string
  wind: string
  pressure: string
  visibility: string
  uvIndex: string
  forecastTitle: string
  high: string
  low: string
  errorNotFound: string
  errorGeneric: string
  poweredBy: string
  emptyTitle: string
  emptySubtitle: string
  precipitation: string
  langName: string
}

export const dictionaries: Record<Lang, Dict> = {
  es: {
    appName: "Clima",
    tagline: "El tiempo, con claridad. Busca cualquier ciudad del mundo.",
    searchPlaceholder: "Buscar una ciudad...",
    searchButton: "Buscar",
    searching: "Buscando...",
    feelsLike: "Sensación térmica",
    humidity: "Humedad",
    wind: "Viento",
    pressure: "Presión",
    visibility: "Visibilidad",
    uvIndex: "Índice UV",
    forecastTitle: "Pronóstico de 5 días",
    high: "Máx",
    low: "Mín",
    errorNotFound: "No se encontró esa ciudad. Intenta con otro nombre.",
    errorGeneric: "Hubo un problema al obtener el clima. Inténtalo de nuevo.",
    poweredBy: "Datos de Azure Maps Weather",
    emptyTitle: "Busca el clima de cualquier ciudad",
    emptySubtitle: "Escribe el nombre de una ciudad arriba para ver el clima actual y el pronóstico.",
    precipitation: "Probabilidad de lluvia",
    langName: "Español",
  },
  en: {
    appName: "Weather",
    tagline: "The forecast, made clear. Search any city in the world.",
    searchPlaceholder: "Search a city...",
    searchButton: "Search",
    searching: "Searching...",
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    pressure: "Pressure",
    visibility: "Visibility",
    uvIndex: "UV index",
    forecastTitle: "5-day forecast",
    high: "High",
    low: "Low",
    errorNotFound: "Couldn't find that city. Try another name.",
    errorGeneric: "Something went wrong fetching the weather. Try again.",
    poweredBy: "Data from Azure Maps Weather",
    emptyTitle: "Search the weather for any city",
    emptySubtitle: "Type a city name above to see the current conditions and forecast.",
    precipitation: "Chance of rain",
    langName: "English",
  },
}
