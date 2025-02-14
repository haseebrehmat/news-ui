/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { create } from 'zustand'
import { BASE_URL, HEADERS, PREFERENCES_DEFAULT } from '../lib/constants'
import { getToken, parseUserPrefereneces, setToken } from '../lib/helpers'
import type { AuthState } from '../types'

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  preferences: PREFERENCES_DEFAULT,

  signUp: async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        name,
        email,
        password,
        password_confirmation: password,
      })
      setToken(response.data.access_token)
      window.location.reload()
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Registration failed')
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      })
      setToken(response.data.access_token)
      window.location.reload()
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed')
    }
  },

  fetchCurrentUser: async () => {
    try {
      const token = getToken()
      if (!token) {
        set({ user: null, preferences: PREFERENCES_DEFAULT })
        return
      }

      const response = await axios.get(`${BASE_URL}/me`, {
        headers: HEADERS,
      })
      set({
        user: response.data,
        preferences: parseUserPrefereneces(response.data.preferences),
      })
    } catch (error) {
      console.error('Error fetching current user:', error)
      set({ user: null, preferences: PREFERENCES_DEFAULT })
    }
  },

  signOut: async () => {
    try {
      const token = getToken()
      if (!token) return

      await axios.post(`${BASE_URL}/logout`, null, {
        headers: HEADERS,
      })

      localStorage.removeItem('token')
      set({ user: null, preferences: PREFERENCES_DEFAULT })
      window.location.reload()
    } catch (error: any) {
      console.error('Logout error:', error.response?.data || error)
    }
  },
}))

useAuthStore.getState().fetchCurrentUser()
