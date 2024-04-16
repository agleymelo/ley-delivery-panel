import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ArrowLeft, Upload } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { deleteProduct } from '@/api/products/delete-product'
import { showProduct } from '@/api/products/show-product'
import { updatePhotoProduct } from '@/api/products/update-photo-product'
import { updateProduct } from '@/api/products/update-product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/axios'

const updateProductSchema = z.object({
  productId: z.string(),
  name: z.string(),
  description: z.string(),
  priceInCents: z.coerce.number(),
})

type UpdateProductSchema = z.infer<typeof updateProductSchema>

export function ShowProduct() {
  const { productId } = useParams()
  const navigate = useNavigate()

  const { data, isSuccess } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => {
      return showProduct({ productId })
    },
  })

  const { mutateAsync: UpdateProduct } = useMutation({
    mutationFn: updateProduct,
  })

  const { mutateAsync: UpdatePhotoProduct } = useMutation({
    mutationFn: updatePhotoProduct,
  })

  const { mutateAsync: DeleteProduct } = useMutation({
    mutationFn: deleteProduct,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      productId: data?.id ?? '',
      name: data?.name ?? '',
      description: data?.description ?? '',
      priceInCents: data?.priceInCents ?? undefined,
    },
  })

  const [imagem, setImagem] = useState('https://via.placeholder.com/1024')
  const [imagemFile, setImagemFile] = useState<File | null>(null)

  async function handleUpdateProduct(data: UpdateProductSchema) {
    try {
      if (imagemFile) {
        const formData = new FormData()
        formData.append('photo', imagemFile)

        await UpdatePhotoProduct({ id: data.productId, formData })
      }

      await UpdateProduct({
        id: data.productId,
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
      })

      toast.success('Produto atualizado com sucesso!')

      navigate(-1)
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data?.message) {
          toast.error('produto já existe!')
        }

        if (err.response?.status === 400) {
          toast.error('Erro ao atualizar o produto!')
        }
      } else {
        throw err
      }
    }
  }

  async function handleDeleteProduct() {
    if (window.confirm('Tem certeza que deseja deletar o produto?')) {
      try {
        await DeleteProduct({
          productId: data?.id ?? '',
        })

        toast.success('Produto deletado com sucesso!')
        navigate(-1)
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.data?.message) {
            toast.error('Produto não existe!')
          }
          if (err.response?.status === 400) {
            toast.error('Erro ao deletar o produto!')
          }
        }
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

  useEffect(() => {
    if (isSuccess) {
      reset({
        productId: data.id,
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
      })

      if (!data?.images) {
        setImagem(' https://via.placeholder.com/1024')
        return
      }

      setImagem(data?.images[0])

      toast.success('Produto carregado com sucesso!')

      return () => {
        reset()
      }
    }
  }, [data, isSuccess, reset])

  return (
    <>
      <Helmet title={`${data?.name ?? 'Caregando...'} - Produto `} />

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
          Produto - {data?.name ?? 'Caregando...'}
        </h1>

        <div className="space-y-2.5">
          <form
            className="grid grid-cols-2 gap-4 rounded-md border px-8 py-4"
            onSubmit={handleSubmit(handleUpdateProduct)}
          >
            <div className="mt-4">
              {!imagem ? (
                <img
                  src="https://via.placeholder.com/1024"
                  alt={data?.name}
                  className="h-96  w-full rounded-md object-cover"
                />
              ) : (
                <img
                  src={imagem}
                  alt={data?.name}
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
                <Label htmlFor="id">ID</Label>
                <Input
                  id="id"
                  className="h-10 w-full"
                  readOnly
                  {...register('productId')}
                />
              </div>
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

              <div className="mt-auto flex items-center justify-end gap-4">
                <Button
                  type="button"
                  variant="destructive"
                  className="px-8 py-4"
                  onClick={() => handleDeleteProduct()}
                >
                  Excluir
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  className="bg-emerald-500 px-8 py-4 hover:bg-emerald-600 dark:bg-emerald-400 dark:hover:bg-emerald-500"
                  disabled={isSubmitting}
                >
                  Salvar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
