import { Box, GlassWater, Home, UtensilsCrossed } from 'lucide-react'

import { AccountMenu } from '../AccountMenu'
import { NavLink } from '../NavLink'
import { ThemeToggle } from '../theme/theme-toggle'
import { Separator } from '../ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <span>Ley Delivery</span>

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink to="/categories">
            <Box className="h-4 w-4" />
            Categorias
          </NavLink>
          <NavLink to="/products">
            <GlassWater className="h-4 w-4" />
            Produtos
          </NavLink>
          <NavLink to="/orders">
            <UtensilsCrossed className="h-4 w-4" />
            Pedidos
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
