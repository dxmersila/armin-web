'use client'

import { AlertTriangle, X } from 'lucide-react'

import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useTranslations } from '@/hooks/useTranslations'

interface ConfirmModalProps {
  open: boolean
  title: string
  description: string
  confirmLabel: string
  isConfirming?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel,
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const t = useTranslations()

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isConfirming) {
          onCancel()
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
      >
        <div className="p-6 sm:p-7">
          <button
            type="button"
            onClick={onCancel}
            disabled={isConfirming}
            aria-label={t('orders.closeModal')}
            className="absolute right-4 top-4 inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 rtl:left-4 rtl:right-auto"
          >
            <X className="size-4" />
          </button>

          <div className="flex size-11 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-500">
            <AlertTriangle className="size-5" />
          </div>

          <h2
            id="confirm-modal-title"
            className="mt-5 text-lg font-semibold tracking-tight text-foreground"
          >
            {title}
          </h2>

          <p
            id="confirm-modal-description"
            className="mt-2 text-sm leading-6 text-muted"
          >
            {description}
          </p>

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={isConfirming}
              className="inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-medium text-foreground transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t('orders.cancelModal')}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isConfirming}
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-500 px-5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isConfirming ? (
                <LoadingSpinner className="size-4" />
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
