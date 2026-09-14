import HeaderActions from '@/components/layout/HeaderActions'
import Logo from '@/components/layout/Logo'
import Navigation from '@/components/layout/Navigation'
import HeaderUserMenu from '@/components/layout/HeaderUserMenu'

export default function DesktopHeader() {
  return (
    <div className="hidden min-h-16 items-center justify-between gap-8 md:flex">
      <div className="flex items-center gap-8">
        <Logo />
        <Navigation />
      </div>

      <div className="flex items-center gap-3">
        <HeaderActions />
        <HeaderUserMenu />
      </div>
    </div>
  )
}
