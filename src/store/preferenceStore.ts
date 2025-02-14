import axios from 'axios'
import { create } from 'zustand'
import { BASE_URL } from '../lib/constants'

type PreferenceState = {
  availableSources: string[]
  availableCategories: string[]
  availableAuthors: string[]
  fetchAvailableOptions: () => Promise<void>
}

export const usePreferenceStore = create<PreferenceState>((set) => ({
  availableSources: [],
  availableCategories: [],
  availableAuthors: [],

  fetchAvailableOptions: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/preferences`)
      set({
        availableSources: response.data.available_sources || [],
        availableCategories: response.data.available_categories || [],
        availableAuthors: response.data.available_authors || [],
      })
    } catch (error) {
      console.error('Error fetching available options:', error)
    }
  },
}))
