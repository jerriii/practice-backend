import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

const CallToAction = () => {
    return (<section className="bg-muted rounded-lg p-8 text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tighter">
          Join Our Journey
        </h2>
        <p className="max-w-[600px] mx-auto text-muted-foreground">
          Be part of our story by exploring our products and experiencing the
          quality and care we put into everything we create.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg" className="gap-2">
              Shop Our Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>)
}

export default CallToAction;
