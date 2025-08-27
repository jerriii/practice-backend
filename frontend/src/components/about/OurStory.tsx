import Image from "next/image";
const OurStory = () => {
    return (
        <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter">Our Story</h2>
          <p className="text-muted-foreground">
            Founded in 2010, our company began with a simple idea: create
            products that combine style, functionality, and sustainability. What
            started as a small operation in a garage has grown into a global
            brand loved by customers around the world.
          </p>
          <p className="text-muted-foreground">
            Our journey hasn&apos;t always been easy, but our commitment to
            quality and customer satisfaction has never wavered. We believe in
            creating products that stand the test of time, both in durability
            and design.
          </p>
        </div>
        <div className="relative aspect-video md:aspect-square">
          <Image
            src="/placeholder.svg?height=500&width=500"
            alt="Our story"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>
    );
};

export default OurStory;