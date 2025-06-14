import { Checkbox } from '@/components/ui/checkbox'
import { CalendarEvent } from './WeekCalendar'
import { useToggleConsultStatus } from '@/service/consults/hooks'
import { QueryKeys } from '@/utils/queryKeys'
import { useQueryClient } from '@tanstack/react-query'

type CompleteCheckboxProps = {
  event: CalendarEvent
}

export const CompleteCheckbox: React.FC<CompleteCheckboxProps> = ({ event }) => {
  const queryClient = useQueryClient()

  const { execute } = useToggleConsultStatus(() => {
    queryClient.invalidateQueries({
      queryKey: QueryKeys.CONSULTS.DEFAULT,
    })
  })

  const handleOpen = () => {
    if (event.completed) {
      return execute({ consultId: event.id })
    }

    execute({ consultId: event.id })
  }

  return (
    <Checkbox
      className="bg-white"
      checked={event.completed}
      onClick={(e) => e.stopPropagation()} //
      onCheckedChange={() => handleOpen()}
    />
  )
}
