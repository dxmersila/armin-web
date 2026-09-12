import LanguageSwitcher from '@/components/language/LanguageSwitcher'
import ThemeToggle from '@/components/theme/ThemeToggle'

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  )
}
