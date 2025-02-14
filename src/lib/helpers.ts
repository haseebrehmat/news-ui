import { Preferences } from '../types'

export const getToken = () => localStorage.getItem('token')
export const setToken = (token: string) => localStorage.setItem('token', token)
export const removeToken = () => localStorage.removeItem('token')
export const parseUserPrefereneces = (preferences: Preferences) => {
  return {
    sources: preferences?.sources?.split(',') || [],
    categories: preferences?.categories?.split(',') || [],
    authors: preferences?.authors?.split(',') || [],
  }
}
