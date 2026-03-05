import { MapPin, Phone, Clock, Navigation, MessageCircle, Sparkles } from 'lucide-react'
import { businessInfo } from '../data/products'

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-white via-gold-50/30 to-primary-50/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute top-20 right-0 w-72 h-72 bg-gradient-to-br from-primary-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-gradient-to-br from-gold-200/30 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary-100 to-gold-100 text-primary-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Visit Us
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-gray-800 mb-5">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Visit our store or contact us for any queries. We're always happy to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="flex items-start gap-5">
                <div className="p-4 bg-gradient-to-br from-primary-100 to-gold-100 rounded-2xl group-hover:scale-110 transition-transform">
                  <MapPin className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">Our Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {businessInfo.address.line1},<br />
                    {businessInfo.address.line2},<br />
                    <span className="font-medium">{businessInfo.address.city} – {businessInfo.address.pin}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="flex items-start gap-5">
                <div className="p-4 bg-gradient-to-br from-gold-100 to-primary-100 rounded-2xl group-hover:scale-110 transition-transform">
                  <Phone className="w-7 h-7 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">Phone Number</h3>
                  <p className="text-gray-600 text-lg">{businessInfo.phone}</p>
                  <p className="text-gray-400 text-sm mt-1">Call us anytime during business hours</p>
                </div>
              </div>
            </div>

            {/* Timing Card */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="flex items-start gap-5">
                <div className="p-4 bg-gradient-to-br from-primary-100 to-gold-100 rounded-2xl group-hover:scale-110 transition-transform">
                  <Clock className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">Business Hours</h3>
                  <div className="space-y-1">
                    <p className="text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Monday - Saturday: 10:00 AM - 9:00 PM
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Sunday: 11:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={`tel:${businessInfo.phone}`}
                className="flex-1 btn-primary justify-center flex items-center gap-3 py-4 text-lg"
              >
                <Phone size={22} />
                Call Now
              </a>
              <a
                href={`https://wa.me/${businessInfo.whatsapp}?text=Hello! I'd like to inquire about your products.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-whatsapp justify-center py-4 text-lg"
              >
                <MessageCircle size={22} />
                WhatsApp
              </a>
            </div>

            {/* Direction Button */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=26.6984200,82.2743780`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-4 bg-gray-100 hover:bg-gray-200 rounded-2xl text-gray-700 font-semibold transition-all group"
            >
              <Navigation size={22} className="group-hover:rotate-45 transition-transform" />
              Get Directions on Google Maps
            </a>
          </div>

          {/* Map */}
          <div className="h-[500px] lg:h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group">
            <iframe
              src={businessInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
              className="transition-transform duration-500 group-hover:scale-105"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border-4 border-primary-200/50 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
