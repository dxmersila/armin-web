import Navigation from './Navigation'
import HeaderActions from './HeaderActions'

export default function Header() {
  return (
    <header className="border-b p-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <h1 className="text-xl font-bold">
          Armin
        </h1>

        <div className="flex items-center gap-4">
          <Navigation />
          <HeaderActions />
        </div>
      </div>
    </header>
  )
}
