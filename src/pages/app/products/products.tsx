import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getAllProducts } from '@/api/products/get-all-products'
import { Pagination } from '@/components/Pagination'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ProductsTableFilters } from './products-table-filters'
import { ProductTableRow } from './products-table-row'

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const productId = searchParams.get('productId')
  const name = searchParams.get('name')
  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: results } = useQuery({
    queryKey: ['products', productId, name, pageIndex],
    queryFn: () =>
      getAllProducts({
        productId,
        name,
        pageIndex,
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
      <Helmet title="Produtos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <ProductsTableFilters />

            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => navigate('/products/create')}
            >
              <Plus className="mr-2  h-4 w-4 " />
              Novo Produto
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="w-[164px]">Preço</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {results &&
                  results.products.map((product) => (
                    <ProductTableRow key={product.id} product={product} />
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
