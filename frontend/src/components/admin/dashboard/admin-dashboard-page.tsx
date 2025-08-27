"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, FolderTree, Tags, Users, TrendingUp, ShoppingCart } from "lucide-react"
import AdminDashboardLayout from "./admin-dashboard-layout"

const stats = [
  {
    title: "Total Products",
    value: "1,234",
    description: "+12% from last month",
    icon: Package,
    color: "text-blue-600",
  },
  {
    title: "Categories",
    value: "45",
    description: "+3 new this month",
    icon: FolderTree,
    color: "text-green-600",
  },
  {
    title: "SubCategories",
    value: "156",
    description: "+8 new this month",
    icon: Tags,
    color: "text-purple-600",
  },
  {
    title: "Total Users",
    value: "2,847",
    description: "+18% from last month",
    icon: Users,
    color: "text-orange-600",
  },
  {
    title: "Revenue",
    value: "$45,231",
    description: "+25% from last month",
    icon: TrendingUp,
    color: "text-emerald-600",
  },
  {
    title: "Orders",
    value: "892",
    description: "+15% from last month",
    icon: ShoppingCart,
    color: "text-red-600",
  },
]

export default function AdminDashboardPage() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your admin dashboard</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions in your store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New product added</p>
                    <p className="text-xs text-muted-foreground">iPhone 15 Pro Max added to Electronics</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Category updated</p>
                    <p className="text-xs text-muted-foreground">Fashion category description updated</p>
                  </div>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New subcategory</p>
                    <p className="text-xs text-muted-foreground">Smart Watches added to Electronics</p>
                  </div>
                  <span className="text-xs text-muted-foreground">3 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common management tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <button className="flex items-center justify-start space-x-2 p-2 rounded-md hover:bg-accent text-left">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">Add New Product</span>
                </button>
                <button className="flex items-center justify-start space-x-2 p-2 rounded-md hover:bg-accent text-left">
                  <FolderTree className="h-4 w-4" />
                  <span className="text-sm">Create Category</span>
                </button>
                <button className="flex items-center justify-start space-x-2 p-2 rounded-md hover:bg-accent text-left">
                  <Tags className="h-4 w-4" />
                  <span className="text-sm">Add SubCategory</span>
                </button>
                <button className="flex items-center justify-start space-x-2 p-2 rounded-md hover:bg-accent text-left">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Manage Users</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  )
}
