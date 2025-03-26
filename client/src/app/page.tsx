import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, ShoppingCart, Star, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
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

          {/* Categories */}
          <div className="flex items-center space-x-6 mt-4 text-sm">
            <Link href="/category/electronic-devices" className="hover:text-[#f85606]">
              Electronic Devices
            </Link>
            <Link href="/category/electronic-accessories" className="hover:text-[#f85606]">
              Electronic Accessories
            </Link>
            <Link href="/category/tv-home-appliances" className="hover:text-[#f85606]">
              TV & Home Appliances
            </Link>
            <Link href="/category/health-beauty" className="hover:text-[#f85606]">
              Health & Beauty
            </Link>
            <Link href="/category/babies-toys" className="hover:text-[#f85606]">
              Babies & Toys
            </Link>
            <Link href="/category/groceries-pets" className="hover:text-[#f85606]">
              Groceries & Pets
            </Link>
            <Link href="/category/home-lifestyle" className="hover:text-[#f85606]">
              Home & Lifestyle
            </Link>
            <Link href="/category/fashion" className="hover:text-[#f85606]">
              Fashion
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {/* Hero Banner */}
        <section className="bg-gray-100 py-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    alt="Hero Banner"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="col-span-1 space-y-4">
                <div className="relative h-[192px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="Promo Banner 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[192px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="Promo Banner 2"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flash Sale */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h2 className="text-xl font-bold">Flash Sale</h2>
                <div className="ml-4 flex items-center space-x-1 bg-[#f85606] text-white px-2 py-1 rounded">
                  <span className="text-sm">Ending in:</span>
                  <span className="font-bold">12:45:30</span>
                </div>
              </div>
              <Link href="/flash-sale" className="text-[#f85606] hover:underline">
                SHOP MORE
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Link href={`/products/${item}`} key={item} className="group">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-[200px]">
                      <Image
                        src={`/placeholder.svg?height=400&width=400&text=Product+${item}`}
                        alt={`Flash Sale Product ${item}`}
                        fill
                        className="object-contain p-4"
                      />
                      <div className="absolute top-0 left-0 bg-[#f85606] text-white text-xs px-2 py-1">
                        -{Math.floor(Math.random() * 50) + 10}%
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm text-gray-800 line-clamp-2 group-hover:text-[#f85606]">
                        Product Name Here With Some Long Description That Will Be Truncated
                      </h3>
                      <div className="mt-2">
                        <div className="text-[#f85606] font-bold">${(Math.random() * 100 + 10).toFixed(2)}</div>
                        <div className="text-xs text-gray-500 line-through">
                          ${(Math.random() * 200 + 50).toFixed(2)}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">{(Math.random() * 2 + 3).toFixed(1)}</span>
                        </div>
                        <div className="text-xs text-gray-500">{Math.floor(Math.random() * 500)} sold</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {[
                "Smartphones",
                "Laptops",
                "Fashion",
                "Beauty",
                "Home",
                "Appliances",
                "Sports",
                "Automotive",
                "Groceries",
                "Toys",
                "Books",
                "Health",
                "Furniture",
                "Jewelry",
                "Baby Products",
                "Pet Supplies",
              ]
                .slice(0, 8)
                .map((category, index) => (
                  <Link href={`/category/${category.toLowerCase()}`} key={index} className="group">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow text-center p-4">
                      <div className="relative h-[100px] w-[100px] mx-auto">
                        <Image
                          src={`/placeholder.svg?height=200&width=200&text=${category}`}
                          alt={category}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="mt-2 text-sm group-hover:text-[#f85606]">{category}</h3>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Just For You */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold mb-4">Just For You</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <Link href={`/products/${index + 10}`} key={index} className="group">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                    <div className="relative h-[200px]">
                      <Image
                        src={`/placeholder.svg?height=400&width=400&text=Product+${index + 10}`}
                        alt={`Product ${index + 10}`}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm text-gray-800 line-clamp-2 group-hover:text-[#f85606]">
                        {index % 3 === 0 ? "Official Store" : ""} Product Name Here With Some Description
                      </h3>
                      <div className="mt-2">
                        <div className="text-[#f85606] font-bold">${(Math.random() * 100 + 10).toFixed(2)}</div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">{(Math.random() * 2 + 3).toFixed(1)}</span>
                        </div>
                        <div className="text-xs text-gray-500">{Math.floor(Math.random() * 1000)} sold</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" className="border-[#f85606] text-[#f85606] hover:bg-[#f85606] hover:text-white">
                Load More
              </Button>
            </div>
          </div>
        </section>

        {/* Download App */}
        <section className="py-12 bg-[#f85606]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 text-white mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Shop On The Go</h2>
                <p className="text-lg mb-6">Download the app for the best experience</p>
                <div className="flex space-x-4">
                  <Link href="/download/android">
                    <Image
                      src="/placeholder.svg?height=60&width=180&text=Google+Play"
                      alt="Google Play"
                      width={180}
                      height={60}
                      className="rounded-lg"
                    />
                  </Link>
                  <Link href="/download/ios">
                    <Image
                      src="/placeholder.svg?height=60&width=180&text=App+Store"
                      alt="App Store"
                      width={180}
                      height={60}
                      className="rounded-lg"
                    />
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative h-[300px] w-[300px]">
                  <Image
                    src="/placeholder.svg?height=600&width=600&text=App+Screenshot"
                    alt="App Screenshot"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
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
              <div className="mt-6">
                <h4 className="font-bold mb-2">Subscribe to our newsletter</h4>
                <div className="flex">
                  <Input type="email" placeholder="Your email" className="rounded-r-none bg-gray-700 border-gray-600" />
                  <Button className="rounded-l-none bg-[#f85606] hover:bg-[#f85606]/90">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm">
            <p>© 2023 Daraz. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

