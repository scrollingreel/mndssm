import { useState, useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import PaymentMethods from './components/PaymentMethods'
import Contact from './components/Contact'
import SEOSection from './components/SEOSection'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import AdminPanel from './components/AdminPanel'
import { getProducts } from './firebase'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [customProducts, setCustomProducts] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)

    // Load products from Firebase
    const loadFirebaseProducts = async () => {
      try {
        const products = await getProducts()
        setCustomProducts(products)
      } catch (error) {
        console.error('Error loading products from Firebase:', error)
      }
    }
    loadFirebaseProducts()

    // Secret key combo to open admin panel (Ctrl+Shift+A)
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        setShowAdminPanel(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleProductsUpdate = (products) => {
    setCustomProducts(products)
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Navbar isScrolled={isScrolled} onAdminClick={() => setShowAdminPanel(true)} />
        <Hero />
        <About />
        <Products customProducts={customProducts} />
        <PaymentMethods />
        <Contact />
        <SEOSection />
        <Footer />
        <WhatsAppFloat />

        {/* Admin Panel Modal */}
        <AdminPanel
          isOpen={showAdminPanel}
          onClose={() => setShowAdminPanel(false)}
          onProductsUpdate={handleProductsUpdate}
        />
      </div>
    </LanguageProvider>
  )
}

export default App
