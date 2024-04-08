import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getCategories } from '@/api/categories/get-categories'
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
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const categoryId = searchParams.get('categoryId')
  const name = searchParams.get('name')
  const status = searchParams.get('status')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: results } = useQuery({
    queryKey: ['categories', pageIndex, categoryId, name, status],
    queryFn: () =>
      getCategories({
        pageIndex,
        categoryId,
        name,
        status: status === 'all' ? null : status,
      }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prevState) => {
      prevState.set('page', (pageIndex + 1).toString())

      return prevState
    })
  }

  return (
    <>
      <Helmet title="Categorias" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <CategoriesTableFilter />

            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => navigate('/category/create')}
            >
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
                {results &&
                  results.categories.map((category) => (
                    <CategoriesTableRow key={category.id} category={category} />
                  ))}
              </TableBody>
            </Table>
          </div>

          {results && (
            <Pagination
              pageIndex={results.meta.pageIndex}
              totalCount={results.meta.totalCount}
              perPage={results.meta.perPage}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  )
}
