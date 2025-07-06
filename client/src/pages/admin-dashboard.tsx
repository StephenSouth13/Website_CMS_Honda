import { useQuery } from "@tanstack/react-query";
import AdminRoute from "@/components/admin-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Bike, Star } from "lucide-react";

export default function AdminDashboard() {
  // Queries to fetch admin data
  const { data: motorcycles = [], isLoading: loadingMotorcycles } = useQuery({
    queryKey: ["/api/admin/motorcycles"],
  });

  const { data: testDrives = [], isLoading: loadingTestDrives } = useQuery({
    queryKey: ["/api/admin/test-drives"],
  });

  const { data: contacts = [], isLoading: loadingContacts } = useQuery({
    queryKey: ["/api/admin/contacts"],
  });

  const { data: promotions = [], isLoading: loadingPromotions } = useQuery({
    queryKey: ["/api/promotions"],
  });

  return (
    <AdminRoute>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your Honda dealership system</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Motorcycles</CardTitle>
              <Bike className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{motorcycles.length}</div>
              <p className="text-xs text-muted-foreground">
                {motorcycles.filter((m: any) => m.inStock).length} in stock
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Test Drive Requests</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testDrives.length}</div>
              <p className="text-xs text-muted-foreground">
                {testDrives.filter((t: any) => t.status === "pending").length} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Requests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contacts.length}</div>
              <p className="text-xs text-muted-foreground">Customer inquiries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {promotions.filter((p: any) => p.isActive).length}
              </div>
              <p className="text-xs text-muted-foreground">Running campaigns</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Functions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Functions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-20">
                  <div className="text-center">
                    <Bike className="h-6 w-6 mx-auto mb-2" />
                    <div>Manage Motorcycles</div>
                  </div>
                </Button>
                <Button className="h-20">
                  <div className="text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2" />
                    <div>Test Drive Requests</div>
                  </div>
                </Button>
                <Button className="h-20">
                  <div className="text-center">
                    <Star className="h-6 w-6 mx-auto mb-2" />
                    <div>Manage Promotions</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Motorcycles List */}
          {loadingMotorcycles ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center">Loading motorcycles...</div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Motorcycles ({motorcycles.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {motorcycles.slice(0, 5).map((motorcycle: any) => (
                    <div key={motorcycle.id} className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <h3 className="font-medium">{motorcycle.name}</h3>
                        <p className="text-sm text-gray-600">{motorcycle.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{parseInt(motorcycle.price).toLocaleString()} VND</p>
                        <Badge variant={motorcycle.inStock ? "default" : "secondary"}>
                          {motorcycle.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {motorcycles.length > 5 && (
                    <p className="text-center text-gray-500">And {motorcycles.length - 5} more...</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Test Drive Requests */}
          {loadingTestDrives ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center">Loading test drive requests...</div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Recent Test Drive Requests ({testDrives.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testDrives.slice(0, 5).map((request: any) => (
                    <div key={request.id} className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <h3 className="font-medium">{request.fullName}</h3>
                        <p className="text-sm text-gray-600">{request.motorcycleName}</p>
                        <p className="text-sm text-gray-500">{request.email}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          request.status === "approved" ? "default" :
                          request.status === "pending" ? "secondary" :
                          request.status === "rejected" ? "destructive" : "outline"
                        }>
                          {request.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {testDrives.length > 5 && (
                    <p className="text-center text-gray-500">And {testDrives.length - 5} more...</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminRoute>
  );
}