import HeaderActions from '@/components/layout/HeaderActions'
import Logo from '@/components/layout/Logo'
import MobileMenu from '@/components/layout/mobile/MobileMenu'

export default function MobileHeader() {
  return (
    <div className="flex min-h-14 items-center justify-between md:hidden">
      <div className="flex items-center gap-2">
        <MobileMenu />
        <Logo />
      </div>

      <HeaderActions />
    </div>
  )
}
