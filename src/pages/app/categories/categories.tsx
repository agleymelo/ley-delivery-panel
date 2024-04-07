import { Plus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/Pagination'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { CategoriesTableFilter } from './categories-table-filters'
import { CategoriesTableRow } from './categories-table-row'

export function Categories() {
  return (
    <>
      <Helmet title="Categorias" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <CategoriesTableFilter />

            <Button type="button" variant="outline" size="xs" className="">
              <Plus className="h-4 w-4 " />
              Nova categoria
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead className="w-[228px]">Status</TableHead>
                  <TableHead className="w-[228px]">
                    Quantidade de produtos
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Array.from({ length: 12 }).map((_, index) => {
                  return <CategoriesTableRow key={index} />
                })}
              </TableBody>
            </Table>
          </div>

          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  )
}
