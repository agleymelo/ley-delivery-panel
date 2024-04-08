import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { deleteCategory } from '@/api/categories/delete-category'
import { showCategory } from '@/api/categories/show-category'
import { updateCategory } from '@/api/categories/update-category'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const categoryShowSchema = z.object({
  categoryId: z.string(),
  name: z.string(),
  status: z.enum(['active', 'inactive']),
})

type CategoryShowSchema = z.infer<typeof categoryShowSchema>

export function ShowCategory() {
  const { categoryId } = useParams()
  const navigate = useNavigate()

  const { data, isSuccess, failureCount } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => {
      return showCategory({ categoryId })
    },
  })

  const { mutateAsync: UpdateCategory } = useMutation({
    mutationFn: updateCategory,
  })

  const { mutateAsync: DeleteCategory } = useMutation({
    mutationFn: deleteCategory,
  })

  const { register, handleSubmit, reset, control } =
    useForm<CategoryShowSchema>({
      resolver: zodResolver(categoryShowSchema),
      defaultValues: {
        categoryId: data?.id ?? '',
        name: data?.name ?? '',
        status: data?.status ?? undefined,
      },
    })

  async function handleDeleteCategory() {
    if (window.confirm('Tem certeza que deseja deletar a categoria?')) {
      try {
        await DeleteCategory({
          categoryId: data?.id ?? '',
        })

        toast.success('Categoria deletada com sucesso!')
        navigate(-1)
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.data?.message) {
            toast.error('Categoria não existe!')
          }
          if (err.response?.status === 400) {
            toast.error('Erro ao deletar a categoria!')
          }
        }
      }
    }
  }

  async function handleUpdateCategory(data: CategoryShowSchema) {
    try {
      await UpdateCategory({
        categoryId: data.categoryId,
        name: data.name,
        status: data.status,
      })

      toast.success('Categoria atualizada com sucesso!')
      navigate(-1)
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data?.message) {
          toast.error('Categoria já existe!')
        }

        if (err.response?.status === 400) {
          toast.error('Erro ao atualizar a categoria!')
        }
      } else {
        throw err
      }
    }
  }

  useEffect(() => {
    if (isSuccess) {
      reset({
        categoryId: data?.id,
        name: data?.name,
        status: data?.status,
      })

      toast.success('Categoria carregada com sucesso!')

      return () => {
        reset()
      }
    }

    if (failureCount > 0) {
      toast.error('Erro ao carregar a categoria!')
    }

    return () => {
      reset()
    }
  }, [data, failureCount, isSuccess, reset])

  return (
    <>
      <Helmet title={`${data?.name ?? 'Caregando...'} - Category `} />

      {failureCount > 0 && <Navigate to="/categories" replace />}
      {isSuccess && (
        <div className="flex h-full flex-col gap-4">
          <Button
            variant="link"
            className="flex items-center gap-4 self-baseline p-0"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
            Voltar
          </Button>

          <h1 className="text-3xl font-bold tracking-tight">
            Categoria - {data?.name ?? 'Caregando...'}
          </h1>
          <div className="space-y-2.5">
            <form
              className="rounded-md border"
              onSubmit={handleSubmit(handleUpdateCategory)}
            >
              <div className="flex items-center justify-between gap-16 p-8">
                <div className="space-y-2">
                  <Label>ID</Label>
                  <Input
                    className="h-8 w-80"
                    readOnly
                    {...register('categoryId')}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input className="h-8 w-80" {...register('name')} />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>

                  <Controller
                    name="status"
                    control={control}
                    render={({
                      field: { name, onChange, value, disabled },
                    }) => {
                      return (
                        <Select
                          defaultValue={value}
                          name={name}
                          onValueChange={onChange}
                          value={value}
                          disabled={disabled}
                        >
                          <SelectTrigger className="h-8 w-80">
                            <SelectValue />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="active">Ativado</SelectItem>
                            <SelectItem value="inactive">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                      )
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-16 p-8">
                <Button
                  type="button"
                  className="w-full"
                  variant="destructive"
                  onClick={() => handleDeleteCategory()}
                >
                  Excluir
                </Button>
                <Button type="submit" className="w-full" variant="default">
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
