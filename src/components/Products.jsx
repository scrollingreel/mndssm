import { useState, useEffect } from 'react'
import { ShoppingBag, Sparkles, ArrowRight } from 'lucide-react'
import { products as defaultProducts, categories, businessInfo } from '../data/products'
import { useLanguage } from '../context/LanguageContext'

const Products = ({ customProducts = [] }) => {
  const [activeCategory, setActiveCategory] = useState('All')
  const { language, t } = useLanguage()
  
  // Combine default products with custom products
  const allProducts = [...defaultProducts, ...customProducts]

  const filteredProducts = activeCategory === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory)

  const handleEnquiry = (product) => {
    const productName = language === 'hi' && product.nameHi ? product.nameHi : product.name
    const message = language === 'hi' 
      ? `नमस्ते! मुझे इस प्रोडक्ट में रुचि है: ${productName} (${product.category})। कृपया अधिक जानकारी दें।`
      : `Hello! I'm interested in: ${product.name} (${product.category}). Please share more details.`
    const whatsappUrl = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const getCategoryLabel = (cat) => {
    const labels = {
      'All': t('all'),
      'Sarees': t('sarees'),
      'Suits': t('suits'),
      'Readymade Garments': t('readymade'),
      'Summer Wear': t('summerWear'),
      'Stocklot Garments': t('stocklot')
    }
    return labels[cat] || cat
  }

  return (
    <section id="collection" className="py-24 bg-gradient-to-b from-white via-primary-50/30 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full pattern-dots opacity-50"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-gold-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-gold-100 to-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            {t('ourCollection')}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-800 mb-5">
            {language === 'hi' ? 'हमारे' : 'Explore Our'} <span className="text-gradient">{language === 'hi' ? 'प्रोडक्ट्स' : 'Products'}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('collectionDesc')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary-600 via-primary-500 to-gold-500 text-white shadow-lg shadow-primary-500/30 scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-100'
              }`}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover img-zoom"
                  onError={(e) => {
                    console.log('Image load failed for:', product.name, 'URL:', product.image)
                    e.target.src = 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=400'
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-4 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 shadow-lg">
                    {product.category}
                  </span>
                </div>
                
                {/* Quick action on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <button
                    onClick={() => handleEnquiry(product)}
                    className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white text-primary-600 px-6 py-3 rounded-full font-semibold shadow-xl hover:bg-primary-600 hover:text-white flex items-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Quick Enquiry
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                  {language === 'hi' && product.nameHi ? product.nameHi : product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed">
                  {language === 'hi' && product.descriptionHi ? product.descriptionHi : product.description}
                </p>
                <button
                  onClick={() => handleEnquiry(product)}
                  className="w-full btn-whatsapp justify-center text-sm py-3 group/btn"
                >
                  <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('inquireWhatsApp')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-16">
          <a
            href={`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(language === 'hi' ? 'नमस्ते! मैं आपके संग्रह से और प्रोडक्ट्स देखना चाहता/चाहती हूं।' : "Hello! I'd like to see more products from your collection.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 text-lg px-10 py-4 group"
          >
            {t('viewMore')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Products
