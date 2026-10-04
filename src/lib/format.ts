export function formatMonth(date: Date | null) {
  return date
    ? date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        timeZone: "UTC",
      })
    : "Present"
}

export function formatDuration(start: Date, end: Date | null) {
  const to = end ?? new Date()
  const months =
    (to.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    to.getUTCMonth() -
    start.getUTCMonth() +
    1
  const years = Math.floor(months / 12)
  const rest = months % 12
  const plural = (n: number, unit: string) =>
    `${n} ${unit}${n === 1 ? "" : "s"}`
  if (!years) return plural(rest, "month")
  return rest
    ? `${plural(years, "year")}, ${plural(rest, "month")}`
    : plural(years, "year")
}

export function timeAgo(iso: string) {
  const days = Math.max(1, Math.round((Date.now() - Date.parse(iso)) / 864e5))
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  if (days < 30) return rtf.format(-days, "day")
  if (days < 365) return rtf.format(-Math.floor(days / 30), "month")
  return rtf.format(-Math.floor(days / 365), "year")
}
