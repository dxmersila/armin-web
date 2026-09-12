import Navigation from './Navigation'

export default function Header() {
  return (
    <header className="border-b p-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <h1 className="text-xl font-bold">
          Armin
        </h1>

        <Navigation />
      </div>
    </header>
  )
}
