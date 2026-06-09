"use client"

import type { FormEvent } from "react"
import { Search, Loader2, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Dict, Lang } from "@/lib/i18n"

export function SearchBar({
  value,
  onChange,
  onSubmit,
  loading,
  lang,
  onToggleLang,
  dict,
}: {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  loading: boolean
  lang: Lang
  onToggleLang: () => void
  dict: Dict
}) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={dict.searchPlaceholder}
          aria-label={dict.searchPlaceholder}
          className="h-13 w-full rounded-full border border-border bg-card pl-12 pr-4 py-3 text-base text-card-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit" size="lg" disabled={loading} className="h-13 rounded-full px-6 text-base">
          {loading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              {dict.searching}
            </>
          ) : (
            <>
              <Search className="size-5" />
              {dict.searchButton}
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onToggleLang}
          className="h-13 rounded-full px-4 text-base"
          aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
        >
          <Languages className="size-5" />
          {lang.toUpperCase()}
        </Button>
      </div>
    </form>
  )
}
