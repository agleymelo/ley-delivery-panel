import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { CategoryStatus } from '@/components/CategoryStatus.tsx'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

type CategoriesTableRowProps = {
  category: {
    id: string
    name: string
    status: 'active' | 'inactive'
  }
}

export function CategoriesTableRow({ category }: CategoriesTableRowProps) {
  const navigate = useNavigate()

  return (
    <TableRow>
      <TableCell>
        <Button
          variant="outline"
          size="xs"
          onClick={() => navigate(`/category/${category.id}`)}
        >
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes da categoria</span>
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {category.id}
      </TableCell>
      <TableCell className="font-medium">{category.name}</TableCell>
      <TableCell>
        <CategoryStatus status={category.status} />
      </TableCell>
      <TableCell>Em breve</TableCell>
    </TableRow>
  )
}
