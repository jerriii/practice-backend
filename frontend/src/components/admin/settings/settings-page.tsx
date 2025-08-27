"use client"

import { useState } from "react"
import { Save, Upload, Eye, EyeOff, Bell, Shield, Palette, Mail, CreditCard, Truck, Package } from "lucide-react"
import { Database, Users, Code, Share2, Settings2, Calculator, ShoppingBag, Package2 } from "lucide-react"
import { Download, Search, History, RefreshCw, Globe, BarChart3, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import AdminDashboardLayout from "../dashboard/admin-dashboard-layout"

export default function SettingsPage() {
  const [showSmtpPassword, setShowSmtpPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    orderNotifications: true,
    lowStockAlerts: true,
    newUserRegistrations: false,
    systemUpdates: true,
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <AdminDashboardLayout breadcrumbs={[{ label: "Settings" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your store configuration and preferences</p>
        </div>

        {/* Settings Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search settings..." className="max-w-sm" />
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-2" />
                Settings History
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Config
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import Config
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 2xl:grid-cols-20">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="tax">Tax</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="localization">Localization</TabsTrigger>
            <TabsTrigger value="import-export">Import/Export</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic information about your store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input id="storeName" placeholder="Your Store Name" defaultValue="My Ecommerce Store" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeUrl">Store URL</Label>
                    <Input id="storeUrl" placeholder="https://yourstore.com" defaultValue="https://mystore.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Store Description</Label>
                  <Textarea
                    id="storeDescription"
                    placeholder="Describe your store..."
                    defaultValue="Your one-stop shop for quality products"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="contact@yourstore.com"
                      defaultValue="admin@mystore.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input id="contactPhone" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="cst">Central Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save General Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Settings
                </CardTitle>
                <CardDescription>Configure payment methods and currency settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Currency Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Default Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD - US Dollar</SelectItem>
                          <SelectItem value="eur">EUR - Euro</SelectItem>
                          <SelectItem value="gbp">GBP - British Pound</SelectItem>
                          <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currencyPosition">Currency Position</Label>
                      <Select defaultValue="before">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="before">Before amount ($100)</SelectItem>
                          <SelectItem value="after">After amount (100$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Payment Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Stripe</Label>
                        <p className="text-sm text-muted-foreground">Accept credit cards via Stripe</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>PayPal</Label>
                        <p className="text-sm text-muted-foreground">Accept payments via PayPal</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Cash on Delivery</Label>
                        <p className="text-sm text-muted-foreground">Allow cash payments on delivery</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Stripe Configuration</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stripePublishable">Publishable Key</Label>
                      <Input id="stripePublishable" placeholder="pk_test_..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stripeSecret">Secret Key</Label>
                      <Input id="stripeSecret" type="password" placeholder="sk_test_..." />
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Payment Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipping Settings */}
          <TabsContent value="shipping" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Settings
                </CardTitle>
                <CardDescription>Configure shipping methods and rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shipping Zones</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Domestic Shipping</h4>
                        <p className="text-sm text-muted-foreground">United States</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$5.99 - $15.99</p>
                        <p className="text-sm text-muted-foreground">2-5 business days</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">International Shipping</h4>
                        <p className="text-sm text-muted-foreground">Worldwide</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$19.99 - $49.99</p>
                        <p className="text-sm text-muted-foreground">7-14 business days</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shipping Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Free Shipping</Label>
                        <p className="text-sm text-muted-foreground">Offer free shipping over a certain amount</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="freeShippingThreshold">Free Shipping Threshold</Label>
                      <Input id="freeShippingThreshold" placeholder="$50.00" defaultValue="$75.00" />
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Shipping Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Settings
                </CardTitle>
                <CardDescription>Configure SMTP settings and email templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMTP Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input id="smtpHost" placeholder="smtp.gmail.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input id="smtpPort" placeholder="587" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpUsername">Username</Label>
                      <Input id="smtpUsername" placeholder="your-email@gmail.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">Password</Label>
                      <div className="relative">
                        <Input
                          id="smtpPassword"
                          type={showSmtpPassword ? "text" : "password"}
                          placeholder="Your app password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                        >
                          {showSmtpPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="smtpSsl" defaultChecked />
                    <Label htmlFor="smtpSsl">Use SSL/TLS</Label>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Templates</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Order Confirmation</Label>
                        <p className="text-sm text-muted-foreground">Email sent when order is placed</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Template
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Shipping Notification</Label>
                        <p className="text-sm text-muted-foreground">Email sent when order is shipped</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Template
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Welcome Email</Label>
                        <p className="text-sm text-muted-foreground">Email sent to new customers</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Template
                      </Button>
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Email Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure security policies and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password Policy</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="minPasswordLength">Minimum Password Length</Label>
                      <Select defaultValue="8">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 characters</SelectItem>
                          <SelectItem value="8">8 characters</SelectItem>
                          <SelectItem value="10">10 characters</SelectItem>
                          <SelectItem value="12">12 characters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="requireUppercase" defaultChecked />
                      <Label htmlFor="requireUppercase">Require uppercase letters</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="requireNumbers" defaultChecked />
                      <Label htmlFor="requireNumbers">Require numbers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="requireSpecialChars" />
                      <Label htmlFor="requireSpecialChars">Require special characters</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable 2FA for Admin</Label>
                        <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Optional 2FA for Customers</Label>
                        <p className="text-sm text-muted-foreground">Allow customers to enable 2FA</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Management</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Select defaultValue="60">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="480">8 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>Customize the look and feel of your store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Logo & Branding</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Store Logo</Label>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <Palette className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Favicon</Label>
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                          <div className="w-4 h-4 bg-primary rounded-sm"></div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Favicon
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme Settings</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-primary rounded border"></div>
                        <Input id="primaryColor" placeholder="#3b82f6" defaultValue="#3b82f6" className="w-32" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-secondary rounded border"></div>
                        <Input id="secondaryColor" placeholder="#64748b" defaultValue="#64748b" className="w-32" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Appearance Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Settings */}
          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize your store for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Meta Tags</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">Meta Title</Label>
                      <Input id="metaTitle" placeholder="Your Store - Best Products Online" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        placeholder="Discover amazing products at great prices..."
                        className="resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaKeywords">Meta Keywords</Label>
                      <Input id="metaKeywords" placeholder="ecommerce, online store, products" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Analytics</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                      <Input id="googleAnalytics" placeholder="G-XXXXXXXXXX" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="googleTagManager">Google Tag Manager ID</Label>
                      <Input id="googleTagManager" placeholder="GTM-XXXXXXX" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebookPixel">Facebook Pixel ID</Label>
                      <Input id="facebookPixel" placeholder="123456789012345" />
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save SEO Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure email notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Admin Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Order Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get notified when new orders are placed</p>
                      </div>
                      <Switch
                        checked={notifications.orderNotifications}
                        onCheckedChange={(checked: boolean) => handleNotificationChange("orderNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Low Stock Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get alerted when products are running low</p>
                      </div>
                      <Switch
                        checked={notifications.lowStockAlerts}
                        onCheckedChange={(checked: boolean) => handleNotificationChange("lowStockAlerts", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New User Registrations</Label>
                        <p className="text-sm text-muted-foreground">Get notified when new users register</p>
                      </div>
                      <Switch
                        checked={notifications.newUserRegistrations}
                        onCheckedChange={(checked: boolean) => handleNotificationChange("newUserRegistrations", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about system updates and maintenance
                        </p>
                      </div>
                      <Switch
                        checked={notifications.systemUpdates}
                        onCheckedChange={(checked: boolean) => handleNotificationChange("systemUpdates", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Customer Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Order Confirmations</Label>
                        <p className="text-sm text-muted-foreground">Send order confirmation emails to customers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Shipping Updates</Label>
                        <p className="text-sm text-muted-foreground">Send shipping notifications to customers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Send promotional emails to subscribed customers</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Settings */}
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package2 className="h-5 w-5" />
                  Inventory Settings
                </CardTitle>
                <CardDescription>Configure stock management and inventory tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Stock Management</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Track Inventory</Label>
                        <p className="text-sm text-muted-foreground">Enable inventory tracking for products</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Backorders</Label>
                        <p className="text-sm text-muted-foreground">Allow customers to order out-of-stock items</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                      <Input id="lowStockThreshold" type="number" placeholder="10" defaultValue="5" className="w-32" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="outOfStockThreshold">Out of Stock Threshold</Label>
                      <Input id="outOfStockThreshold" type="number" placeholder="0" defaultValue="0" className="w-32" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Stock Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Low Stock Email Alerts</Label>
                        <p className="text-sm text-muted-foreground">Send email when products reach low stock</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Out of Stock Email Alerts</Label>
                        <p className="text-sm text-muted-foreground">Send email when products go out of stock</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stockAlertEmail">Stock Alert Email</Label>
                      <Input id="stockAlertEmail" type="email" placeholder="inventory@yourstore.com" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Inventory Display</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Stock Quantity</Label>
                        <p className="text-sm text-muted-foreground">Display stock quantity to customers</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Hide Out of Stock Products</Label>
                        <p className="text-sm text-muted-foreground">Hide products when out of stock</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Inventory Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tax Settings */}
          <TabsContent value="tax" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Tax Settings
                </CardTitle>
                <CardDescription>Configure tax rates and tax calculation methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tax Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Tax Calculation</Label>
                        <p className="text-sm text-muted-foreground">Calculate taxes on orders</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxCalculation">Tax Calculation Method</Label>
                      <Select defaultValue="exclusive">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exclusive">Tax Exclusive (add tax to price)</SelectItem>
                          <SelectItem value="inclusive">Tax Inclusive (tax included in price)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxRounding">Tax Rounding</Label>
                      <Select defaultValue="round">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="round">Round to nearest cent</SelectItem>
                          <SelectItem value="up">Round up</SelectItem>
                          <SelectItem value="down">Round down</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tax Rates</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Standard Rate</h4>
                        <Badge variant="secondary">Default</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="standardRate">Tax Rate (%)</Label>
                          <Input id="standardRate" type="number" placeholder="8.25" defaultValue="8.25" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="standardName">Tax Name</Label>
                          <Input id="standardName" placeholder="Sales Tax" defaultValue="Sales Tax" />
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Reduced Rate</h4>
                        <Badge variant="outline">Optional</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="reducedRate">Tax Rate (%)</Label>
                          <Input id="reducedRate" type="number" placeholder="4.00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reducedName">Tax Name</Label>
                          <Input id="reducedName" placeholder="Reduced Tax" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tax Display</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Display Prices with Tax</Label>
                        <p className="text-sm text-muted-foreground">Show tax-inclusive prices to customers</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Tax Breakdown</Label>
                        <p className="text-sm text-muted-foreground">Display tax breakdown in cart and checkout</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Tax Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order Settings */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Settings
                </CardTitle>
                <CardDescription>Configure order processing and management settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Order Processing</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="defaultOrderStatus">Default Order Status</Label>
                      <Select defaultValue="pending">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-confirm Orders</Label>
                        <p className="text-sm text-muted-foreground">Automatically confirm paid orders</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orderTimeout">Order Timeout (minutes)</Label>
                      <Input id="orderTimeout" type="number" placeholder="30" defaultValue="30" className="w-32" />
                      <p className="text-xs text-muted-foreground">Time before unpaid orders are cancelled</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Order Numbering</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="orderPrefix">Order Number Prefix</Label>
                      <Input id="orderPrefix" placeholder="ORD-" defaultValue="ORD-" className="w-32" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orderSuffix">Order Number Suffix</Label>
                      <Input id="orderSuffix" placeholder="-2024" className="w-32" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orderLength">Order Number Length</Label>
                      <Select defaultValue="6">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">4 digits</SelectItem>
                          <SelectItem value="5">5 digits</SelectItem>
                          <SelectItem value="6">6 digits</SelectItem>
                          <SelectItem value="8">8 digits</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Example: <span className="font-mono">ORD-000123-2024</span>
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Order Limits</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="minOrderAmount">Minimum Order Amount</Label>
                      <Input id="minOrderAmount" placeholder="$10.00" className="w-32" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxOrderAmount">Maximum Order Amount</Label>
                      <Input id="maxOrderAmount" placeholder="$5000.00" className="w-32" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxOrderItems">Maximum Items per Order</Label>
                      <Input id="maxOrderItems" type="number" placeholder="50" className="w-32" />
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Order Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Settings */}
          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Customer Settings
                </CardTitle>
                <CardDescription>Configure customer accounts and registration settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Registration Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Customer Registration</Label>
                        <p className="text-sm text-muted-foreground">Enable new customer account creation</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require Email Verification</Label>
                        <p className="text-sm text-muted-foreground">Customers must verify email before login</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Guest Checkout</Label>
                        <p className="text-sm text-muted-foreground">Allow checkout without creating account</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="defaultCustomerGroup">Default Customer Group</Label>
                      <Select defaultValue="general">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="wholesale">Wholesale</SelectItem>
                          <SelectItem value="vip">VIP</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Account Deletion</Label>
                        <p className="text-sm text-muted-foreground">Customers can delete their own accounts</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Customer Reviews</Label>
                        <p className="text-sm text-muted-foreground">Display customer reviews on products</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountInactivity">Account Inactivity Period (days)</Label>
                      <Input
                        id="accountInactivity"
                        type="number"
                        placeholder="365"
                        defaultValue="365"
                        className="w-32"
                      />
                      <p className="text-xs text-muted-foreground">Days before inactive accounts are flagged</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Customer Groups</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">General Customers</h4>
                        <Badge variant="secondary">Default</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Standard customer pricing and access</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Wholesale Customers</h4>
                        <Badge variant="outline">Special Pricing</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Bulk pricing and wholesale access</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">VIP Customers</h4>
                        <Badge variant="outline">Premium</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Premium features and early access</p>
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Customer Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup & Maintenance Settings */}
          <TabsContent value="backup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup & Maintenance
                </CardTitle>
                <CardDescription>Configure system backups and maintenance settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Automatic Backups</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Automatic Backups</Label>
                        <p className="text-sm text-muted-foreground">Automatically backup database and files</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backupFrequency">Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Every Hour</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backupRetention">Backup Retention (days)</Label>
                      <Input id="backupRetention" type="number" placeholder="30" defaultValue="30" className="w-32" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backupLocation">Backup Location</Label>
                      <Select defaultValue="local">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local Storage</SelectItem>
                          <SelectItem value="s3">Amazon S3</SelectItem>
                          <SelectItem value="dropbox">Dropbox</SelectItem>
                          <SelectItem value="google">Google Drive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Manual Backup</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Database Backup</h4>
                        <p className="text-sm text-muted-foreground">Export complete database</p>
                      </div>
                      <Button variant="outline">Create Backup</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Files Backup</h4>
                        <p className="text-sm text-muted-foreground">Export uploaded files and media</p>
                      </div>
                      <Button variant="outline">Create Backup</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Maintenance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">Put site in maintenance mode</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                      <Textarea
                        id="maintenanceMessage"
                        placeholder="We're currently performing maintenance..."
                        defaultValue="We're currently performing scheduled maintenance. Please check back soon!"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Clear Cache</h4>
                        <p className="text-sm text-muted-foreground">Clear system cache and temporary files</p>
                      </div>
                      <Button variant="outline">Clear Cache</Button>
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Backup Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Settings */}
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  API Settings
                </CardTitle>
                <CardDescription>Configure API access and integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable REST API</Label>
                        <p className="text-sm text-muted-foreground">Allow REST API access to your store</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apiVersion">API Version</Label>
                      <Select defaultValue="v1">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v1">Version 1.0</SelectItem>
                          <SelectItem value="v2">Version 2.0</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apiRateLimit">Rate Limit (requests/minute)</Label>
                      <Input id="apiRateLimit" type="number" placeholder="100" defaultValue="100" className="w-32" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API Keys</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Public API Key</h4>
                        <Badge variant="secondary">Read Only</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input value="pk_live_abcd1234..." readOnly className="font-mono text-sm" />
                        <Button variant="outline" size="sm">
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Secret API Key</h4>
                        <Badge variant="destructive">Full Access</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input value="sk_live_****************************" readOnly className="font-mono text-sm" />
                        <Button variant="outline" size="sm">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Webhooks</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Webhooks</Label>
                        <p className="text-sm text-muted-foreground">Send HTTP notifications for events</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webhookUrl">Webhook URL</Label>
                      <Input id="webhookUrl" placeholder="https://yourapp.com/webhook" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webhookSecret">Webhook Secret</Label>
                      <Input id="webhookSecret" placeholder="Your webhook secret" />
                    </div>
                    <div className="space-y-2">
                      <Label>Webhook Events</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="orderCreated" />
                          <Label htmlFor="orderCreated" className="text-sm">
                            Order Created
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="orderUpdated" />
                          <Label htmlFor="orderUpdated" className="text-sm">
                            Order Updated
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="productCreated" />
                          <Label htmlFor="productCreated" className="text-sm">
                            Product Created
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="customerCreated" />
                          <Label htmlFor="customerCreated" className="text-sm">
                            Customer Created
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save API Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Settings */}
          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Social Media Settings
                </CardTitle>
                <CardDescription>Configure social media integration and sharing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Social Media Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebookUrl">Facebook URL</Label>
                      <Input id="facebookUrl" placeholder="https://facebook.com/yourstore" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitterUrl">Twitter URL</Label>
                      <Input id="twitterUrl" placeholder="https://twitter.com/yourstore" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagramUrl">Instagram URL</Label>
                      <Input id="instagramUrl" placeholder="https://instagram.com/yourstore" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                      <Input id="linkedinUrl" placeholder="https://linkedin.com/company/yourstore" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="youtubeUrl">YouTube URL</Label>
                      <Input id="youtubeUrl" placeholder="https://youtube.com/yourstore" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tiktokUrl">TikTok URL</Label>
                      <Input id="tiktokUrl" placeholder="https://tiktok.com/@yourstore" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Social Sharing</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Social Sharing</Label>
                        <p className="text-sm text-muted-foreground">Show social share buttons on products</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Share Platforms</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="shareFacebook" defaultChecked />
                          <Label htmlFor="shareFacebook" className="text-sm">
                            Facebook
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="shareTwitter" defaultChecked />
                          <Label htmlFor="shareTwitter" className="text-sm">
                            Twitter
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="sharePinterest" defaultChecked />
                          <Label htmlFor="sharePinterest" className="text-sm">
                            Pinterest
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="shareWhatsapp" />
                          <Label htmlFor="shareWhatsapp" className="text-sm">
                            WhatsApp
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Social Login</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Facebook Login</Label>
                        <p className="text-sm text-muted-foreground">Allow login with Facebook</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Google Login</Label>
                        <p className="text-sm text-muted-foreground">Allow login with Google</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Apple Login</Label>
                        <p className="text-sm text-muted-foreground">Allow login with Apple ID</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Social Media Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5" />
                  Advanced Settings
                </CardTitle>
                <CardDescription>Advanced system configuration and performance settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Performance Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Caching</Label>
                        <p className="text-sm text-muted-foreground">Cache pages and data for better performance</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cacheExpiry">Cache Expiry (hours)</Label>
                      <Input id="cacheExpiry" type="number" placeholder="24" defaultValue="24" className="w-32" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Compression</Label>
                        <p className="text-sm text-muted-foreground">Compress responses to reduce bandwidth</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Minify CSS/JS</Label>
                        <p className="text-sm text-muted-foreground">Minify CSS and JavaScript files</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Debug Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Debug Mode</Label>
                        <p className="text-sm text-muted-foreground">Enable debug mode for development</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Error Logging</Label>
                        <p className="text-sm text-muted-foreground">Log errors to files</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logLevel">Log Level</Label>
                      <Select defaultValue="error">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Database Settings</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dbConnectionPool">Connection Pool Size</Label>
                      <Input id="dbConnectionPool" type="number" placeholder="10" defaultValue="10" className="w-32" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dbTimeout">Query Timeout (seconds)</Label>
                      <Input id="dbTimeout" type="number" placeholder="30" defaultValue="30" className="w-32" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Query Logging</Label>
                        <p className="text-sm text-muted-foreground">Log database queries for debugging</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">System Version</p>
                        <p className="text-sm text-muted-foreground">v2.1.0</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">Database Version</p>
                        <p className="text-sm text-muted-foreground">PostgreSQL 15.2</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">PHP Version</p>
                        <p className="text-sm text-muted-foreground">8.2.0</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">Server OS</p>
                        <p className="text-sm text-muted-foreground">Ubuntu 22.04</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Advanced Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Settings */}
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics & Reporting
                </CardTitle>
                <CardDescription>Configure analytics tracking and reporting features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Analytics Tracking</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Analytics</Label>
                        <p className="text-sm text-muted-foreground">Track user behavior and sales data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Track Page Views</Label>
                        <p className="text-sm text-muted-foreground">Monitor page view statistics</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Track User Sessions</Label>
                        <p className="text-sm text-muted-foreground">Monitor user session data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Track Conversions</Label>
                        <p className="text-sm text-muted-foreground">Monitor conversion rates and goals</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Reporting Settings</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reportFrequency">Automated Report Frequency</Label>
                      <Select defaultValue="weekly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reportEmail">Report Email Recipients</Label>
                      <Input id="reportEmail" placeholder="admin@yourstore.com, manager@yourstore.com" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Include Sales Data</Label>
                        <p className="text-sm text-muted-foreground">Include sales metrics in reports</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Include Customer Data</Label>
                        <p className="text-sm text-muted-foreground">Include customer analytics in reports</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Retention</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="analyticsRetention">Analytics Data Retention (months)</Label>
                      <Select defaultValue="24">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 months</SelectItem>
                          <SelectItem value="12">12 months</SelectItem>
                          <SelectItem value="24">24 months</SelectItem>
                          <SelectItem value="36">36 months</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Current Storage Usage</span>
                        <span className="text-sm text-muted-foreground">2.4 GB / 10 GB</span>
                      </div>
                      <Progress value={24} className="h-2" />
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Analytics Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Settings */}
          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Third-Party Integrations
                </CardTitle>
                <CardDescription>Connect your store with external services and platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Marketing Integrations</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Mail className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Mailchimp</h4>
                            <p className="text-sm text-muted-foreground">Email marketing automation</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Connected</Badge>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mailchimpKey">API Key</Label>
                        <Input id="mailchimpKey" placeholder="Enter Mailchimp API key" />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <BarChart3 className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Google Analytics</h4>
                            <p className="text-sm text-muted-foreground">Advanced web analytics</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Not Connected</Badge>
                          <Switch />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gaTrackingId">Tracking ID</Label>
                        <Input id="gaTrackingId" placeholder="G-XXXXXXXXXX" />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Share2 className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Klaviyo</h4>
                            <p className="text-sm text-muted-foreground">Email and SMS marketing</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Not Connected</Badge>
                          <Switch />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="klaviyoKey">Private Key</Label>
                        <Input id="klaviyoKey" placeholder="Enter Klaviyo private key" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shipping Integrations</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Truck className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">ShipStation</h4>
                            <p className="text-sm text-muted-foreground">Multi-carrier shipping software</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Connected</Badge>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="shipstationKey">API Key</Label>
                          <Input id="shipstationKey" placeholder="Enter API key" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shipstationSecret">API Secret</Label>
                          <Input id="shipstationSecret" placeholder="Enter API secret" />
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Package className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">UPS</h4>
                            <p className="text-sm text-muted-foreground">UPS shipping integration</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Not Connected</Badge>
                          <Switch />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="upsAccountNumber">Account Number</Label>
                        <Input id="upsAccountNumber" placeholder="Enter UPS account number" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Inventory Integrations</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <Database className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">TradeGecko</h4>
                            <p className="text-sm text-muted-foreground">Inventory management system</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Not Connected</Badge>
                          <Switch />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tradegeckoToken">Access Token</Label>
                        <Input id="tradegeckoToken" placeholder="Enter access token" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Integration Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Localization Settings */}
          <TabsContent value="localization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Localization Settings
                </CardTitle>
                <CardDescription>Configure multi-language and regional settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Language Settings</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="defaultLanguage">Default Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="it">Italian</SelectItem>
                          <SelectItem value="pt">Portuguese</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Multi-Language</Label>
                        <p className="text-sm text-muted-foreground">Allow customers to switch languages</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Available Languages</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="langEn" defaultChecked />
                          <Label htmlFor="langEn" className="text-sm">
                            English
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="langEs" defaultChecked />
                          <Label htmlFor="langEs" className="text-sm">
                            Spanish
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="langFr" />
                          <Label htmlFor="langFr" className="text-sm">
                            French
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="langDe" />
                          <Label htmlFor="langDe" className="text-sm">
                            German
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Regional Settings</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <Select defaultValue="mdy">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mdy">MM/DD/YYYY (US)</SelectItem>
                            <SelectItem value="dmy">DD/MM/YYYY (EU)</SelectItem>
                            <SelectItem value="ymd">YYYY-MM-DD (ISO)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeFormat">Time Format</Label>
                        <Select defaultValue="12">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12">12-hour (AM/PM)</SelectItem>
                            <SelectItem value="24">24-hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numberFormat">Number Format</Label>
                      <Select defaultValue="us">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">1,234.56 (US)</SelectItem>
                          <SelectItem value="eu">1.234,56 (EU)</SelectItem>
                          <SelectItem value="in">1,23,456.78 (Indian)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weekStart">Week Starts On</Label>
                      <Select defaultValue="sunday">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sunday">Sunday</SelectItem>
                          <SelectItem value="monday">Monday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Translation Management</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Translation Progress</h4>
                        <p className="text-sm text-muted-foreground">Overall translation completion</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">85%</p>
                        <Progress value={85} className="w-24 h-2" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span className="text-sm">English</span>
                        <Badge variant="outline">100%</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span className="text-sm">Spanish</span>
                        <Badge variant="outline">95%</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span className="text-sm">French</span>
                        <Badge variant="secondary">60%</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Translation Files
                    </Button>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Localization Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Import/Export Settings */}
          <TabsContent value="import-export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Import/Export Settings
                </CardTitle>
                <CardDescription>Manage data import, export, and migration tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <History className="h-4 w-4" />
                  <AlertDescription>
                    Always backup your data before performing import operations. Large imports may take several minutes
                    to complete.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Export Data</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">Products</h4>
                          <p className="text-sm text-muted-foreground">Export all product data</p>
                        </div>
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="exportImages" defaultChecked />
                          <Label htmlFor="exportImages" className="text-sm">
                            Include images
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="exportVariants" defaultChecked />
                          <Label htmlFor="exportVariants" className="text-sm">
                            Include variants
                          </Label>
                        </div>
                      </div>
                      <Button className="w-full mt-3 bg-transparent" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Products
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">Orders</h4>
                          <p className="text-sm text-muted-foreground">Export order history</p>
                        </div>
                        <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="orderDateFrom" className="text-xs">
                            Date Range
                          </Label>
                          <div className="grid grid-cols-2 gap-2">
                            <Input id="orderDateFrom" type="date" className="text-xs" />
                            <Input id="orderDateTo" type="date" className="text-xs" />
                          </div>
                        </div>
                      </div>
                      <Button className="w-full mt-3 bg-transparent" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Orders
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">Customers</h4>
                          <p className="text-sm text-muted-foreground">Export customer data</p>
                        </div>
                        <Users className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="exportAddresses" defaultChecked />
                          <Label htmlFor="exportAddresses" className="text-sm">
                            Include addresses
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="exportOrderHistory" />
                          <Label htmlFor="exportOrderHistory" className="text-sm">
                            Include order history
                          </Label>
                        </div>
                      </div>
                      <Button className="w-full mt-3 bg-transparent" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Customers
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">Settings</h4>
                          <p className="text-sm text-muted-foreground">Export configuration</p>
                        </div>
                        <Settings2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="exportTheme" defaultChecked />
                          <Label htmlFor="exportTheme" className="text-sm">
                            Include theme settings
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="exportIntegrations" />
                          <Label htmlFor="exportIntegrations" className="text-sm">
                            Include integrations
                          </Label>
                        </div>
                      </div>
                      <Button className="w-full mt-3 bg-transparent" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Settings
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Import Data</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Bulk Product Import</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="productFile">CSV File</Label>
                          <Input id="productFile" type="file" accept=".csv,.xlsx" />
                          <p className="text-xs text-muted-foreground">
                            Supported formats: CSV, Excel. Maximum file size: 50MB
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="importMode">Import Mode</Label>
                          <Select defaultValue="update">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="create">Create new products only</SelectItem>
                              <SelectItem value="update">Update existing products</SelectItem>
                              <SelectItem value="replace">Replace all products</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="validateImport" defaultChecked />
                          <Label htmlFor="validateImport" className="text-sm">
                            Validate data before import
                          </Label>
                        </div>
                        <Button className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Import Products
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Migration Tools</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="migrationPlatform">Source Platform</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="shopify">Shopify</SelectItem>
                              <SelectItem value="woocommerce">WooCommerce</SelectItem>
                              <SelectItem value="magento">Magento</SelectItem>
                              <SelectItem value="bigcommerce">BigCommerce</SelectItem>
                              <SelectItem value="squarespace">Squarespace</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="migrationUrl">Store URL</Label>
                          <Input id="migrationUrl" placeholder="https://yourstore.myshopify.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="migrationKey">API Key/Token</Label>
                          <Input id="migrationKey" placeholder="Enter API credentials" />
                        </div>
                        <Button className="w-full bg-transparent" variant="outline">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Start Migration
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Import/Export History</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="text-sm font-medium">Products Export</p>
                        <p className="text-xs text-muted-foreground">2024-01-15 14:30 - 1,234 products</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Completed</Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="text-sm font-medium">Customer Import</p>
                        <p className="text-xs text-muted-foreground">2024-01-14 09:15 - 567 customers</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Completed</Badge>
                        <Button variant="ghost" size="sm">
                          <History className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="text-sm font-medium">Shopify Migration</p>
                        <p className="text-xs text-muted-foreground">2024-01-13 16:45 - In progress</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Processing</Badge>
                        <Progress value={65} className="w-16 h-2" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Import/Export Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  )
}
