import { getToken } from './helpers'

export const BASE_URL = 'http://localhost:8000/api'
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${getToken()}`,
}

export const PREFERENCES_DEFAULT = {
  sources: [],
  categories: [],
  authors: [],
}
