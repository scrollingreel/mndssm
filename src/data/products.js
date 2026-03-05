// Static product data - No database required
export const products = [
  {
    id: 1,
    name: "Banarasi Silk Saree",
    nameHi: "बनारसी सिल्क साड़ी",
    category: "Sarees",
    image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    description: "Elegant traditional Banarasi silk with intricate zari work",
    descriptionHi: "सुंदर पारंपरिक बनारसी सिल्क जरी वर्क के साथ"
  },
  {
    id: 2,
    name: "Kanjivaram Silk Saree",
    nameHi: "कांजीवरम सिल्क साड़ी",
    category: "Sarees",
    image: "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    description: "Premium South Indian silk saree with temple border",
    descriptionHi: "प्रीमियम दक्षिण भारतीय सिल्क साड़ी टेम्पल बॉर्डर के साथ"
  }
];

export const categories = [
  "All",
  "Sarees",
  "Suits",
  "Readymade Garments",
  "Summer Wear",
  "Stocklot Garments"
];

export const paymentMethods = [
  { name: "Cash", icon: "💵" },
  { name: "Card on Delivery", icon: "💳" },
  { name: "UPI", icon: "📱" },
  { name: "PhonePe", icon: "📲" },
  { name: "Google Pay", icon: "🅖" },
  { name: "Paytm", icon: "₿" },
  { name: "BHIM", icon: "🏛️" }
];

export const businessInfo = {
  name: "Maa Nav Durga Saree Suit Collection",
  tagline: "Trusted Saree, Suit & Readymade Garment Store since 2018",
  phone: "+91 7905493852",
  whatsapp: "917905493852",
  address: {
    line1: "Maa Navdurga Saree Suit Mahal, Avadh Market",
    line2: "Near Pura Bazar Tiraha, Billar Ghat Mod",
    city: "Faizabad",
    pin: "224171",
    state: "Uttar Pradesh"
  },
  established: 2018,
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d82.274403!3d26.698442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQxJzU0LjQiTiA4MsKwMTYnMjcuOSJF!5e0!3m2!1sen!2sin!4v1234567890",
  coordinates: {
    lat: 26.698442,
    lng: 82.274403
  },
  plusCode: "M7XF+9Q Jalaluddin Nagar Uparh, Uttar Pradesh",
  googleMapsLink: "https://maps.app.goo.gl/J1ThqJeVKm6gWCFD8"
};
