import { Search, TrendingUp } from 'lucide-react'

const SEOSection = () => {
  const keywords = [
    { text: "Saree shop in Faizabad", icon: "🛍️", color: "from-pink-100 to-pink-50" },
    { text: "Suit collection in Bhagwa Bheet", icon: "👗", color: "from-purple-100 to-purple-50" },
    { text: "Readymade garments near me", icon: "👚", color: "from-blue-100 to-blue-50" },
    { text: "Best clothing store in Bhagwa Bheet", icon: "⭐", color: "from-yellow-100 to-yellow-50" },
    { text: "Affordable sarees Faizabad", icon: "💰", color: "from-green-100 to-green-50" },
    { text: "Ladies garments Harlalka Road", icon: "👸", color: "from-rose-100 to-rose-50" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary-100 rounded-full blur-2xl opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gold-100 rounded-full blur-2xl opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-gold-100 rounded-full text-primary-700 text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Popular Searches
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Find Us For
          </h2>
          <p className="text-gray-500">What our customers search for</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r ${keyword.color} rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default border border-white/50 group`}
            >
              <span className="text-2xl group-hover:scale-125 transition-transform">{keyword.icon}</span>
              <span className="text-gray-700 font-medium">{keyword.text}</span>
            </div>
          ))}
        </div>

        {/* SEO Content (visible but subtle) */}
        <div className="mt-14 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-gold-400 to-primary-500"></div>
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 bg-primary-100 rounded-xl">
              <Search className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-800">About Our Store</h3>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Looking for the <strong className="text-gray-700">best saree shop in Faizabad</strong>? Visit <strong className="text-primary-600">Maa Nav Durga Saree Suit Collection</strong> at 
            Bhagwa Bheet for premium quality <strong className="text-gray-700">sarees, suits, and readymade garments</strong>. We are the 
            <strong className="text-gray-700"> best clothing store in Bhagwa Bheet</strong>, offering a wide range of <strong className="text-gray-700">suit collection</strong> and 
            <strong className="text-gray-700"> ladies garments near Pura Bazar, Harlalka Road</strong>. Trusted by customers since 2018 for 
            quality and affordability.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SEOSection
