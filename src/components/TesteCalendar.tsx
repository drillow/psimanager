import React from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DateTimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
}

export function DateTimePicker({ date, setDate, className }: DateTimePickerProps) {
  const [selectedTab, setSelectedTab] = React.useState<"date" | "time">("date")

  // Store hour and minute as local state, derived from props initially
  const [hour, setHour] = React.useState(() => (date ? date.getHours().toString().padStart(2, "0") : "00"))
  const [minute, setMinute] = React.useState(() => (date ? date.getMinutes().toString().padStart(2, "0") : "00"))

  // Update local hour/minute when date prop changes
  React.useEffect(() => {
    if (date) {
      setHour(date.getHours().toString().padStart(2, "0"))
      setMinute(date.getMinutes().toString().padStart(2, "0"))
    }
  }, [date])

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(date || new Date())
      newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())

      // Keep the current time or set to default
      const hours = date ? date.getHours() : Number.parseInt(hour)
      const minutes = date ? date.getMinutes() : Number.parseInt(minute)
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      newDate.setSeconds(0)
      setDate(newDate)
      setSelectedTab("time")
    } else {
      setDate(undefined)
    }
  }

  // Handle time change separately from the useEffect
  const handleTimeChange = (newHour: string, newMinute: string) => {
    if (!date) return

    const newDate = new Date(date)
    newDate.setHours(Number.parseInt(newHour))
    newDate.setMinutes(Number.parseInt(newMinute))
    newDate.setSeconds(0)
    setDate(newDate)
  }

  // Generate hours (00-23)
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))

  // Generate minutes (00-59)
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPp") : <span>Selecione o dia e horário</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as "date" | "time")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="date">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Date
            </TabsTrigger>
            <TabsTrigger value="time">
              <Clock className="mr-2 h-4 w-4" />
              Time
            </TabsTrigger>
          </TabsList>
          <TabsContent value="date" className="p-0">
            <Calendar mode="single" selected={date} onSelect={handleSelect} initialFocus/>
          </TabsContent>
          <TabsContent value="time" className="p-4">
            <div className="flex items-center space-x-2">
              <div className="grid gap-1 text-center">
                <div className="text-sm font-medium">Hour</div>
                <Select
                  value={hour}
                  onValueChange={(newHour) => {
                    setHour(newHour)
                    handleTimeChange(newHour, minute)
                  }}
                  disabled={!date}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="Hour" />
                  </SelectTrigger>
                  <SelectContent className="h-56">
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-xl">:</div>
              <div className="grid gap-1 text-center">
                <div className="text-sm font-medium">Minute</div>
                <Select
                  value={minute}
                  onValueChange={(newMinute) => {
                    setMinute(newMinute)
                    handleTimeChange(hour, newMinute)
                  }}
                  disabled={!date}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="Minute" />
                  </SelectTrigger>
                  <SelectContent className="h-56">
                    {minutes.map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
