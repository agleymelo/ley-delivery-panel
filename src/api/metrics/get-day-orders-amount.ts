import { api } from '@/lib/axios'

type GetDayOrdersAmountReply = {
  amount: number
  diffFromYesterday: number
}

export async function getDayOrdersAmount() {
  const response = await api.get<GetDayOrdersAmountReply>(
    '/metrics/admin/day-orders-amount',
  )

  return response.data
}
