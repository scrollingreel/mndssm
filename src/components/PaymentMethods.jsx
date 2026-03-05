import { paymentMethods } from '../data/products'
import { Shield, BadgeCheck, Wallet } from 'lucide-react'

const PaymentMethods = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6">
            <Wallet className="w-4 h-4" />
            Easy Payments
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Multiple Payment Options
          </h2>
          <p className="text-white/80 text-lg">Pay the way you prefer — we accept all major payment methods</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-5">
          {paymentMethods.map((method, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-default group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{method.icon}</span>
              <span className="font-medium text-white">{method.name}</span>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-14 pt-10 border-t border-white/10">
          <div className="flex items-center gap-3 text-white/90 group cursor-default">
            <div className="p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <span className="font-medium">Secure Payments</span>
          </div>
          <div className="flex items-center gap-3 text-white/90 group cursor-default">
            <div className="p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
              <BadgeCheck className="w-6 h-6 text-green-400" />
            </div>
            <span className="font-medium">Verified Store</span>
          </div>
          <div className="flex items-center gap-3 text-white/90 group cursor-default">
            <div className="p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
              <Wallet className="w-6 h-6 text-gold-400" />
            </div>
            <span className="font-medium">Affordable Prices</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentMethods
