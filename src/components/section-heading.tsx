import { ChalkUnderline } from "@/components/chalk"

export function SectionHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="reveal flex flex-col items-center gap-3 text-center">
      <h2 className="-rotate-1 chalk text-5xl md:text-6xl">{title}</h2>
      <ChalkUnderline className="chalk-draw -mt-2 w-48" />
      <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
    </div>
  )
}
