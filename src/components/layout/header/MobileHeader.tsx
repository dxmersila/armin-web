import HeaderActions from '@/components/layout/HeaderActions'
import Logo from '@/components/layout/Logo'
import MobileMenu from '@/components/layout/mobile/MobileMenu'

export default function MobileHeader() {
  return (
    <div className="flex min-h-14 items-center justify-between gap-4 md:hidden">
      <Logo />

      <div className="relative flex items-center gap-2">
        <HeaderActions />
        <MobileMenu />
      </div>
    </div>
  )
}
