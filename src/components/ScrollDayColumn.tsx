interface ScrollDayColumnProps {
  children: React.ReactNode
}

export const ScrollDayColumn: React.FC<ScrollDayColumnProps> = ({ children }) => {
  return <div className="flex flex-col gap-2 h-[735px] overflow-y-scroll">{children}</div>
}
