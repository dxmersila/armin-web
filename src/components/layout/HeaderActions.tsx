import LanguageSwitcher from '@/components/language/LanguageSwitcher'
import CartButton from '@/components/cart/CartButton'
import ThemeToggle from '@/components/theme/ThemeToggle'

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <CartButton />
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  )
}
