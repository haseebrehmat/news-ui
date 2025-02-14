import { Filter, Globe, Newspaper, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div className='max-w-4xl mx-auto'>
    <div className='text-center mb-12'>
      <h1 className='text-4xl font-bold text-gray-900 mb-4'>
        Your Personalized News Hub
      </h1>
      <p className='text-xl text-gray-600'>
        Stay informed with news that matters to you
      </p>
    </div>

    <div className='grid md:grid-cols-2 gap-8 mb-12'>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <Newspaper className='h-12 w-12 text-blue-600 mb-4' />
        <h2 className='text-xl font-semibold mb-2'>Personalized Feed</h2>
        <p className='text-gray-600 mb-4'>
          Get news tailored to your interests and preferences
        </p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md'>
        <Filter className='h-12 w-12 text-blue-600 mb-4' />
        <h2 className='text-xl font-semibold mb-2'>Smart Filtering</h2>
        <p className='text-gray-600 mb-4'>
          Filter news by date, category, and source
        </p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md'>
        <Settings className='h-12 w-12 text-blue-600 mb-4' />
        <h2 className='text-xl font-semibold mb-2'>Custom Preferences</h2>
        <p className='text-gray-600 mb-4'>
          Set your preferences for sources and categories
        </p>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md'>
        <Globe className='h-12 w-12 text-blue-600 mb-4' />
        <h2 className='text-xl font-semibold mb-2'>Global Coverage</h2>
        <p className='text-gray-600 mb-4'>
          Access news from trusted sources worldwide
        </p>
      </div>
    </div>

    <div className='text-center'>
      <Link
        to='/register'
        className='bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors'
      >
        Get Started
      </Link>
    </div>
  </div>
)

export default Home
