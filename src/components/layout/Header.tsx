import DesktopHeader from '@/components/layout/header/DesktopHeader'
import MobileHeader from '@/components/layout/header/MobileHeader'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <DesktopHeader />
        <MobileHeader />
      </div>
    </header>
  )
}
