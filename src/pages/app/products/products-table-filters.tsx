import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const productsFiltersSchema = z.object({
  productId: z.string().optional(),
  name: z.string().optional(),
})

type ProductsFilterSchema = z.infer<typeof productsFiltersSchema>

export function ProductsTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const productId = searchParams.get('productId')
  const name = searchParams.get('name')

  const { register, handleSubmit } = useForm<ProductsFilterSchema>({
    resolver: zodResolver(productsFiltersSchema),
    defaultValues: {
      productId: productId ?? '',
      name: name ?? '',
    },
  })

  async function handleFilter({ productId, name }: ProductsFilterSchema) {
    setSearchParams((prevState) => {
      if (productId) {
        prevState.set('productId', productId)
      } else {
        prevState.delete('productId')
      }

      if (name) {
        prevState.set('name', name)
      } else {
        prevState.delete('name')
      }

      return prevState
    })
  }

  async function handleClearFilters() {
    setSearchParams((prevState) => {
      prevState.delete('productId')
      prevState.delete('name')
      prevState.set('page', '1')

      return prevState
    })
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID do produto"
        className="h-8 w-[320px]"
        {...register('productId')}
      />
      <Input
        placeholder="Nome do produto"
        className="h-8 w-[320px]"
        {...register('name')}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover Filtros
      </Button>
    </form>
  )
}
