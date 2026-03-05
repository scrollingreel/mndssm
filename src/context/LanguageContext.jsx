import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    // Navbar
    home: "Home",
    about: "About",
    collection: "Collection",
    contact: "Contact",
    callNow: "Call Now",
    
    // Hero
    locationBadge: "Bhagwa Bheet, Faizabad",
    shopName: "Maa Nav Durga",
    shopSubtitle: "Saree Suit Collection",
    tagline: "Trusted Saree, Suit & Readymade Garment Store since 2018",
    since: "Since 2018",
    trustedStore: "Trusted Store",
    qualityProducts: "Quality Products",
    viewCollection: "View Collection",
    
    // About
    aboutTitle: "About Our Store",
    aboutSubtitle: "Bringing you the finest collection of traditional and modern ethnic wear",
    yearsOf: "Years of",
    excellence: "Excellence",
    happyCustomers: "Happy Customers",
    customerCentric: "Customer-Centric",
    customerCentricDesc: "Your satisfaction is our top priority",
    qualityProductsTitle: "Quality Products",
    qualityProductsDesc: "Wide range of premium garments",
    localLandmark: "Local Landmark",
    localLandmarkDesc: "Near Pura Bazar, Harlalka Road",
    trustedBusiness: "Trusted Business",
    trustedBusinessDesc: "Serving customers since",
    premiumSarees: "Premium Quality Sarees",
    latestSuits: "Latest Suit Designs",
    affordablePrices: "Affordable Prices",
    satisfaction: "100% Customer Satisfaction",
    
    // Products
    ourCollection: "Our Collection",
    collectionDesc: "Discover our handpicked selection of premium ethnic wear",
    all: "All",
    sarees: "Sarees",
    suits: "Suits",
    readymade: "Readymade",
    summerWear: "Summer Wear",
    stocklot: "Stocklot",
    inquireWhatsApp: "Inquire on WhatsApp",
    viewMore: "View More Collection",
    
    // Contact
    getInTouch: "Get In Touch",
    contactDesc: "Visit our store or reach out to us for any inquiries",
    visitStore: "Visit Our Store",
    storeAddress: "Store Address",
    callUs: "Call Us",
    whatsApp: "WhatsApp",
    getDirections: "Get Directions",
    
    // Footer
    allRightsReserved: "All Rights Reserved",
    madeWith: "Made with",
    inIndia: "in India",
    
    // Admin
    adminPanel: "Admin Panel",
    addProduct: "Add Product",
    editProduct: "Edit Product",
    deleteProduct: "Delete Product",
    productName: "Product Name",
    category: "Category",
    price: "Price",
    save: "Save",
    cancel: "Cancel",
    login: "Login",
    logout: "Logout",
    password: "Password"
  },
  hi: {
    // Navbar
    home: "होम",
    about: "हमारे बारे में",
    collection: "संग्रह",
    contact: "संपर्क",
    callNow: "कॉल करें",
    
    // Hero
    locationBadge: "भगवा भीट, फैज़ाबाद",
    shopName: "माँ नव दुर्गा",
    shopSubtitle: "साड़ी सूट कलेक्शन",
    tagline: "2018 से विश्वसनीय साड़ी, सूट और रेडीमेड गारमेंट स्टोर",
    since: "2018 से",
    trustedStore: "विश्वसनीय दुकान",
    qualityProducts: "गुणवत्ता उत्पाद",
    viewCollection: "संग्रह देखें",
    
    // About
    aboutTitle: "हमारी दुकान के बारे में",
    aboutSubtitle: "पारंपरिक और आधुनिक एथनिक वियर का बेहतरीन संग्रह",
    yearsOf: "वर्षों का",
    excellence: "उत्कृष्टता",
    happyCustomers: "खुश ग्राहक",
    customerCentric: "ग्राहक-केंद्रित",
    customerCentricDesc: "आपकी संतुष्टि हमारी प्राथमिकता है",
    qualityProductsTitle: "गुणवत्ता उत्पाद",
    qualityProductsDesc: "प्रीमियम गारमेंट्स की विस्तृत श्रृंखला",
    localLandmark: "स्थानीय लैंडमार्क",
    localLandmarkDesc: "पुरा बाज़ार, हरलालका रोड के पास",
    trustedBusiness: "विश्वसनीय व्यवसाय",
    trustedBusinessDesc: "ग्राहकों की सेवा में",
    premiumSarees: "प्रीमियम क्वालिटी साड़ियाँ",
    latestSuits: "लेटेस्ट सूट डिज़ाइन",
    affordablePrices: "किफायती दाम",
    satisfaction: "100% ग्राहक संतुष्टि",
    
    // Products
    ourCollection: "हमारा संग्रह",
    collectionDesc: "प्रीमियम एथनिक वियर का हमारा चुनिंदा संग्रह देखें",
    all: "सभी",
    sarees: "साड़ियाँ",
    suits: "सूट",
    readymade: "रेडीमेड",
    summerWear: "समर वियर",
    stocklot: "स्टॉकलॉट",
    inquireWhatsApp: "WhatsApp पर पूछें",
    viewMore: "और देखें",
    
    // Contact
    getInTouch: "संपर्क करें",
    contactDesc: "किसी भी पूछताछ के लिए हमारी दुकान पर आएं या संपर्क करें",
    visitStore: "हमारी दुकान पर आएं",
    storeAddress: "दुकान का पता",
    callUs: "कॉल करें",
    whatsApp: "WhatsApp",
    getDirections: "रास्ता देखें",
    
    // Footer
    allRightsReserved: "सर्वाधिकार सुरक्षित",
    madeWith: "बनाया गया",
    inIndia: "भारत में",
    
    // Admin
    adminPanel: "एडमिन पैनल",
    addProduct: "प्रोडक्ट जोड़ें",
    editProduct: "प्रोडक्ट संपादित करें",
    deleteProduct: "प्रोडक्ट हटाएं",
    productName: "प्रोडक्ट का नाम",
    category: "श्रेणी",
    price: "कीमत",
    save: "सहेजें",
    cancel: "रद्द करें",
    login: "लॉगिन",
    logout: "लॉगआउट",
    password: "पासवर्ड"
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
