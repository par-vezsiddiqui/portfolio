import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export function Button({ to, children, secondary = false, className = '', ...props }) {
  const baseStyles = 'button'
  const variantStyles = secondary ? 'button-ghost' : 'button-primary'
  const combinedClassName = `${baseStyles} ${variantStyles} ${className}`.trim()
  
  if (to) {
    return (
      <Link className={combinedClassName} to={to} {...props}>
        {children}
        <ArrowUpRight size={16} />
      </Link>
    )
  }
  
  return (
    <button className={combinedClassName} {...props}>
      {children}
      <ArrowUpRight size={16} />
    </button>
  )
}
