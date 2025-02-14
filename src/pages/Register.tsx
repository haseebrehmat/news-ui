import { UserPlus } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signUp } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signUp(name, email, password)
      navigate('/feed')
    } catch (err) {
      setError(`Registration failed. Please try again. ${err}`)
    }
  }

  return (
    <div className='max-w-md mx-auto'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <div className='flex items-center justify-center mb-8'>
          <UserPlus className='h-8 w-8 text-blue-600 mr-2' />
          <h1 className='text-2xl font-bold text-gray-900'>Register</h1>
        </div>

        {error && (
          <div className='bg-red-50 text-red-600 p-3 rounded-md mb-4'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Name Input */}
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Full Name
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              minLength={6}
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'
          >
            Create Account
          </button>
        </form>

        <p className='mt-4 text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600 hover:text-blue-700'>
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
