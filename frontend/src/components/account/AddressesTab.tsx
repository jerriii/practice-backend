import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

const AddressesTab = () => {
return (
    <Card>
    <CardHeader>
      <CardTitle>Addresses</CardTitle>
      <CardDescription>
        Manage your shipping and billing addresses.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border p-4">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Shipping Address</h3>
            <Badge>Default</Badge>
          </div>
          <p className="text-sm">
            John Doe
            <br />
            123 Main St, Apt 4B
            <br />
            New York, NY 10001
            <br />
            United States
            <br />
            (123) 456-7890
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
            <h3 className="font-medium">Billing Address</h3>
            <Button variant="link" size="sm" className="h-auto p-0">
              Make Default
            </Button>
          </div>
          <p className="text-sm">
            John Doe
            <br />
            456 Park Ave
            <br />
            San Francisco, CA 94107
            <br />
            United States
            <br />
            (123) 456-7890
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
      <Button className="mt-6">Add New Address</Button>
    </CardContent>
  </Card>   
)
}

export default AddressesTab
