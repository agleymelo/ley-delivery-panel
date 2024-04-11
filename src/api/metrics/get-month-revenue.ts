import { api } from '@/lib/axios'

type GetMonthRevenueReply = {
  receipt: number
  diffFromLastMonth: number
}

export async function getMonthRevenue() {
  const response = await api.get<GetMonthRevenueReply>(
    '/metrics/admin/month-revenue',
  )

  return response.data
}
