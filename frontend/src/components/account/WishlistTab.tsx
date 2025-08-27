import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import { WishlistItem } from "@/types/about"

const WishlistTab = ({wishlistItems}: {wishlistItems: WishlistItem[]}) => {
return(
    <Card>
              <CardHeader>
                <CardTitle>Wishlist</CardTitle>
                <CardDescription>
                  Items you&apos;ve saved for later.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border overflow-hidden"
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          ${item.price}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="w-full">
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="sm" className="px-2">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
)    
}

export default WishlistTab
