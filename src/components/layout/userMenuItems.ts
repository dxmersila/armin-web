import {
  CreditCard,
  Library,
  LogIn,
  ShoppingBag,
  User,
} from 'lucide-react'

export const userMenuItems = {
  guest: {
    subscription: {
      href: '/subscription',
      icon: CreditCard,
      label: 'subscription.title',
    },
    login: {
      href: '/login',
      icon: LogIn,
      label: 'common.login',
    },
    register: {
      href: '/register',
      icon: User,
      label: 'common.register',
    },
  },
  authenticated: {
    account: {
      href: '/account',
      icon: User,
      label: 'common.account',
    },
    library: {
      href: '/library',
      icon: Library,
      label: 'common.library',
    },
    orders: {
      href: '/orders',
      icon: ShoppingBag,
      label: 'common.orders',
    },
    subscription: {
      href: '/subscription',
      icon: CreditCard,
      label: 'subscription.title',
    },
  },
} as const
