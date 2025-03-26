"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Search,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
  User,
  MessageCircle,
  Shield,
  Award,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Mock product data
const getProductData = (id: string) => {
  return {
    id,
    name: "Wireless Bluetooth Headphones Noise Cancelling Over-Ear Headset with Microphone",
    price: 45.99,
    originalPrice: 89.99,
    discount: 49,
    rating: 4.7,
    reviewCount: 2453,
    sold: 5789,
    brand: "AudioTech",
    sku: "AT-WH-500-BK",
    stock: 156,
    description:
      "Experience premium sound quality with these wireless Bluetooth headphones featuring active noise cancellation, comfortable over-ear design, and built-in microphone for hands-free calls. Enjoy up to 30 hours of playtime on a single charge.",
    highlights: [
      "Active Noise Cancellation Technology",
      "30 Hours Battery Life",
      "Bluetooth 5.0 Connectivity",
      "Built-in Microphone",
      "Comfortable Over-Ear Design",
      "Fast Charging (10 min charge = 5 hours playback)",
      "Compatible with iOS and Android",
    ],
    specifications: {
      Brand: "AudioTech",
      Model: "AT-WH-500",
      Color: "Black",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      "Battery Life": "Up to 30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
      Dimensions: "18 x 15 x 8 cm",
      Warranty: "1 year manufacturer warranty",
    },
    images: [
      "/placeholder.svg?height=600&width=600&text=Headphones+Main",
      "/placeholder.svg?height=600&width=600&text=Headphones+Side",
      "/placeholder.svg?height=600&width=600&text=Headphones+Back",
      "/placeholder.svg?height=600&width=600&text=Headphones+Detail",
      "/placeholder.svg?height=600&width=600&text=Headphones+Package",
    ],
    colors: ["Black", "White", "Blue"],
    seller: {
      name: "AudioTech Official Store",
      rating: 4.8,
      isOfficial: true,
      responseRate: 98,
      responseTime: "within 12 hours",
      followers: 45678,
    },
    shipping: {
      free: true,
      locations: ["New York", "Los Angeles", "Chicago", "Houston"],
      estimatedDelivery: "3-5 business days",
    },
    reviews: [
      {
        name: "John D.",
        rating: 5,
        date: "2 months ago",
        comment: "Great sound quality and the noise cancellation works perfectly. Battery life is impressive!",
      },
      {
        name: "Sarah M.",
        rating: 4,
        date: "3 months ago",
        comment: "Very comfortable for long listening sessions. The sound is clear but bass could be stronger.",
      },
      {
        name: "Michael T.",
        rating: 5,
        date: "1 month ago",
        comment: "Best headphones I've owned. The build quality is excellent and they pair easily with all my devices.",
      },
    ],
    relatedProducts: [
      {
        id: 2,
        name: "Wireless Earbuds with Charging Case",
        price: 29.99,
        originalPrice: 49.99,
        image: "/placeholder.svg?height=400&width=400&text=Earbuds",
        rating: 4.5,
      },
      {
        id: 3,
        name: "Bluetooth Speaker Waterproof",
        price: 39.99,
        originalPrice: 59.99,
        image: "/placeholder.svg?height=400&width=400&text=Speaker",
        rating: 4.6,
      },
      {
        id: 4,
        name: "Noise Cancelling Earphones",
        price: 19.99,
        originalPrice: 34.99,
        image: "/placeholder.svg?height=400&width=400&text=Earphones",
        rating: 4.3,
      },
      {
        id: 5,
        name: "Gaming Headset with Microphone",
        price: 59.99,
        originalPrice: 79.99,
        image: "/placeholder.svg?height=400&width=400&text=Gaming+Headset",
        rating: 4.7,
      },
      {
        id: 6,
        name: "Portable Bluetooth Adapter",
        price: 15.99,
        originalPrice: 24.99,
        image: "/placeholder.svg?height=400&width=400&text=Bluetooth+Adapter",
        rating: 4.2,
      },
    ],
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductData(params.id)
  const [mainImage, setMainImage] = useState(product.images[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)

  const updateQuantity = (change: number) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stock, prev + change)))
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <header className="bg-[#f85606] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-xs">
            <div className="flex space-x-4">
              <Link href="/seller-center" className="hover:underline">
                Sell on Daraz
              </Link>
              <Link href="/download" className="hover:underline">
                Download App
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/help" className="hover:underline">
                Help
              </Link>
              <Link href="/track-order" className="hover:underline">
                Track Order
              </Link>
              <Link href="/signup" className="hover:underline">
                Sign Up
              </Link>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Link href="/" className="mr-8">
              <h1 className="text-[#f85606] text-3xl font-bold">Daraz</h1>
            </Link>

            <div className="flex-1 max-w-4xl">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search in Daraz"
                  className="pl-4 pr-10 py-2 border-[#f85606] focus:ring-[#f85606]"
                />
                <Button className="absolute right-0 top-0 h-full bg-[#f85606] hover:bg-[#f85606]/90 rounded-l-none">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center ml-8 space-x-6">
              <Link href="/account" className="flex flex-col items-center text-gray-700">
                <User className="h-6 w-6" />
                <span className="text-xs mt-1">Account</span>
              </Link>
              <Link href="/wishlist" className="flex flex-col items-center text-gray-700">
                <Heart className="h-6 w-6" />
                <span className="text-xs mt-1">Wishlist</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center text-gray-700">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-[#f85606]">
                    3
                  </Badge>
                </div>
                <span className="text-xs mt-1">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-[#f85606]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/category/electronics" className="hover:text-[#f85606]">
              Electronics
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/category/electronics/headphones" className="hover:text-[#f85606]">
              Headphones
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="truncate max-w-[300px]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <main className="flex-grow bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4">
              {/* Product Images - 5 columns */}
              <div className="md:col-span-5">
                <div className="sticky top-20">
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-4 border">
                    <Image src={mainImage || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
                    {product.discount > 0 && (
                      <div className="absolute top-4 left-4 bg-[#f85606] text-white text-sm px-2 py-1 rounded">
                        -{product.discount}%
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full h-8 w-8"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        className={`relative aspect-square overflow-hidden rounded-md border-2 ${
                          mainImage === image ? "border-[#f85606]" : "border-gray-200"
                        }`}
                        onClick={() => setMainImage(image)}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info - 7 columns */}
              <div className="md:col-span-7">
                <div>
                  {product.seller.isOfficial && <Badge className="bg-blue-600 mb-2">Official Store</Badge>}
                  <h1 className="text-xl md:text-2xl font-medium mb-2">{product.name}</h1>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : i < product.rating
                                  ? "text-yellow-400 fill-yellow-400 opacity-50"
                                  : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-500">{product.rating}</span>
                    </div>
                    <div className="text-sm text-gray-500">{product.reviewCount} Ratings</div>
                    <div className="text-sm text-gray-500">{product.sold} Sold</div>
                  </div>

                  <div className="bg-gray-50 p-4 mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-[#f85606]">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <>
                          <span className="ml-2 text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                          <span className="ml-2 text-[#f85606]">-{product.discount}%</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm text-gray-500 mb-2">Color</h3>
                      <div className="flex space-x-3">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            className={`px-4 py-2 border rounded-md ${
                              selectedColor === color
                                ? "border-[#f85606] text-[#f85606]"
                                : "border-gray-200 text-gray-700"
                            }`}
                            onClick={() => setSelectedColor(color)}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm text-gray-500 mb-2">Quantity</h3>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-r-none"
                          onClick={() => updateQuantity(-1)}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                          className="h-9 w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          min={1}
                          max={product.stock}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-l-none"
                          onClick={() => updateQuantity(1)}
                          disabled={quantity >= product.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <span className="ml-4 text-sm text-gray-500">{product.stock} available</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        className="flex-1 bg-[#f85606] hover:bg-[#f85606]/90 h-12"
                        onClick={() => alert("Added to cart!")}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                      </Button>
                      <Button
                        className="flex-1 bg-[#ff9f00] hover:bg-[#ff9f00]/90 h-12"
                        onClick={() => alert("Buy now!")}
                      >
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Buy Now
                      </Button>
                    </div>
                  </div>

                  <div className="mt-8 border-t pt-6">
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 mr-2 text-gray-500" />
                        <span>Free Shipping</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-gray-500" />
                        <span>Authentic Product</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-gray-500" />
                        <span>Delivery: {product.shipping.estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
            {/* Seller Info - 3 columns */}
            <div className="md:col-span-3 order-2 md:order-1">
              <Card className="overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 mr-3">
                      <Image
                        src="/placeholder.svg?height=100&width=100&text=Logo"
                        alt={product.seller.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{product.seller.name}</h3>
                      <div className="flex items-center text-sm">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{product.seller.rating} Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Response Rate</div>
                      <div className="font-medium">{product.seller.responseRate}%</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Response Time</div>
                      <div className="font-medium">{product.seller.responseTime}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Joined</div>
                      <div className="font-medium">2 years ago</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Followers</div>
                      <div className="font-medium">{product.seller.followers.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      Visit Store
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="mt-4 overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-medium">Delivery & Returns</h3>
                </div>
                <div className="p-4 space-y-4 text-sm">
                  <div>
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Shipping</span>
                    </div>
                    <div className="ml-6 mt-1 text-gray-500">
                      {product.shipping.free ? "Free Shipping" : "Standard Shipping Fee"}
                    </div>
                    <div className="ml-6 text-gray-500">Estimated delivery: {product.shipping.estimatedDelivery}</div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Warranty</span>
                    </div>
                    <div className="ml-6 mt-1 text-gray-500">{product.specifications.Warranty}</div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Return Policy</span>
                    </div>
                    <div className="ml-6 mt-1 text-gray-500">
                      Free return within 15 days for Official Store items and 7 days for other eligible items.
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Product Details & Reviews - 9 columns */}
            <div className="md:col-span-9 order-1 md:order-2">
              <Card className="overflow-hidden">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-none p-0 h-auto">
                    <TabsTrigger
                      value="details"
                      className="py-4 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none"
                    >
                      Product Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="specifications"
                      className="py-4 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none"
                    >
                      Specifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="py-4 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none"
                    >
                      Ratings & Reviews
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="p-6 m-0">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-3">Product Description</h3>
                        <p className="text-gray-700">{product.description}</p>
                      </div>

                      <div>
                        <h3 className="font-medium text-lg mb-3">Highlights</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {product.highlights.map((highlight, index) => (
                            <li key={index} className="text-gray-700">
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="relative h-[400px] w-full rounded-lg overflow-hidden border">
                        <Image
                          src="/placeholder.svg?height=800&width=1200&text=Product+Details+Image"
                          alt="Product Details"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="specifications" className="p-6 m-0">
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg mb-3">Technical Specifications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="grid grid-cols-2 border-b pb-2">
                            <div className="font-medium text-gray-700">{key}</div>
                            <div className="text-gray-600">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="p-6 m-0">
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                          <div className="text-4xl font-bold mr-4">{product.rating}</div>
                          <div>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < Math.floor(product.rating)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : i < product.rating
                                        ? "text-yellow-400 fill-yellow-400 opacity-50"
                                        : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">{product.reviewCount} ratings</div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" className="text-sm h-9">
                            All Reviews
                          </Button>
                          <Button variant="outline" className="text-sm h-9">
                            With Photos
                          </Button>
                          <Button variant="outline" className="text-sm h-9">
                            With Videos
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {product.reviews.map((review, index) => (
                          <div key={index} className="border-b pb-6">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">{review.name}</h4>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>

                      <div className="text-center">
                        <Button variant="outline">Load More Reviews</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>

          {/* Related Products */}
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {product.relatedProducts.map((relatedProduct) => (
                <Link href={`/products/${relatedProduct.id}`} key={relatedProduct.id} className="group">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                    <div className="relative h-[200px]">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain p-4"
                      />
                      {relatedProduct.originalPrice && relatedProduct.price < relatedProduct.originalPrice && (
                        <div className="absolute top-2 left-2 bg-[#f85606] text-white text-xs px-2 py-1">
                          -{Math.round((1 - relatedProduct.price / relatedProduct.originalPrice) * 100)}%
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm text-gray-800 line-clamp-2 group-hover:text-[#f85606]">
                        {relatedProduct.name}
                      </h3>
                      <div className="mt-2">
                        <div className="text-[#f85606] font-bold">${relatedProduct.price.toFixed(2)}</div>
                        {relatedProduct.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">
                            ${relatedProduct.originalPrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help-center" className="hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/how-to-buy" className="hover:underline">
                    How to Buy
                  </Link>
                </li>
                <li>
                  <Link href="/returns-refunds" className="hover:underline">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">About Daraz</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about-us" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/terms-conditions" className="hover:underline">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Payment Methods</h3>
              <div className="grid grid-cols-3 gap-2">
                {["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay", "Cash"].map((method, index) => (
                  <div key={index} className="bg-white text-gray-800 rounded p-2 text-xs text-center">
                    {method}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram", "YouTube"].map((social, index) => (
                  <Link href={`/${social.toLowerCase()}`} key={index} className="hover:text-[#f85606]">
                    {social}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm">
            <p>© 2023 Daraz. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

