import CartButton from '@/components/cart/CartButton'
import HeaderUserMenu from '@/components/layout/HeaderUserMenu'
import LanguageSwitcher from '@/components/language/LanguageSwitcher'
import Logo from '@/components/layout/Logo'
import Navigation from '@/components/layout/Navigation'
import ThemeToggle from '@/components/theme/ThemeToggle'

export default function DesktopHeader() {
  return (
    <div className="hidden min-h-16 items-center justify-between gap-8 md:flex">
      <div className="flex items-center gap-5">
        <Logo />
        <Navigation />

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <CartButton />
        <HeaderUserMenu />
      </div>
    </div>
  )
}
