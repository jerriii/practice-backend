import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

const SettingsTab = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                    Manage your account preferences and settings.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Preferences</h3>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="marketing" />
                            <Label htmlFor="marketing">
                                Receive marketing emails
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="orders" defaultChecked />
                            <Label htmlFor="orders">
                                Order confirmations and updates
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="newsletter" defaultChecked />
                            <Label htmlFor="newsletter">Weekly newsletter</Label>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Privacy Settings</h3>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="data" defaultChecked />
                            <Label htmlFor="data">
                                Allow data collection for personalized experience
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="cookies" defaultChecked />
                            <Label htmlFor="cookies">Accept all cookies</Label>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-destructive">
                        Danger Zone
                    </h3>
                    <Button variant="destructive">Delete Account</Button>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
    )
}
export default SettingsTab