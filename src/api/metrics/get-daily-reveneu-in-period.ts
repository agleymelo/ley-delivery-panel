import { api } from '@/lib/axios'

type GetDailyRevenueInPeriod = {
  dailyReceiptInPeriod: {
    date: number
    receipt: number
  }[]
}

type GetDailyRevenueInPeriodQuery = {
  from?: Date
  to?: Date
}

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) {
  const response = await api.get<GetDailyRevenueInPeriod>(
    '/metrics/admin/daily-revenue-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data.dailyReceiptInPeriod
}
