import { Team as TeamType } from "@/types/about";
import Image from "next/image";

//react boiler plate
const Team = ({team}: {team: TeamType[]}) => {
    return (
        <section className="space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Meet Our Team</h2>
                <p className="max-w-[700px] mx-auto text-muted-foreground">
                    The passionate individuals behind our brand who work tirelessly to
                    bring you the best products.
                </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member) => (
                    <div key={member.name} className="text-center space-y-3">
                        <div className="relative aspect-square overflow-hidden rounded-full mx-auto w-40 h-40">
                            <Image
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-bold">{member.name}</h3>
                            <p className="text-muted-foreground">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Team;
