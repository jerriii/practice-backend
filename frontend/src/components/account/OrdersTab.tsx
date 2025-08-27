import { Order } from "@/types/about"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"

const OrdersTab = ({orders}: {orders: Order[]}) => {
    return (
        <Card>
              {/* Orders Header */}
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View and manage your previous orders.
                </CardDescription>
              </CardHeader>

              {/* Orders List */}
              <CardContent>
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Order #{order.id}</h3>
                            <Badge
                              variant={
                                order.status === "Delivered"
                                  ? "default"
                                  : order.status === "Processing"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Placed on {order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${order.total.toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {order.items} {order.items === 1 ? "item" : "items"}
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                          View Order
                        </Button>
                        <Button variant="outline" size="sm">
                          Track Package
                        </Button>
                        {order.status === "Delivered" && (
                          <Button variant="outline" size="sm">
                            Write a Review
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
    )
}

export default OrdersTab