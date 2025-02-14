import axios from 'axios'
import { Save, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BASE_URL, HEADERS } from '../lib/constants'
import { useAuthStore } from '../store/authStore'
import { usePreferenceStore } from '../store/preferenceStore'

const Preferences = () => {
  const {
    availableSources,
    availableCategories,
    availableAuthors,
    fetchAvailableOptions,
  } = usePreferenceStore()
  const { preferences, fetchCurrentUser } = useAuthStore()

  const [selectedPreferences, setSelectedPreferences] = useState(preferences)

  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchAvailableOptions()
  }, [fetchAvailableOptions])

  const handleSave = async () => {
    setSaving(true)
    try {
      await axios.post(`${BASE_URL}/preferences`, selectedPreferences, {
        headers: HEADERS,
      })
      await fetchCurrentUser()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving preferences:', error)
    } finally {
      setSaving(false)
    }
  }

  const toggleSelection = (category: string, item: string) => {
    setSelectedPreferences((prev) => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].includes(item)
        ? prev[category as keyof typeof prev].filter((i) => i !== item)
        : [...prev[category as keyof typeof prev], item],
    }))
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex items-center mb-8'>
          <Settings className='h-8 w-8 text-blue-600 mr-2' />
          <h1 className='text-2xl font-bold text-gray-900'>News Preferences</h1>
        </div>

        <div className='space-y-8'>
          {[
            { key: 'categories', options: availableCategories },
            { key: 'sources', options: availableSources },
            { key: 'authors', options: availableAuthors },
          ].map(({ key, options }) => (
            <div key={key}>
              <h2 className='text-lg font-semibold mb-4'>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h2>
              <div className='flex flex-wrap gap-2'>
                {options.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleSelection(key, item)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedPreferences[
                        key as keyof typeof selectedPreferences
                      ].includes(item)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-8 flex items-center'>
          <button
            onClick={handleSave}
            disabled={saving}
            className='flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50'
          >
            <Save className='h-5 w-5 mr-2' />
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
          {success && (
            <span className='ml-4 text-green-600'>
              Preferences saved successfully!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Preferences
