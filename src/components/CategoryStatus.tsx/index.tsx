type CategoryStatusData = 'active' | 'inactive'

type CategoryStatusProps = {
  status: CategoryStatusData
}

const categoryStatusMap: Record<CategoryStatusData, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
}

export function CategoryStatus({ status }: CategoryStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'active' && (
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
      )}

      {status === 'inactive' && (
        <span className="h-2 w-2 rounded-full bg-rose-400" />
      )}

      <span className="font-medium text-muted-foreground">
        {categoryStatusMap[status]}
      </span>
    </div>
  )
}
