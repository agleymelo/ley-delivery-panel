import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

export function CategoriesTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Button variant="outline" size="xs">
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes da categoria</span>
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        cluneq6c5000008l94tma83x8
      </TableCell>
      <TableCell className="font-medium">Cafés</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400"></span>
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell>07</TableCell>
    </TableRow>
  )
}
