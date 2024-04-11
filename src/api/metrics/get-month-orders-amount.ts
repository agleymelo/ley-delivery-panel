import { api } from '@/lib/axios'

type GetMonthOrderAmountReply = {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthOrdersAmount() {
  const response = await api.get<GetMonthOrderAmountReply>(
    '/metrics/admin/month-orders-amount',
  )

  return response.data
}
