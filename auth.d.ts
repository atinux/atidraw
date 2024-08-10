declare module '#auth-utils' {
  interface User {
    provider: 'github' | 'google' | 'anonymous'
    id: string
    name: string
    avatar: string
    url: string
  }
}

export {}
