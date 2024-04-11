import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import { ProductStatus } from './product-status'

type ProductTableRowProps = {
  product: {
    id: string
    name: string
    description?: string
    priceInCents: number
    images: string[]
  }
}

export function ProductTableRow({ product }: ProductTableRowProps) {
  const navigate = useNavigate()

  return (
    <TableRow>
      <TableCell>
        <Button
          variant="outline"
          size="xs"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes do produto</span>
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {product.id}
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell className="font-medium">
        {(product.priceInCents / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        <ProductStatus status="active" />
      </TableCell>
    </TableRow>
  )
}
