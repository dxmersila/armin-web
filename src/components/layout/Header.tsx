import DesktopHeader from './header/DesktopHeader'
import MobileHeader from './header/MobileHeader'

export default function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <DesktopHeader />
        <MobileHeader />
      </div>
    </header>
  )
}
