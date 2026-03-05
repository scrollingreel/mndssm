import { Phone, MapPin, Heart, ArrowUp, Sparkles, ShoppingBag } from 'lucide-react'
import { businessInfo } from '../data/products'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Collection', href: '#collection' },
    { name: 'Contact', href: '#contact' },
  ]

  const categories = [
    'Sarees',
    'Suits',
    'Readymade Garments',
    'Summer Wear',
    'Stocklot Garments',
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
      
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-gold-400 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-500/20">
                <ShoppingBag size={28} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">Maa Nav Durga</h3>
                <p className="text-gray-400 text-sm flex items-center gap-1">
                  <Sparkles size={12} />
                  Saree Suit Collection
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted destination for quality sarees, suits, and readymade garments since 2018. Premium quality at affordable prices.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${businessInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/10 hover:bg-gradient-to-br hover:from-[#25D366] hover:to-[#128C7E] rounded-xl flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=26.6984200,82.2743780`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/10 hover:bg-gradient-to-br hover:from-red-500 hover:to-red-600 rounded-xl flex items-center justify-center transition-all hover:scale-110"
              >
                <MapPin size={20} />
              </a>
              <a
                href={`tel:${businessInfo.phone}`}
                className="w-11 h-11 bg-white/10 hover:bg-gradient-to-br hover:from-primary-500 hover:to-gold-500 rounded-xl flex items-center justify-center transition-all hover:scale-110"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-400 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gold-400 group-hover:w-4 transition-all"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
              Categories
            </h4>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <a
                    href="#collection"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary-400 group-hover:w-4 transition-all"></span>
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-400 rounded-full"></span>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                  <MapPin size={18} className="text-primary-400" />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed">
                  {businessInfo.address.line1},<br />
                  {businessInfo.address.line2},<br />
                  <span className="font-medium text-gray-300">{businessInfo.address.city} – {businessInfo.address.pin}</span>
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-gold-500/20 transition-colors">
                  <Phone size={18} className="text-gold-400" />
                </div>
                <a href={`tel:${businessInfo.phone}`} className="text-gray-400 hover:text-white transition-colors">
                  {businessInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left flex items-center gap-2">
              © {currentYear} {businessInfo.name}. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-400 animate-pulse" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
