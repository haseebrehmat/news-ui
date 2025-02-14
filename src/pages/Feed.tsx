import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { BASE_URL, HEADERS } from '../lib/constants'
import type { Article } from '../types'

const Feed = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [prevCursor, setPrevCursor] = useState<string | null>(null)

  const fetchArticles = useCallback(async (cursor: string | null = null) => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/feed`, {
        headers: HEADERS,
        params: { cursor },
      })
      setArticles(response.data?.articles)
      setNextCursor(response.data.next_cursor || null)
      setPrevCursor(response.data.prev_cursor || null)
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  const paginationButtons = () => (
    <div className='flex justify-between my-4'>
      <button
        onClick={() => fetchArticles(prevCursor)}
        disabled={!prevCursor}
        className={`px-4 py-2 rounded-md ${prevCursor ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        Previous
      </button>
      <button
        onClick={() => fetchArticles(nextCursor)}
        disabled={!nextCursor}
        className={`px-4 py-2 rounded-md ${nextCursor ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        Next
      </button>
    </div>
  )

  return (
    <div className='max-w-4xl mx-auto'>
      {paginationButtons()}
      {loading ? (
        <div className='text-center py-8'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
        </div>
      ) : articles.length === 0 ? (
        <div className='text-center py-8 text-gray-600'>No articles found.</div>
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
              <div className='flex justify-between'>
                <div className='flex items-center text-sm text-gray-700'>
                  <span>By {article.author}</span>
                </div>
                <a
                  href={article.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600'
                >
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
      {paginationButtons()}
    </div>
  )
}

export default Feed
