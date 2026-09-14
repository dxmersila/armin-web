import HeaderActions from '@/components/layout/HeaderActions'
import Logo from '@/components/layout/Logo'
import Navigation from '@/components/layout/Navigation'
import UserMenu from '@/components/layout/UserMenu'

export default function DesktopHeader() {
  return (
    <div className="hidden min-h-16 items-center justify-between gap-8 md:flex">
      <div className="flex min-w-0 items-center gap-8">
        <Logo />
        <Navigation />
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <HeaderActions />
        <UserMenu />
      </div>
    </div>
  )
}
