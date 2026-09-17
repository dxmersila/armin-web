import { LoaderCircle } from 'lucide-react'

interface LoadingSpinnerProps {
  className?: string
}

export default function LoadingSpinner({
  className = 'size-4',
}: LoadingSpinnerProps) {
  return (
    <LoaderCircle
      className={`${className} animate-spin`}
      aria-hidden="true"
    />
  )
}
