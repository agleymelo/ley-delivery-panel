import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthCancelledOrdersAmount } from '@/api/metrics/get-mount-cancelled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthCanceledOrdersAmount() {
  const { data: MonthCancelledOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-cancelled-orders-amount'],
    queryFn: getMonthCancelledOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {MonthCancelledOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {isNaN(MonthCancelledOrdersAmount.amount)
                ? 0
                : MonthCancelledOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              {MonthCancelledOrdersAmount.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {MonthCancelledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  relação ao mês anterior
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{MonthCancelledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  relação ao mês anterior
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
