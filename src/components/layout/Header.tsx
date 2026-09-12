import HeaderActions from './HeaderActions'
import Logo from './Logo'
import Navigation from './Navigation'
import MobileMenu from './mobile/MobileMenu'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <Navigation />
        </div>

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
