import { useState, useEffect } from 'react'
import { Menu, X, Phone, Sparkles, ShoppingBag, Settings } from 'lucide-react'
import { businessInfo } from '../data/products'
import { useLanguage } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'

const Navbar = ({ isScrolled, onAdminClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: t('home'), href: '#home' },
    { name: t('about'), href: '#about' },
    { name: t('collection'), href: '#collection' },
    { name: t('contact'), href: '#contact' },
  ]

  const isNavScrolled = isScrolled || scrolled

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isNavScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-200/50 py-2' : 'bg-gradient-to-b from-black/30 to-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Double click to open admin */}
          <a href="#home" className="flex items-center gap-3 group" onDoubleClick={onAdminClick} title="Double-click for Admin">
            <div className={`w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-gold-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${isNavScrolled ? 'shadow-primary-500/30' : 'shadow-black/20'} group-hover:scale-110 transition-transform`}>
              <ShoppingBag size={24} />
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-heading font-bold text-xl leading-tight transition-colors ${
                isNavScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                Maa Nav Durga
              </h1>
              <p className={`text-xs transition-colors flex items-center gap-1 ${isNavScrolled ? 'text-gray-500' : 'text-white/80'}`}>
                <Sparkles size={10} />
                Saree Suit Collection
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-5 py-2.5 font-medium transition-all group ${
                  isNavScrolled 
                    ? 'text-gray-600 hover:text-primary-600' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 group-hover:w-3/4 group-hover:left-[12%] transition-all rounded-full ${isNavScrolled ? 'bg-gradient-to-r from-primary-500 to-gold-500' : 'bg-white'}`}></span>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle isScrolled={isNavScrolled} />
            <a
              href={`tel:${businessInfo.phone}`}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all ${
                isNavScrolled
                  ? 'bg-gradient-to-r from-primary-500 via-primary-600 to-gold-500 text-white hover:shadow-lg hover:shadow-primary-500/30 hover:scale-105'
                  : 'bg-white text-gray-800 hover:bg-white/90'
              }`}
            >
              <Phone size={18} />
              <span className="hidden lg:inline">{t('callNow')}</span>
            </a>
            <a
              href={`https://wa.me/${businessInfo.whatsapp}?text=Hello! I'm interested in your collection.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm hover:scale-105 transition-transform"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2.5 rounded-xl transition-colors ${
              isNavScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-xl border-t transition-all duration-300 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}>
          <div className="py-6 px-4 space-y-2">
            {/* Language Toggle for Mobile */}
            <div className="flex justify-center mb-4">
              <LanguageToggle isScrolled={true} />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-5 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex gap-3 mt-4 pt-4 border-t">
              <a
                href={`tel:${businessInfo.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-primary-500 to-gold-500 rounded-xl text-white font-semibold"
              >
                <Phone size={18} />
                {t('callNow')}
              </a>
              <a
                href={`https://wa.me/${businessInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-whatsapp justify-center rounded-xl"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
