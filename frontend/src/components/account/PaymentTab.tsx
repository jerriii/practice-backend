import { CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

const PaymentTab = () => {
    return (
        <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your saved payment methods.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <h3 className="font-medium">Visa ending in 4242</h3>
                      </div>
                      <Badge>Default</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expires 12/2025
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <h3 className="font-medium">
                          Mastercard ending in 8888
                        </h3>
                      </div>
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Make Default
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expires 08/2024
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="mt-6">Add Payment Method</Button>
              </CardContent>
            </Card>
    )
}

export default PaymentTab