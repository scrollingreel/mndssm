import { Heart, Award, MapPin, Users, CheckCircle, Sparkles } from 'lucide-react'
import { businessInfo } from '../data/products'

// Shop images from ImgBB
const shopImg1 = 'https://i.ibb.co/78rxV0s/img1.png'
const shopImg2 = 'https://i.ibb.co/0p42WJrf/img2.png'

const About = () => {
  const features = [
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Customer-Centric",
      description: "Your satisfaction is our top priority"
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Quality Products",
      description: "Wide range of premium garments"
    },
    {
      icon: <MapPin className="w-7 h-7" />,
      title: "Local Landmark",
      description: "Near Pura Bazar, Harlalka Road"
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Trusted Business",
      description: `Serving customers since ${businessInfo.established}`
    }
  ]

  const highlights = [
    "Premium Quality Sarees",
    "Latest Suit Designs",
    "Affordable Prices",
    "100% Customer Satisfaction"
  ]

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-100/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary-100/50 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            {/* Main shop image */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src={shopImg1}
                alt="Maa Nav Durga Saree Collection Shop"
                className="w-full h-[550px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent"></div>
            </div>
            
            {/* Second shop image - floating */}
            <div className="absolute -bottom-8 -right-4 w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20 group">
              <img
                src={shopImg2}
                alt="Shop Interior"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            {/* Decorative frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-gold-400/30 rounded-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-2/3 h-2/3 border-4 border-primary-400/30 rounded-3xl -z-10"></div>
            
            {/* Floating cards */}
            <div className="absolute -bottom-4 left-8 bg-white rounded-2xl shadow-2xl p-5 flex items-center gap-4 animate-float">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-primary-600 to-gold-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {new Date().getFullYear() - businessInfo.established}+
              </div>
              <div>
                <p className="text-gray-400 text-sm">Years of</p>
                <p className="font-semibold text-gray-800 text-lg">Excellence</p>
              </div>
            </div>

            <div className="absolute top-8 right-8 bg-white rounded-2xl shadow-2xl p-4 animate-float animation-delay-300 hidden md:block z-30">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary-200 border-2 border-white flex items-center justify-center text-xs">👩</div>
                  <div className="w-8 h-8 rounded-full bg-gold-200 border-2 border-white flex items-center justify-center text-xs">👩</div>
                  <div className="w-8 h-8 rounded-full bg-primary-300 border-2 border-white flex items-center justify-center text-xs">👩</div>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">1000+</p>
                  <p className="text-gray-400 text-xs">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary-100 to-gold-100 text-primary-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              About Us
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Welcome to <br />
              <span className="text-gradient">{businessInfo.name}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Established in <span className="font-semibold text-primary-600">2018</span>, Maa Nav Durga Saree Suit Collection in 
              <span className="font-semibold text-primary-600"> Bhagwa Bheet, Faizabad</span> is known for quality garments and customer satisfaction. 
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              The store offers a wide range of <strong className="text-gray-700">sarees, suits, readymade garments, summer wear, 
              and stocklot items</strong> at affordable prices. Our commitment to quality and customer 
              service has made us a trusted name in the locality.
            </p>

            {/* Highlight list */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 group cursor-default"
                >
                  <div className="p-3 bg-gradient-to-br from-primary-100 via-primary-50 to-gold-100 rounded-xl text-primary-600 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                    <p className="text-gray-500 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
