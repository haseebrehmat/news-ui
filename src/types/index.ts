export interface User {
  id: string
  name: string
  email: string
  preferences: Preferences
}

export interface Preferences {
  id: string
  user_id: string
  sources: string
  categories: string
  authors: string
}

export interface Article {
  id: string
  title: string
  source: string | null
  category: string | null
  author: string | null
  url: string
  description: string
  published_at: string
  created_at: string
}

export interface UserPreferences {
  sources: string[]
  categories: string[]
  authors: string[]
}
export interface AuthState {
  user: User | null
  loading: boolean
  preferences: UserPreferences
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  fetchCurrentUser: () => void
}
