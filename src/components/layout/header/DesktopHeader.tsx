import HeaderActions from '@/components/layout/HeaderActions'
import Logo from '@/components/layout/Logo'
import Navigation from '@/components/layout/Navigation'
import UserMenu from '@/components/layout/UserMenu'

export default function DesktopHeader() {
  return (
    <div className="hidden min-h-16 items-center gap-6 md:flex">
      <Logo />

      <div className="flex flex-1 items-center justify-center">
        <Navigation />
      </div>

      <div className="flex items-center gap-2">
        <HeaderActions />
        <UserMenu />
      </div>
    </div>
  )
}
