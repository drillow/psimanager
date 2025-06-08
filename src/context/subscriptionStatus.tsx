import { create } from 'zustand'

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

interface SubscriptionStatusContext {
  status: string
  changeStatus: (status: string) => void
}
export const useSubscriptionStatus = create<SubscriptionStatusContext>((set) => ({
  status: SubscriptionStatus.INACTIVE,
  changeStatus: (status: string) => set(() => ({ status })),
}))
