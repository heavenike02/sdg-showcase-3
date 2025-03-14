interface SectionHeadingProps {
  title: string
  subtitle: string
  center?: boolean
  description?: string
}

export function SectionHeading({
  title,
  subtitle,
  center = false,
  description
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col space-y-3 mb-8 ${center ? 'text-center' : ''}`}>
      <div className={`flex items-center ${center ? 'justify-center' : ''}`}>
        <span className="dot-indicator"></span>
        <div className="w-2 h-2 rounded-full bg-primary mx-2"></div>
        <span className="text-sm font-medium text-foreground">{subtitle}</span>
      </div>
      <h2 className="text-3xl md:text-4xl">{title}</h2>
      {description && (
        <p className={`text-muted-foreground ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </div>
  )
} 