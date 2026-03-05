import { MapPin, ChevronDown, Sparkles, Star } from 'lucide-react'
import { businessInfo } from '../data/products'
import { useLanguage } from '../context/LanguageContext'

// Shop images from ImgBB
const shopImg1 = 'https://i.ibb.co/78rxV0s/img1.png'

const Hero = () => {
  const { t } = useLanguage()
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={shopImg1}
          alt="Maa Nav Durga Saree Collection Shop"
          className="w-full h-full object-cover scale-105 animate-scalePulse"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/85 to-gold-900/80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gold-400/30 to-primary-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-primary-400/30 to-gold-400/20 rounded-full blur-3xl animate-float animation-delay-300"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
      
      {/* Floating decorative shapes */}
      <div className="absolute top-32 right-20 w-20 h-20 border-2 border-gold-400/30 rounded-full animate-float animation-delay-200"></div>
      <div className="absolute bottom-40 left-20 w-16 h-16 border-2 border-primary-300/30 rotate-45 animate-float animation-delay-400"></div>
      <div className="absolute top-1/3 right-1/4 hidden lg:block">
        <Sparkles className="w-8 h-8 text-gold-400/50 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-white/95 text-sm mb-8 animate-fadeIn hover:scale-105 transition-transform cursor-default">
          <MapPin size={16} className="text-gold-400" />
          <span className="font-medium">{t('locationBadge')}</span>
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        </div>

        {/* Main Heading */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slideUp text-shadow-lg">
          <span className="block">{t('shopName')}</span>
          <span className="block mt-2 text-yellow-300 font-extrabold" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(253,224,71,0.5)'}}>
            {t('shopSubtitle')}
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto animate-slideUp animation-delay-200 leading-relaxed">
          {t('tagline')}
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 animate-slideUp animation-delay-300">
          <div className="flex items-center gap-2 px-4 py-2.5 glass rounded-full hover:bg-white/20 transition-all cursor-default group">
            <span className="text-gold-400 text-xl group-hover:scale-125 transition-transform">🏆</span>
            <span className="text-white text-sm font-medium">{t('since')}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 glass rounded-full hover:bg-white/20 transition-all cursor-default group">
            <Star className="w-5 h-5 text-gold-400 fill-gold-400 group-hover:scale-125 transition-transform" />
            <span className="text-white text-sm font-medium">{t('trustedStore')}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 glass rounded-full hover:bg-white/20 transition-all cursor-default group">
            <span className="text-gold-400 text-xl group-hover:scale-125 transition-transform">💯</span>
            <span className="text-white text-sm font-medium">{t('qualityProducts')}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp animation-delay-400">
          <a
            href="#collection"
            className="btn-primary text-lg px-10 py-4 group"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {t('viewCollection')}
            </span>
          </a>
          <a
            href={`https://wa.me/${businessInfo.whatsapp}?text=Hello! I'm interested in your saree and suit collection.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-lg px-10 py-4 justify-center group"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contact on WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
