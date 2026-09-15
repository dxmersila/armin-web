'use client'

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { ChevronDown } from 'lucide-react'

export interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  value: string
  options: DropdownOption[]
  placeholder: string
  icon?: ReactNode
  onChange: (value: string) => void
  className?: string
}

export default function Dropdown({
  value,
  options,
  placeholder,
  icon,
  onChange,
  className = '',
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const selectedOption = options.find(
    (option) => option.value === value,
  )

  return (
    <div
      ref={containerRef}
      className={`relative min-w-0 ${className}`}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex h-11 w-full items-center gap-3 rounded-xl border border-border bg-surface px-3.5 text-sm font-medium text-foreground outline-none transition hover:border-foreground/20 focus:border-foreground/30 focus:ring-4 focus:ring-foreground/5"
      >
        {icon && (
          <span className="shrink-0 text-muted">
            {icon}
          </span>
        )}

        <span className="min-w-0 flex-1 truncate text-start">
          {selectedOption?.label ?? placeholder}
        </span>

        <ChevronDown
          className={[
            'size-4 shrink-0 text-muted transition-transform',
            open ? 'rotate-180' : '',
          ].join(' ')}
        />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-lg">
          <div className="dropdown-scrollbar max-h-[13.5rem] overflow-y-auto">
            {options.map((option) => {
              const selected = option.value === value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={[
                    'flex w-full items-center rounded-lg px-3 py-2.5 text-start text-sm transition',
                    selected
                      ? 'bg-foreground text-background'
                      : 'text-foreground hover:bg-surface-muted',
                  ].join(' ')}
                >
                  <span className="min-w-0 flex-1 truncate">
                    {option.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
