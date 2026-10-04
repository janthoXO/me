export function SectionHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="reveal flex flex-col items-center gap-3 text-center">
      <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
    </div>
  )
}
