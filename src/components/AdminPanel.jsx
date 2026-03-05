import { useState, useEffect } from 'react'
import { X, Plus, Trash2, Lock, Eye, EyeOff, Save, LogOut, Package, ShoppingBag, RefreshCw, Loader2, UploadCloud } from 'lucide-react'
import { getProducts, addProduct, deleteProduct, updateProduct, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const AdminPanel = ({ isOpen, onClose, onProductsUpdate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [products, setProducts] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Sarees',
    price: '',
    originalPrice: '',
    image: '',
    badge: '',
    description: ''
  })

  const categories = ['Sarees', 'Suits', 'Readymade', 'Summer Wear', 'Stocklot']
  const badges = ['', 'New Arrival', 'Bestseller', 'Premium', 'Hot Deal', 'Limited Stock']

  const handleImageUpload = (e, target) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadProgress(progress)
      },
      (error) => {
        console.error('Upload failed:', error)
        setError('Image upload failed')
        setIsUploading(false)
        setUploadProgress(0)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        if (target === 'add') {
          setNewProduct(prev => ({ ...prev, image: downloadURL }))
        } else {
          setEditingProduct(prev => ({ ...prev, image: downloadURL }))
        }
        setIsUploading(false)
        setUploadProgress(0)
        setSuccess('Image uploaded successfully!')
        setTimeout(() => setSuccess(''), 3000)
      }
    )
  }

  const loadProducts = async () => {
    setLoading(true)
    try {
      const firebaseProducts = await getProducts()
      setProducts(firebaseProducts)
      if (onProductsUpdate) onProductsUpdate(firebaseProducts)
    } catch (error) {
      console.error('Error loading products:', error)
      setError('Failed to load products')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadProducts()
      const authSession = sessionStorage.getItem('adminAuth')
      if (authSession === 'true') {
        setIsAuthenticated(true)
      }
    }
  }, [isOpen])

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (password === 'pihu@100402') {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuth', 'true')
      setPassword('')
    } else {
      setError('Incorrect password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuth')
    onClose()
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setLoading(true)

    const imageUrl = newProduct.image?.trim()

    const productData = {
      name: newProduct.name,
      category: newProduct.category,
      description: newProduct.description,
      badge: newProduct.badge,
      price: parseFloat(newProduct.price) || 0,
      originalPrice: parseFloat(newProduct.originalPrice) || null,
      image: imageUrl || 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=400'
    }

    try {
      await addProduct(productData)
      await loadProducts()

      setNewProduct({
        name: '',
        category: 'Sarees',
        price: '',
        originalPrice: '',
        image: '',
        badge: '',
        description: ''
      })
      setShowAddForm(false)
      setSuccess('Product added successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError('Failed to add product')
      setTimeout(() => setError(''), 3000)
    }
    setLoading(false)
  }

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    setLoading(true)
    try {
      await deleteProduct(id)
      await loadProducts()
      setSuccess('Product deleted!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError('Failed to delete product')
      setTimeout(() => setError(''), 3000)
    }
    setLoading(false)
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    setLoading(true)

    const productData = {
      name: editingProduct.name,
      category: editingProduct.category,
      description: editingProduct.description,
      badge: editingProduct.badge,
      price: parseFloat(editingProduct.price) || 0,
      originalPrice: parseFloat(editingProduct.originalPrice) || null,
      image: editingProduct.image
    }

    try {
      await updateProduct(editingProduct.id, productData)
      await loadProducts()
      setEditingProduct(null)
      setSuccess('Product updated!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError('Failed to update product')
      setTimeout(() => setError(''), 3000)
    }
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-600 via-primary-700 to-gold-600 text-white p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Admin Panel</h2>
              <p className="text-white/80 text-sm">Manage your products</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Status Messages */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">
                <X size={18} />
              </button>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
              {success}
            </div>
          )}

          {!isAuthenticated ? (
            /* Login Form */
            <div className="max-w-sm mx-auto py-10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Admin Login</h3>
                <p className="text-gray-500">Enter password to access admin panel</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-5 py-4 pr-12 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-4 text-lg"
                >
                  Login to Admin
                </button>
              </form>
            </div>
          ) : (
            /* Admin Dashboard */
            <div className="space-y-6">
              {/* Actions Bar */}
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package size={20} />
                    <span className="font-medium">{products.length} Custom Products</span>
                  </div>
                  <button
                    onClick={loadProducts}
                    className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Refresh products"
                  >
                    <RefreshCw size={18} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    <Plus size={20} />
                    Add Product
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              </div>

              {/* Add Product Form */}
              {showAddForm && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Plus className="text-green-600" size={20} />
                    Add New Product
                  </h3>
                  <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                      <input
                        type="text"
                        required
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., Silk Banarasi Saree"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                      <input
                        type="number"
                        required
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                        placeholder="1999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                      <input
                        type="number"
                        value={newProduct.originalPrice}
                        onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                        placeholder="2999 (for showing discount)"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Image *</label>
                      <div className="flex gap-4 items-start">
                        <div className="flex-1 space-y-3">
                          <input
                            type="url"
                            required
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                            placeholder="https://example.com/image.jpg"
                          />
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'add')}
                              disabled={isUploading}
                              className="hidden"
                              id="image-upload-add"
                            />
                            <label
                              htmlFor="image-upload-add"
                              className={`flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isUploading ? 'border-green-300 text-green-600' : 'border-gray-300 hover:bg-gray-100 text-gray-600'
                                }`}
                            >
                              {isUploading ? (
                                <>
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                  <span className="font-medium">Uploading... {Math.round(uploadProgress)}%</span>
                                </>
                              ) : (
                                <>
                                  <UploadCloud className="w-5 h-5 text-gray-500" />
                                  <span className="font-medium">Or upload image from device</span>
                                </>
                              )}
                            </label>
                          </div>
                        </div>
                        {newProduct.image && (
                          <div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden border-2 border-gray-100 bg-gray-50 p-1">
                            <img
                              src={newProduct.image}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => e.target.style.display = 'none'}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                      <select
                        value={newProduct.badge}
                        onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                      >
                        {badges.map(badge => (
                          <option key={badge} value={badge}>{badge || 'No Badge'}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                        rows={2}
                        placeholder="Product description..."
                      />
                    </div>
                    <div className="md:col-span-2 flex gap-3 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg"
                      >
                        <Save size={18} />
                        Save Product
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Edit Product Form */}
              {editingProduct && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Edit Product</h3>
                  <form onSubmit={handleUpdateProduct} className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        required
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                      <input
                        type="number"
                        value={editingProduct.originalPrice || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                      <div className="flex gap-4 items-start">
                        <div className="flex-1 space-y-3">
                          <input
                            type="url"
                            required
                            value={editingProduct.image || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl"
                            placeholder="https://example.com/image.jpg"
                          />
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'edit')}
                              disabled={isUploading}
                              className="hidden"
                              id="image-upload-edit"
                            />
                            <label
                              htmlFor="image-upload-edit"
                              className={`flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isUploading ? 'border-blue-300 text-blue-600' : 'border-gray-300 hover:bg-gray-100 text-gray-600'
                                }`}
                            >
                              {isUploading ? (
                                <>
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                  <span className="font-medium">Uploading... {Math.round(uploadProgress)}%</span>
                                </>
                              ) : (
                                <>
                                  <UploadCloud className="w-5 h-5 text-gray-500" />
                                  <span className="font-medium">Or upload new image from device</span>
                                </>
                              )}
                            </label>
                          </div>
                        </div>
                        {editingProduct.image && (
                          <div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden border-2 border-gray-100 bg-gray-50 p-1">
                            <img
                              src={editingProduct.image}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => e.target.style.display = 'none'}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                      <select
                        value={editingProduct.badge || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl"
                      >
                        {badges.map(badge => (
                          <option key={badge} value={badge}>{badge || 'No Badge'}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2 flex gap-3 justify-end">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium"
                      >
                        <Save size={18} />
                        Update Product
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products List */}
              {products.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-[4/3] bg-gray-100 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=400'
                          }}
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-primary-600 font-medium mb-1">{product.category}</p>
                        <h4 className="font-semibold text-gray-800 mb-2 line-clamp-1">{product.name}</h4>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-bold text-gray-800">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {products.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Custom Products Yet</h3>
                  <p className="text-gray-400 mb-6">Click "Add Product" to add your first product</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-gold-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    <Plus size={20} />
                    Add Your First Product
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
