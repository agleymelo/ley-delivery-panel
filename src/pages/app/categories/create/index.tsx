import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createCategory } from '@/api/categories/create-category'
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

const createCategoryFormSchema = z.object({
  name: z.string().min(3).max(30),
  status: z.enum(['active', 'inactive']).default('active'),
})

type CreateCategoryFormSchema = z.infer<typeof createCategoryFormSchema>

export function CreateCategory() {
  const navigate = useNavigate()

  const { register, handleSubmit, control } = useForm<CreateCategoryFormSchema>(
    {
      resolver: zodResolver(createCategoryFormSchema),
    },
  )

  const { mutateAsync: CreateCategory } = useMutation({
    mutationFn: createCategory,
  })

  async function handleCreateCategory(data: CreateCategoryFormSchema) {
    try {
      await CreateCategory({
        name: data.name,
        status: data.status,
      })

      toast.success('Categoria criada com sucesso!')
      navigate(-1)
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data?.message) {
          toast.error('Categoria já existe!')
        }
        if (err.response?.status === 400) {
          toast.error('Erro ao criar a categoria!')
        }
      }
    }
  }

  return (
    <>
      <Helmet title="Nova Categoria" />

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
          Criar nova categoria
        </h1>
        <div className="space-y-2.5">
          <form
            className="rounded-md border"
            onSubmit={handleSubmit(handleCreateCategory)}
          >
            <div className="flex items-center justify-between gap-16 p-8">
              <div className="w-full space-y-2">
                <Label>Nome</Label>
                <Input className="h-8" {...register('name')} />
              </div>
              <div className=" w-full space-y-2">
                <Label>Status</Label>

                <Controller
                  name="status"
                  control={control}
                  render={({ field: { name, onChange, value, disabled } }) => {
                    return (
                      <Select
                        defaultValue="active"
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}
                      >
                        <SelectTrigger className="h-8">
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
              <Button type="submit" className="w-full" variant="default">
                Criar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
