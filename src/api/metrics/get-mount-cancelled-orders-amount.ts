import { api } from '@/lib/axios'

type MonthCancelledOrdersAmountReply = {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthCancelledOrdersAmount() {
  const response = await api.get<MonthCancelledOrdersAmountReply>(
    '/metrics/admin/month-cancelled-orders-amount',
  )

  return response.data
}
