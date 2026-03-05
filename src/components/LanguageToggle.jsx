import { useLanguage } from '../context/LanguageContext'
import { Globe } from 'lucide-react'

const LanguageToggle = ({ isScrolled }) => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 rounded-full font-medium text-sm transition-all hover:scale-105 ${
        isScrolled
          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          : 'bg-white/20 text-white hover:bg-white/30'
      }`}
      title={language === 'en' ? 'हिंदी में देखें' : 'View in English'}
    >
      <Globe size={16} />
      <span className="font-semibold">
        {language === 'en' ? 'हिंदी' : 'EN'}
      </span>
    </button>
  )
}

export default LanguageToggle
