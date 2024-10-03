import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { Menu, X, ChevronDown } from 'lucide-react'
import { useEffect } from "react"
import Logout from './Logout'
import { Logo } from '../assets/images'

const publicNavigation = [
  { name: 'Umrah Packages', to: '/packages' },
  { name: 'Customize Package', to: '/customize-package' },
]

const protectedNavigation = [
  { name: 'Create New Hotel', to: '/create-hotel' },
  { name: 'Create New Package', to: '/create-package' },
  { name: 'Add extra details', to: '/add-extra-details' },
  { name: 'Hotel lists', to: '/hotel-lists' },
  { name: 'Image lists', to: '/image-lists' },
  { name: 'Customize Package Requests', to: '/customize-package-requests' },
  { name: 'Add New Notification', to: '/add-notification' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false)
  const authStatus = useSelector((state) => state.auth.userData);

  // Combine navigation items based on auth status
  const navigationItems = authStatus
    ? [...publicNavigation, { name: 'Admin', type: 'flyout' }]
    : [...publicNavigation, { name: 'Login', to: '/login' }];

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".floating-header")
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("is-scrolled")
        } else {
          header.classList.remove("is-scrolled")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="floating-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="-m-1.5 p-1.5 h-[4.5rem]">
            <span className="sr-only">Riyazul Jannah tour and travels</span>
            <img src={Logo} className='h-full w-full p-2 rounded-lg object-cover bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm' alt="Riyazul Jannah tour and travels logo" />
          </Link>
          <nav className="hidden md:flex space-x-4 items-center">
            {navigationItems.map((item) => (
              item.type === 'flyout' ? (
                <div 
                  key="admin-flyout" 
                  className="relative"
                  onClick={() => setIsFlyoutOpen(prev => !prev)}
                >
                  <button 
                    className="px-4 py-2 text-sm font-medium text-lime-600 
                    bg-lime-100 hover:bg-lime-400 hover:text-white 
                    rounded-md transition-all duration-300 
                    transform hover:shadow-md
                    flex items-center"
                  >
                    Admin 
                    <ChevronDown size={16} className="ml-2" />
                  </button>
                  {isFlyoutOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-md overflow-hidden">
                      {protectedNavigation.map((navItem) => (
                        <Link
                          key={navItem.name}
                          to={navItem.to}
                          className="block px-4 py-2 text-sm text-lime-800 
                          hover:bg-lime-100 transition-colors"
                        >
                          {navItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.to}
                  className="px-4 py-2 text-sm font-medium text-lime-600 
                  bg-lime-100 hover:bg-lime-400 hover:text-white 
                  rounded-md transition-all duration-300 
                  transform hover:-translate-y-1 hover:shadow-md"
                >
                  {item.name}
                </Link>
              )
            ))}
            {authStatus && (
              <Logout />
            )}
          </nav>
          <button
            className="md:hidden text-lime-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-lime-50 shadow-lg">
          <nav className="flex flex-col space-y-4 px-4 py-6">
            {publicNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="w-full px-4 py-3 text-sm font-medium text-lime-800 
                  bg-lime-100 hover:bg-lime-600 hover:text-white 
                  rounded-md transition-all duration-300 
                  text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {authStatus && (
              <>
                <div 
                  className="w-full px-4 py-3 text-sm font-medium text-lime-800 
                  bg-lime-100 hover:bg-lime-600 hover:text-white 
                  rounded-md transition-all duration-300 
                  text-center"
                >
                  Admin Links
                </div>
                {protectedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="w-full px-4 py-3 text-sm font-medium text-lime-700 
                    bg-lime-50 hover:bg-lime-200 
                    rounded-md transition-all duration-300 
                    text-center ml-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="w-full px-4 py-3 text-sm font-medium hover:text-white rounded-md transition-all duration-300 text-center">
                  <Logout />
                </div>
              </>
            )}
            {!authStatus && (
              <Link
                to="/login"
                className="w-full px-4 py-3 text-sm font-medium text-lime-800 
                  bg-lime-100 hover:bg-lime-600 hover:text-white 
                  rounded-md transition-all duration-300 
                  text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header