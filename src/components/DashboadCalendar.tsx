import {
  calculateNextDateByNumberOfDaysAfter,
  getFirstFourItems,
  meetingIsCompleted,
} from '@/utils/functions'
import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
import { Card } from '@/components/Card'
import { Ellipsis } from 'lucide-react'
import { EmptyColumn } from '@/components/EmptyColumn'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useNextTreeDaysConsults } from '@/service/consults/hooks'
import { useAuth } from '@/context/auth'
import { ACCESS_TOKEN_KEY } from '@/utils/constants'
import { toZonedTime } from 'date-fns-tz'
import { Skeleton } from './ui/skeleton'
import Cookies from 'universal-cookie'

export const DashboardCalendar = () => {
  const { user } = useAuth()
  const cookies = new Cookies()
  const { data, isLoading } = useNextTreeDaysConsults(
    user.id,
    !!cookies.get(ACCESS_TOKEN_KEY),
  )

  const token = cookies.get(ACCESS_TOKEN_KEY)

  if (!token) {
    return <p>Loading...</p>
  }

  const todayDate = calculateNextDateByNumberOfDaysAfter(0)
  const tomorrowDate = calculateNextDateByNumberOfDaysAfter(1)
  const inTwoDays = calculateNextDateByNumberOfDaysAfter(2)

  return (
    <div className="bg-slate-100 rounded-xl flex w-7/12 h-full p-4 gap-4">
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-400">Hoje</span>
          <span className="font-semibold text-xs text-zinc-700">
            {todayDate.date}
          </span>
        </div>
        <div className="flex flex-col gap-2 h-full">
          {isLoading ? (
            <>
              <Skeleton className="h-[119px]" />
              <Skeleton className="h-[119px]" />
              <Skeleton className="h-[119px]" />
            </>
          ) : (
            <>
              {data &&
                getFirstFourItems(data?.consults.today).map((consult) => (
                  <Card
                    key={consult.patientName}
                    patient={{
                      id: consult.id,
                      name: consult.patientName,
                      time: format(
                        toZonedTime(
                          parseISO(consult?.date),
                          '',
                        ),
                        'HH:mm',
                      ),
                      isOnline: consult.type === 'ONLINE',
                      url: consult.url,
                      place: consult.place,
                    }}
                    isCompleted={consult.completed}
                  />
                ))}
              {data && data?.consults.today?.length > 4 && (
                <Button variant={'link'} asChild>
                  <Link to="/weekly-consults">
                    <Ellipsis />
                  </Link>
                </Button>
              )}

              {data && data?.consults.today?.length === 0 && <EmptyColumn />}
            </>
          )}
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-400">Amanhã</span>
          <span className="font-semibold text-xs text-zinc-700">
            {tomorrowDate.date}
          </span>
        </div>
        <div className="flex flex-col gap-2 h-full">
          {isLoading ? (
            <>
              <Skeleton className="h-[119px]" />
              <Skeleton className="h-[119px]" />
              <Skeleton className="h-[119px]" />
              <Skeleton className="h-[119px]" />
            </>
          ) : (
            <>
              {data &&
                getFirstFourItems(data?.consults.tomorrow).map((consult) => (
                  <Card
                    key={consult.patientName}
                    patient={{
                      id: consult.id,
                      name: consult.patientName,
                      time: format(
                        toZonedTime(
                          parseISO(consult?.date),
                          '',
                        ),
                        'HH:mm',
                      ),
                      isOnline: consult.type === 'ONLINE',
                      url: consult.url,
                      place: consult.place,
                    }}
                    isCompleted={consult.completed}
                  />
                ))}
              {data && data?.consults.tomorrow?.length > 4 && (
                <Button variant={'link'} asChild>
                  <Link to="/weekly-consults">
                    <Ellipsis />
                  </Link>
                </Button>
              )}

              {data && data?.consults.tomorrow?.length === 0 && <EmptyColumn />}
            </>
          )}
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-400">Em 2 dias</span>
          <span className="font-semibold text-xs text-zinc-700">
            {inTwoDays.date}
          </span>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {isLoading ? (
            <>
              <Skeleton className="h-[119px]" />
              <Skeleton className="h-[119px]" />
            </>
          ) : (
            <>
              {data &&
                getFirstFourItems(data?.consults.inTwoDays).map((consult) => (
                  <Card
                    key={consult.patientName}
                    patient={{
                      id: consult.id,
                      name: consult.patientName,
                      time: format(
                        toZonedTime(parseISO(consult?.date), 'UTC'),
                        'HH:mm',
                      ),
                      isOnline: consult.type === 'ONLINE',
                      url: consult.url,
                      place: consult.place,
                    }}
                    isCompleted={consult.completed}
                  />
                ))}
              {data && data?.consults.inTwoDays?.length > 4 && (
                <Button variant={'link'} asChild>
                  <Link to="/weekly-consults">
                    <Ellipsis />
                  </Link>
                </Button>
              )}

              {data && data?.consults.inTwoDays?.length === 0 && (
                <EmptyColumn />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
