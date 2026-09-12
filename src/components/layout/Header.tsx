import HeaderActions from './HeaderActions'
import Logo from './Logo'
import Navigation from './Navigation'
import MobileMenu from './mobile/MobileMenu'

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Logo />

        <Navigation />

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <HeaderActions />
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
