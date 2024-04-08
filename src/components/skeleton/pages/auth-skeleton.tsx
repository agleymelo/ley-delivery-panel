import { Skeleton } from '@/components/ui/skeleton'

export function AuthSkeleton() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <span className="font-semibold">Ley Delivery</span>
        </div>
        <footer className="text-sm">
          &copy; {new Date().getFullYear()} Ley Delivery - Painel de controle
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Skeleton className="h-6 w-32 " />
        <div className="p-8 ">
          <div className="flex w-[350px] flex-col justify-center gap-6">
            <div className="flex flex-col gap-2 text-center">
              <Skeleton className="h-10 w-full " />
              <Skeleton className="h-10 w-full " />
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-10 w-full " />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-10 w-full " />
              </div>

              <Skeleton className="h-12 w-full" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
