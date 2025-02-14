import {
  LayoutList,
  LogOut,
  Menu,
  Newspaper,
  Rss,
  Settings,
  X,
  User2
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

type NavbarProps = {
  authenticated: boolean
}

export const Navbar = ({ authenticated }: NavbarProps) => {
  const { user, signOut } = useAuthStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className='bg-white shadow-lg'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <Link to='/' className='flex items-center space-x-2 text-blue-600'>
            <Newspaper className='h-8 w-8' />
            <span className='text-xl font-bold'>News Portal</span>
          </Link>
          <div className='hidden md:flex items-center space-x-6'>
            <Link to='/articles' className='flex items-center space-x-2'>
              <LayoutList className='h-5 w-5' />
              <span className='text-gray-700'>Articles</span>
            </Link>
            {authenticated && (
              <Link to='/feed' className='flex items-center space-x-2'>
                <Rss className='h-5 w-5' />
                <span className='text-gray-700'>My Feed</span>
              </Link>
            )}
          </div>

          <div className='hidden md:flex items-center space-x-4'>
            {authenticated ? (
              <>
                <Link
                  to='/feed'
                  className='text-gray-700 hover:text-blue-600 transition-colors'
                >
                  {user?.name}
                </Link>
                <Link
                  to='/preferences'
                  className='text-gray-700 hover:text-blue-600 transition-colors'
                >
                  <Settings className='h-5 w-5' />
                </Link>

                <button
                  onClick={handleSignOut}
                  className='text-gray-700 hover:text-blue-600 transition-colors'
                >
                  <LogOut className='h-5 w-5' />
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='text-gray-700 hover:text-blue-600 transition-colors'
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className='md:hidden flex items-center'>
            <button onClick={toggleMobileMenu} className='text-gray-700'>
              {isMobileMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className='md:hidden'>
            <div className='flex flex-col space-y-4 mt-4 pb-4'>
              <Link to='/articles' className='flex items-center space-x-2'>
                <LayoutList className='h-5 w-5' />
                <span className='text-gray-700'>Articles</span>
              </Link>
              {authenticated && (
                <Link to='/feed' className='flex items-center space-x-2'>
                  <Rss className='h-5 w-5' />
                  <span className='text-gray-700'>My Feed</span>
                </Link>
              )}
              {authenticated ? (
                <>
                  <Link
                    to='/feed'
                    className='text-gray-700 hover:text-blue-600 flex items-center space-x-2'
                  >
                    <User2 className='h-5 w-5' />
                    <span className='text-gray-700'>{user?.name}</span>
                  </Link>
                  <Link
                    to='/preferences'
                    className='text-gray-700 hover:text-blue-600 flex items-center space-x-2'
                  >
                    <Settings className='h-5 w-5' />
                    <span className='text-gray-700'>Preferences</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className='text-gray-700 hover:text-blue-600 flex items-center space-x-2'
                  >
                    <LogOut className='h-5 w-5' />
                    <span className='text-gray-700'>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to='/login'
                    className='text-gray-700 hover:text-blue-600'
                  >
                    Login
                  </Link>
                  <Link
                    to='/register'
                    className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
