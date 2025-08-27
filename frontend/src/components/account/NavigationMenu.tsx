import Link from "next/link";
import { CardContent } from "../ui/card";
import { CreditCard, Heart, Home, Package, Settings, User } from "lucide-react";

const navigations = [
    { name: "Profile", href: "#profile", activeTab: "profile", icon: User },
    { name: "Orders", href: "#orders", activeTab: "orders", icon: Package },
    { name: "Addresses", href: "#addresses", activeTab: "addresses", icon: Home },
    { name: "Payment Methods", href: "#payment", activeTab: "payment", icon: CreditCard },
    { name: "Wishlist", href: "#wishlist", activeTab: "wishlist", icon: Heart },
    { name: "Settings", href: "#settings", activeTab: "settings", icon: Settings },
];

const NavigationMenu = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
    return (
        <CardContent className="p-0">
            <nav className="flex flex-col">
                {navigations.map((navigation) => (
                    <Link
                        key={navigation.name}
                        href={navigation.href}
                        className={`flex items-center gap-3 px-4 py-3 text-sm ${activeTab === navigation.activeTab ? "bg-muted font-medium" : ""}`}
                        onClick={() => setActiveTab(navigation.activeTab)}
                    >
                        <navigation.icon className="h-4 w-4" />
                        {navigation.name}
                    </Link>
                ))}
            </nav>
        </CardContent>
    );
}

export default NavigationMenu