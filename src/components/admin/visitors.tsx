"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Calendar, Filter, RefreshCw, Activity, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TimeFilter = "today" | "week" | "month"

export default function Visitors() {
  const [stats, setStats] = useState<{
    totalVisitors: number
    activeVisitors: number
  } | null>(null)
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("today")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/track?period=${timeFilter}`)
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error("Error fetching visitor stats:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    // Auto-refresh every 30 seconds for real-time data
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [timeFilter])

  const getFilterLabel = (filter: TimeFilter) => {
    switch (filter) {
      case "today":
        return "Today"
      case "week":
        return "This Week"
      case "month":
        return "This Month"
      default:
        return "Today"
    }
  }

  const handleRefresh = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/track?period=${timeFilter}`)
      const data = await res.json()
      setStats(data)
    } catch (err) {
      console.error("Error fetching visitor stats:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
        <div className="space-y-2">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Visitor Analytics
            </span>
          </h2>
          <p className="text-xl text-muted-foreground font-light">Real-time visitor tracking and engagement metrics</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Live Indicator */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Live Data</span>
          </div>

          {/* Time Filter */}
          <Select value={timeFilter} onValueChange={(value: TimeFilter) => setTimeFilter(value)}>
            <SelectTrigger className="w-44 bg-background/50 border-border/50">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Today</span>
                </div>
              </SelectItem>
              <SelectItem value="week">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>This Week</span>
                </div>
              </SelectItem>
              <SelectItem value="month">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>This Month</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Active Visitors Card */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20 shadow-lg hover:shadow-xl transition-all duration-500">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  Live
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-blue-700 dark:text-blue-400 font-medium text-lg">Active Visitors</p>
                <div className="flex items-baseline gap-2">
                  {loading ? (
                    <div className="h-12 w-20 bg-blue-200 dark:bg-blue-800 animate-pulse rounded-lg" />
                  ) : (
                    <span className="font-heading text-5xl font-bold text-blue-900 dark:text-blue-100">
                      {stats?.activeVisitors || 0}
                    </span>
                  )}
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">online now</span>
                </div>
              </div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-light">Currently browsing your site</p>
            </div>

            {/* Decorative gradient */}
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-2xl" />
          </CardContent>
        </Card>

        {/* Total Visitors Card */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50/50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/20 shadow-lg hover:shadow-xl transition-all duration-500">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <div className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                  {getFilterLabel(timeFilter)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-amber-700 dark:text-amber-400 font-medium text-lg">Total Visitors</p>
                <div className="flex items-baseline gap-2">
                  {loading ? (
                    <div className="h-12 w-24 bg-amber-200 dark:bg-amber-800 animate-pulse rounded-lg" />
                  ) : (
                    <span className="font-heading text-5xl font-bold text-amber-900 dark:text-amber-100">
                      {stats?.totalVisitors?.toLocaleString() || 0}
                    </span>
                  )}
                  <span className="text-amber-600 dark:text-amber-400 text-sm font-medium">visits</span>
                </div>
              </div>
              <p className="text-amber-600 dark:text-amber-400 text-sm font-light">
                Unique visits {getFilterLabel(timeFilter).toLowerCase()}
              </p>
            </div>

            {/* Decorative gradient */}
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full blur-2xl" />
          </CardContent>
        </Card>
      </div>

      {/* Action Section */}
      <div className="flex justify-center">
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="lg"
          className="bg-background/50 border-border/50 hover:bg-muted/50 transition-all duration-300"
          disabled={loading}
        >
          {loading ? <RefreshCw className="h-5 w-5 mr-2 animate-spin" /> : <TrendingUp className="h-5 w-5 mr-2" />}
          {loading ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>
    </div>
  )
}
