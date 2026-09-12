import Logo from './Logo'
import Navigation from './Navigation'
import HeaderActions from './HeaderActions'

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Logo />

        <div className="flex items-center gap-6">
          <Navigation />
          <HeaderActions />
        </div>
      </div>
    </header>
  )
}
