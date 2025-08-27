import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CardDescription, CardHeader, CardTitle } from "../ui/card"

const UserProfileHeader = () => {
    return (
        <CardHeader>
            <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>John Doe</CardTitle>
                    <CardDescription>john.doe@example.com</CardDescription>
                </div>
            </div>
        </CardHeader>
    )
}

export default UserProfileHeader