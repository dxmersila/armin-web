'use client'

import { useEffect } from 'react'

import { recordVisit } from '@/lib/api/analyticsService'
import {
  getSessionId,
  getVisitorId,
} from '@/lib/analytics/session'

export default function AnalyticsTracker() {
  useEffect(() => {
    try {
      const visitorId = getVisitorId()
      const sessionId = getSessionId()

      void recordVisit(visitorId, sessionId).catch(() => {})
    } catch {
      // Analytics must not interfere with the application.
    }
  }, [])

  return null
}
