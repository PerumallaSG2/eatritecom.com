// Simple, reusable components - keeping it DRY and maintainable

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
)

export const Button = ({ children, onClick, variant = "primary" as "primary" | "secondary" | "outline", className = "" }: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "outline"; className?: string }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors"
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
  }
  
  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export const Toggle = ({ enabled, onChange, label }: { enabled: boolean; onChange: (value: boolean) => void; label?: string }) => (
  <div className="flex items-center space-x-3">
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
    {label && <span className="text-sm text-gray-700">{label}</span>}
  </div>
)

export const PageHeader = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
    {description && <p className="text-gray-600">{description}</p>}
  </div>
)