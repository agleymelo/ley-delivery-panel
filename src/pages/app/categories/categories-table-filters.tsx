import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const categoriesFiltersSchema = z.object({
  categoryId: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
})

type CategoriesFilterSchema = z.infer<typeof categoriesFiltersSchema>

export function CategoriesTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryId = searchParams.get('categoryId')
  const name = searchParams.get('name')
  const status = searchParams.get('status')

  const { register, handleSubmit, control } = useForm<CategoriesFilterSchema>({
    resolver: zodResolver(categoriesFiltersSchema),
    defaultValues: {
      categoryId: categoryId ?? '',
      name: name ?? '',
      status: status ?? '',
    },
  })

  function handleClearFilters() {
    setSearchParams((prevState) => {
      prevState.delete('categoryId')
      prevState.delete('name')
      prevState.delete('status')
      prevState.set('page', '1')

      return prevState
    })
  }

  function handleFilter({ categoryId, name, status }: CategoriesFilterSchema) {
    setSearchParams((prevState) => {
      if (categoryId) {
        prevState.set('categoryId', categoryId)
      } else {
        prevState.delete('categoryId')
      }

      if (name) {
        prevState.set('name', name)
      } else {
        prevState.delete('name')
      }

      if (status) {
        prevState.set('status', status)
      } else {
        prevState.delete('status')
      }

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
        placeholder="ID da categoria"
        className="h-8 w-[320px]"
        {...register('categoryId')}
      />
      <Input
        placeholder="Nome da categoria"
        className="h-8 w-[320px]"
        {...register('name')}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativado</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
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
