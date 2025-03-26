"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Clock, Package, Truck } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function OrderTracking({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(2)

  const steps = [
    { id: 1, name: "Order Placed", icon: CheckCircle2, date: "Mar 15, 2023", time: "10:30 AM", completed: true },
    { id: 2, name: "Processing", icon: Clock, date: "Mar 16, 2023", time: "09:45 AM", completed: true },
    { id: 3, name: "Shipped", icon: Truck, date: "Mar 17, 2023", time: "02:15 PM", completed: false },
    { id: 4, name: "Delivered", icon: Package, date: "Expected Mar 20, 2023", time: "", completed: false },
  ]

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-8">
        <Link href={`/orders/${params.id}`} className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Track Order #{params.id}</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipment Status</CardTitle>
              <CardDescription>Track the current status of your order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Progress bar */}
                <div className="absolute left-6 top-0 h-full w-0.5 bg-muted">
                  <div
                    className="absolute left-0 top-0 h-full w-full bg-primary transition-all duration-500"
                    style={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  ></div>
                </div>

                {/* Steps */}
                <div className="space-y-8">
                  {steps.map((step) => {
                    const StepIcon = step.icon
                    return (
                      <div key={step.id} className="relative flex items-start">
                        <div
                          className={`absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border ${
                            step.id <= currentStep ? "bg-primary text-primary-foreground" : "bg-background"
                          }`}
                        >
                          <StepIcon className="h-6 w-6" />
                        </div>

                        <div className="ml-16">
                          <h3 className="font-medium">{step.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            {step.date} {step.time && `• ${step.time}`}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Shipping Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <div className="text-muted-foreground">
                    <p>John Doe</p>
                    <p>123 Main Street, Apt 4B</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Shipping Method</h3>
                  <p className="text-muted-foreground">Standard Shipping (3-5 business days)</p>

                  <h3 className="font-semibold mt-4 mb-2">Tracking Number</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">1Z999AA10123456784</span>
                    <Button variant="ghost" size="sm">
                      Copy
                    </Button>
                  </div>

                  <h3 className="font-semibold mt-4 mb-2">Carrier</h3>
                  <p className="text-muted-foreground">UPS</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Order #{params.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                <div className="space-y-3">
                  {[
                    { name: "Wireless Headphones", quantity: 1, price: 129.99 },
                    { name: "Smart Watch", quantity: 1, price: 199.99 },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$329.98</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$23.10</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total</span>
                  <span>$363.08</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Button className="w-full">Contact Support</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

