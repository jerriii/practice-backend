import { Milestone } from "@/types/about"
import Image from "next/image"

const Milestones = ({ milestones }: { milestones: Milestone[] }) => {
    return (<section className="space-y-8">
        <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Our Journey</h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground">
                Key milestones that have shaped our company over the years.
            </p>
        </div>
        <div className="space-y-8">
            {milestones.map((milestone, index) => (
                <div
                    key={milestone.year}
                    className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
                >
                    <div className="md:w-1/2 space-y-4">
                        <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                            {milestone.year}
                        </div>
                        <h3 className="text-2xl font-bold">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                    <div className="md:w-1/2 relative aspect-video">
                        <Image
                            src={milestone.image || "/placeholder.svg"}
                            alt={milestone.title}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
            ))}
        </div>
    </section>)
}

export default Milestones;
