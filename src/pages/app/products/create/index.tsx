import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ArrowLeft, Upload } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getCategories } from '@/api/categories/get-categories'
import { crateProduct } from '@/api/products/create-product'
import { deleteProduct } from '@/api/products/delete-product'
import { showProduct } from '@/api/products/show-product'
import { updatePhotoProduct } from '@/api/products/update-photo-product'
import { updateProduct } from '@/api/products/update-product'
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
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/axios'

const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  priceInCents: z.coerce.number(),
  categoryId: z.string(),
})

type CreateProductSchema = z.infer<typeof createProductSchema>

export function CreateProduct() {
  const navigate = useNavigate()

  const { mutateAsync: UpdatePhotoProduct } = useMutation({
    mutationFn: updatePhotoProduct,
  })

  const {
    register,
    handleSubmit,
    // reset,
    formState: { isSubmitting },
    control,
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  })

  const { data } = useQuery({
    queryKey: ['category-create-product'],
    queryFn: () =>
      getCategories({
        pageIndex: 0,
      }),
  })

  const { mutateAsync: CreateProduct } = useMutation({
    mutationFn: crateProduct,
  })

  const [imagem, setImagem] = useState('')
  const [imagemFile, setImagemFile] = useState<File | null>(null)

  async function handleCreateProduct(data: CreateProductSchema) {
    try {
      const { id } = await CreateProduct({
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        categoryId: data.categoryId,
      })

      if (imagemFile) {
        const formData = new FormData()

        formData.append('photo', imagemFile)

        await UpdatePhotoProduct({ id, formData })
      }

      toast.success('Produto criado com sucesso!')
      navigate(-1)
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data?.message) {
          toast.error('produto já existe!')
        }

        if (err.response?.status === 400) {
          toast.error('Erro ao criar o produto!')
        }
      } else {
        throw err
      }
    }
  }

  async function handleChangeImagemProduct(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    event.preventDefault()

    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setImagemFile(file)

    const imagePreview = URL.createObjectURL(file)
    setImagem(imagePreview)
  }

  return (
    <>
      <Helmet title={`Novo Produto `} />

      <div className="h-scull flex flex-col gap-4">
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
          Criar novo produto
        </h1>

        <div className="space-y-2.5">
          <form
            className="grid grid-cols-2 gap-4 rounded-md border px-8 py-4"
            onSubmit={handleSubmit(handleCreateProduct)}
          >
            <div className="mt-4">
              {!imagem ? (
                <img
                  src="https://via.placeholder.com/1024"
                  alt=""
                  className="h-96  w-full rounded-md object-cover"
                />
              ) : (
                <img
                  src={imagem}
                  alt=""
                  className="h-96  w-full rounded-md object-cover"
                />
              )}

              <div className="mt-8">
                <Label
                  htmlFor="photo"
                  className="relative flex items-center gap-4 rounded-md border px-4"
                >
                  <Upload />
                  Clique para atualizar a foto
                  <Input
                    id="photo"
                    type="file"
                    className="w-min border-none"
                    onChange={handleChangeImagemProduct}
                  />
                </Label>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="w-full space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  className="h-10 w-full"
                  {...register('name')}
                />
              </div>
              <div className="w-full space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  className="h-16 w-full"
                  {...register('description')}
                />
              </div>
              <div className="w-full space-y-2">
                <Label htmlFor="description">
                  Preço{' '}
                  <span className="text-xs text-foreground/70">
                    (Coloque o preço em centavos. Exemplo: 180 = R$ 1,80)
                  </span>
                </Label>
                <Input
                  id="name"
                  className="h-10 w-full"
                  type="number"
                  {...register('priceInCents')}
                />
              </div>
              <div className="w-full space-y-2">
                <Label htmlFor="categoryId">Categoria</Label>

                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field: { name, onChange, value, disabled } }) => {
                    return (
                      <Select
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {data?.categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )
                  }}
                />
              </div>

              <div className="mt-auto flex items-center justify-end gap-4">
                <Button
                  type="submit"
                  variant="default"
                  className="bg-emerald-500 px-8 py-4 hover:bg-emerald-600 dark:bg-emerald-400 dark:hover:bg-emerald-500"
                  disabled={isSubmitting}
                >
                  Criar novo produto
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
