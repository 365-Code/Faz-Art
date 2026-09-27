"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  Activity,
  Calendar,
  Eye,
  Filter,
  RefreshCw,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type TimeFilter = "today" | "week" | "month"

type VisitorStats = {
  totalVisitors: number
  activeVisitors: number
}

const FILTER_LABELS: Record<TimeFilter, string> = {
  today: "Today",
  week: "This Week",
  month: "This Month",
}

const FILTER_DESCRIPTIONS: Record<TimeFilter, string> = {
  today: "Visitors recorded today",
  week: "Visitors recorded this week",
  month: "Visitors recorded this month",
}

export default function Visitors() {
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("today")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const requestIdRef = useRef(0)

  const fetchStats = useCallback(async (signal?: AbortSignal) => {
    const requestId = ++requestIdRef.current

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/track?period=${timeFilter}`,
        {
          method: "GET",
          cache: "no-store",
          signal,
        }
      )

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()

      if (requestId !== requestIdRef.current) return

      setStats({
        totalVisitors: Number(data?.totalVisitors ?? 0),
        activeVisitors: Number(data?.activeVisitors ?? 0),
      })

      setLastUpdated(new Date())
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return
      }

      console.error("Error fetching visitor stats:", err)

      if (requestId === requestIdRef.current) {
        setError("Unable to load visitor statistics.")
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false)
      }
    }
  }, [timeFilter])

  useEffect(() => {
    const controller = new AbortController()

    fetchStats(controller.signal)

    const interval = window.setInterval(() => {
      fetchStats()
    }, 30_000)

    return () => {
      controller.abort()
      window.clearInterval(interval)
    }
  }, [fetchStats])

  const handleRefresh = () => {
    fetchStats()
  }

  const currentFilterLabel = FILTER_LABELS[timeFilter]

  const formattedLastUpdated = lastUpdated
    ? lastUpdated.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null

  return (
    <section className="py-8 md:py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>

              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                Visitor Analytics
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              Monitor visitor activity and engagement across your website.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Live status */}
            <div
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 dark:border-emerald-900/60 dark:bg-emerald-950/30"
              aria-label="Visitor data is updating automatically"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>

              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Live
              </span>
            </div>

            {/* Filter */}
            <Select
              value={timeFilter}
              onValueChange={(value) => setTimeFilter(value as TimeFilter)}
            >
              <SelectTrigger
                className="h-10 w-full bg-background sm:w-44"
                aria-label="Select visitor period"
              >
                <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="today">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Today
                  </div>
                </SelectItem>

                <SelectItem value="week">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    This Week
                  </div>
                </SelectItem>

                <SelectItem value="month">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    This Month
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-destructive">
                Something went wrong
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              Try Again
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Active Visitors */}
          <Card className="group overflow-hidden border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <CardContent className="relative p-6 md:p-7">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                    <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Active Visitors
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground/70">
                      Right now
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              <div
                className="mt-7"
                aria-live="polite"
                aria-busy={loading}
              >
                {loading && !stats ? (
                  <div className="h-12 w-24 animate-pulse rounded-lg bg-muted" />
                ) : (
                  <p className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
                    {(stats?.activeVisitors ?? 0).toLocaleString()}
                  </p>
                )}

                <p className="mt-2 text-sm text-muted-foreground">
                  Currently browsing your site
                </p>
              </div>

              <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-blue-500/5 blur-2xl transition-all duration-500 group-hover:scale-125" />
            </CardContent>
          </Card>

          {/* Total Visitors */}
          <Card className="group overflow-hidden border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <CardContent className="relative p-6 md:p-7">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                    <Eye className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Visitors
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground/70">
                      {FILTER_DESCRIPTIONS[timeFilter]}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  {currentFilterLabel}
                </span>
              </div>

              <div
                className="mt-7"
                aria-live="polite"
                aria-busy={loading}
              >
                {loading && !stats ? (
                  <div className="h-12 w-28 animate-pulse rounded-lg bg-muted" />
                ) : (
                  <p className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
                    {(stats?.totalVisitors ?? 0).toLocaleString()}
                  </p>
                )}

                <p className="mt-2 text-sm text-muted-foreground">
                  Unique visits {currentFilterLabel.toLowerCase()}
                </p>
              </div>

              <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-amber-500/5 blur-2xl transition-all duration-500 group-hover:scale-125" />
            </CardContent>
          </Card>
        </div>

        {/* Footer / Refresh */}
        <div className="flex flex-col items-center justify-between gap-3 border-t pt-5 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-xs text-muted-foreground">
              Automatically refreshes every 30 seconds
            </p>

            {formattedLastUpdated && (
              <p className="mt-1 text-xs text-muted-foreground/70">
                Last updated at {formattedLastUpdated}
              </p>
            )}
          </div>

          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={loading}
            className="min-w-32"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>
    </section>
  )
}