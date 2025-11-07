import './css/App.css'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar'
import Favorites from './pages/Favorites'
import { MovieProvider } from './contexts/FavouriteContext'
function App() {
  return (
    <>
      <MovieProvider>
        <div>
          <NavBar />
          <main className='main-content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/favorites' element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </MovieProvider>
    </>
  )
}

export default App
