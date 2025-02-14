import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AuthRedirect, Navbar, ProtectedRoute } from './components'
import { getToken } from './lib/helpers'
import Articles from './pages/Articles'
import Feed from './pages/Feed'
import Home from './pages/Home'
import Login from './pages/Login'
import Preferences from './pages/Preferences'
import Register from './pages/Register'

const App = () => (
  <Router>
    <div className='min-h-screen bg-gray-50'>
      <Navbar authenticated={!!getToken()} />
      <main className='container mx-auto px-4 py-8'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/articles' element={<Articles />} />
          <Route
            path='/login'
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route
            path='/register'
            element={
              <AuthRedirect>
                <Register />
              </AuthRedirect>
            }
          />
          <Route
            path='/feed'
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path='/preferences'
            element={
              <ProtectedRoute>
                <Preferences />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  </Router>
)

export default App
