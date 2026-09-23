import type { ButtonHTMLAttributes } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export default function Button({
  children,
  className = '',
  disabled,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-16px_rgba(124,58,237,0.9)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-16px_rgba(124,58,237,0.95)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none ${className}`}
    >
      {isLoading ? <LoadingSpinner className="size-5" /> : children}
    </button>
  )
}
