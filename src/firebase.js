import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKVyu9eSChdACeG5oJAR3pUPMj0R0zqYs",
  authDomain: "saree-shop-ee08a.firebaseapp.com",
  projectId: "saree-shop-ee08a",
  storageBucket: "saree-shop-ee08a.firebasestorage.app",
  messagingSenderId: "409705163355",
  appId: "1:409705163355:web:3f170c02be01bdd066ad7e"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Products collection reference
const productsCollection = collection(db, "products")

// Get all products from Firestore
export const getProducts = async () => {
  try {
    const snapshot = await getDocs(productsCollection)
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// Add a product to Firestore
export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(productsCollection, {
      name: product.name,
      nameHi: product.nameHi || '',
      category: product.category,
      description: product.description,
      descriptionHi: product.descriptionHi || '',
      badge: product.badge || '',
      price: product.price,
      originalPrice: product.originalPrice || null,
      image: product.image,
      createdAt: new Date().toISOString()
    })
    return { id: docRef.id, ...product }
  } catch (error) {
    console.error("Error adding product:", error)
    throw error
  }
}

// Delete a product from Firestore
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, "products", productId))
    return true
  } catch (error) {
    console.error("Error deleting product:", error)
    throw error
  }
}

// Update a product in Firestore
export const updateProduct = async (productId, updatedData) => {
  try {
    await updateDoc(doc(db, "products", productId), updatedData)
    return true
  } catch (error) {
    console.error("Error updating product:", error)
    throw error
  }
}

export { db }
