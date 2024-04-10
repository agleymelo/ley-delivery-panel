type ProductStatusData = 'active' | 'inactive'

type ProductStatusProps = {
  status: ProductStatusData
}

const productStatusMap: Record<ProductStatusData, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
}

export function ProductStatus({ status }: ProductStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'active' && (
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
      )}

      {status === 'inactive' && (
        <span className="h-2 w-2 rounded-full bg-rose-400" />
      )}

      <span className="font-medium text-muted-foreground">
        {productStatusMap[status]}
      </span>
    </div>
  )
}
