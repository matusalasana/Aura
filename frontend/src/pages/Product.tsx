// src/pages/Product.tsx
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import ratingIcon from '../assets/star_icon.png'
import blurRatingIcon from '../assets/star_dull_icon.png'
import Footer from "../components/Footer"
import Reviews from "../components/Reviews"
import ProductItem from "../components/ProductItem"
import Title from "../components/Title"
import { ShoppingBag, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { useProducts } from "../hooks/useProducts"
import useCartStore from "../stores/cartStore"
import useWishlistStore from "../stores/wishlistStore"
import useUIStore from "../stores/uiStore"
import { Product as ProductType } from "../stores/types"

function ProductDetail() {
    const { productId } = useParams()
    const { category } = useParams()
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [productData, setProductData] = useState<ProductType | null>(null)
    const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([])

    const { data: products } = useProducts()
    const addToCart = useCartStore((state) => state.addToCart)
    const currency = useUIStore((state) => state.currency)
    const { toggleWishlist, isInWishlist } = useWishlistStore()

    useEffect(() => {
        if (productId && products) {
            const foundProduct = products.find(p => p._id === productId)
            setProductData(foundProduct || null)
        }
    }, [productId, products])

    useEffect(() => {
        if (productData && category && products) {
            const related = products
                .filter(item => item.category === category && item._id !== productData._id)
                .slice(0, 5)
            setRelatedProducts(related)
        }
    }, [productData, category, products])

    if (!productData) {
        return (
            <div className="pt-32 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
                    <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
                </div>
            </div>
        )
    }

    const isWishlisted = isInWishlist(productData._id)

    return (
        <div className="pt-24 min-h-screen bg-gray-50">
            {/* Product Main Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                  
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <img 
                                src={productData.image[selectedImage]}
                                alt={productData.name}
                                className="w-96 h-96 lg:h-[500px] lg:w-[500px] object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        
                        {/* Thumbnail Gallery */}
                        {productData.image.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {productData.image.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                            selectedImage === index ? 'border-gray-600' : 'border-gray-200'
                                        }`}
                                    >
                                        <img 
                                            src={img} 
                                            alt={`${productData.name} view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        {/* Breadcrumb */}
                        <div className="text-sm text-gray-500">
                            <span>Home / </span>
                            <span className="capitalize">{productData.category} / </span>
                            <span className="text-gray-900 font-medium">{productData.name}</span>
                        </div>

                        {/* Product Title */}
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                            {productData.name}
                        </h1>

                        {/* Rating and Reviews */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <img 
                                        key={star}
                                        src={star <= 4 ? ratingIcon : blurRatingIcon} 
                                        alt="rating star"
                                        className="w-5 h-5"
                                    />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">(122 reviews)</span>
                            </div>
                            <span className="text-blue-600 text-sm font-medium">In Stock</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <span className="text-4xl font-bold text-gray-900">
                                {currency}{productData.price}
                            </span>
                            {productData.bestseller && (
                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                                    Bestseller
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {productData.description}
                        </p>

                        {/* Size Selection */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="font-semibold text-gray-900">Select Size</label>
                                <button className="text-gray-600 text-sm font-medium">Size Guide</button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {productData.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 border-2 rounded-xl font-medium transition-all duration-200 ${
                                            selectedSize === size
                                                ? 'border-gray-600 bg-gray-50'
                                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded-xl">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-3 font-medium min-w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="flex gap-3 flex-1">
                                    <button 
                                        onClick={() => addToCart(productData._id)}
                                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                    >
                                        <ShoppingBag size={20} />
                                        Add to Cart
                                    </button>
                                  
                                    <button 
                                        onClick={() => toggleWishlist(productData._id)}
                                        className="p-3 border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-colors duration-200"
                                    >
                                        <Heart 
                                            size={20} 
                                            className={isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"} 
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Secondary Actions */}
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                                    <Share2 size={18} />
                                    Share
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Truck size={20} />
                                <div>
                                    <div className="font-medium">Free Shipping</div>
                                    <div className="text-sm">On orders over $50</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Shield size={20} />
                                <div>
                                    <div className="font-medium">2-Year Warranty</div>
                                    <div className="text-sm">Quality guaranteed</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <RotateCcw size={20} />
                                <div>
                                    <div className="font-medium">Easy Returns</div>
                                    <div className="text-sm">30-day policy</div>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                            <h3 className="font-semibold text-gray-900">Product Details</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                                    100% Original product
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                                    Cash on delivery available
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                                    Easy return and exchange within 7 days
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <Reviews />
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
                    <Title text1="RELATED" text2="PRODUCTS" />
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {relatedProducts.map((product) => (
                            <ProductItem
                                key={product._id}
                                name={product.name}
                                productId={product._id}
                                imgURL={product.image}
                                price={product.price}
                                category={product.category}
                            />
                        ))}
                    </div>
                </section>
            )}

            <Footer />
        </div>
    )
}

export default ProductDetail