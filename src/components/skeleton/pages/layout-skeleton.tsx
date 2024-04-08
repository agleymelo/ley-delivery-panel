import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function LayoutSkeleton() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <div className="border-b">
        <div className="flex h-16 items-center gap-6 px-6">
          <span>Ley Delivery</span>

          <Separator orientation="vertical" className="h-6" />

          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Skeleton className="h-6 w-32 " />
            <Skeleton className="h-6 w-32 " />
            <Skeleton className="h-6 w-32 " />
            <Skeleton className="h-6 w-32 " />
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Skeleton className="h-12 w-12 " />
            <Skeleton className="h-12  w-32     " />
          </div>
        </div>
      </div>
    </div>
  )
}
