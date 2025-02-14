/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../lib/constants'
import { usePreferenceStore } from '../store/preferenceStore'
import type { Article } from '../types'

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSource, setSelectedSource] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const { availableCategories, availableSources, fetchAvailableOptions } =
    usePreferenceStore()

  const fetchArticles = async (page: number) => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/articles`, {
        params: {
          keyword: searchQuery,
          category: selectedCategory,
          source: selectedSource,
          page: page,
        },
      })
      setArticles(response.data?.results?.data || [])
      setCurrentPage(response.data?.results?.current_page || 1)
      setLastPage(response.data?.results?.last_page || 1)
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAvailableOptions()
    fetchArticles(currentPage)
  }, [currentPage])

  const applyFilters = () => {
    setCurrentPage(1)
    fetchArticles(1)
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='mb-8'>
        <div className='flex flex-col md:flex-row gap-4 mb-6'>
          <div className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <input
                type='text'
                placeholder='Search articles...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10 pr-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
          </div>
          <div className='flex gap-4'>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            >
              <option value=''>All Categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className='rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            >
              <option value=''>All Sources</option>
              {availableSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
            <button
              onClick={applyFilters}
              disabled={loading}
              className='flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50'
            >
              {loading ? 'Loading...' : 'Apply Filters'}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className='text-center py-8'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
        </div>
      ) : articles.length === 0 ? (
        <div className='text-center py-8 text-gray-600'>
          No articles found. Try adjusting your filters.
        </div>
      ) : (
        <div className='space-y-6'>
          {articles.map((article) => (
            <article
              key={article.id}
              className='bg-white rounded-lg shadow-md p-6'
            >
              <h2 className='text-xl font-semibold mb-2'>{article.title}</h2>
              <div className='flex items-center text-sm text-gray-500 mb-4'>
                <span>{article.source}</span>
                <span className='mx-2'>•</span>
                <span>{article.category}</span>
                <span className='mx-2'>•</span>
                <span>
                  {new Date(article.published_at).toLocaleDateString()}
                </span>
              </div>
              <p className='text-gray-600 mb-4'>{article.description}</p>
              <a
                href={article.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 hover:underline'
              >
                Read more
              </a>
            </article>
          ))}
        </div>
      )}

      <div className='flex justify-between items-center mt-8'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'} text-gray-700 px-4 py-2 rounded-md disabled:opacity-50`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {lastPage}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev < lastPage ? prev + 1 : prev))
          }
          disabled={currentPage === lastPage}
          className={`${currentPage === lastPage ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}  text-gray-700 px-4 py-2 rounded-md disabled:opacity-50`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Articles
