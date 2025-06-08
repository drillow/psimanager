export const formatCellphone = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 2) return numbers
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
}

export const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 3) return numbers
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
  if (numbers.length <= 9)
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
}

export const formatCRP = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 2) return `CRP-${numbers}`
  return `CRP-${numbers.slice(0, 2)}/${numbers.slice(2, 7)}`
}
