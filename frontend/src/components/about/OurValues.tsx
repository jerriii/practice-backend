import { Value } from "@/types/about";
import { Card, CardContent } from "../ui/card";

//react boiler plate
const OurValues = ({values}: {values: Value[]}) => {
    return (
        <section className="space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Our Values</h2>
                <p className="max-w-[700px] mx-auto text-muted-foreground">
                    These core principles guide everything we do, from product
                    development to customer service.
                </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value) => (
                    <Card key={value.title} className="border-2">
                        <CardContent className="p-6 space-y-4">
                            <div className="bg-primary/10 p-3 rounded-full w-fit">
                                <value.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">{value.title}</h3>
                            <p className="text-muted-foreground">{value.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default OurValues;
