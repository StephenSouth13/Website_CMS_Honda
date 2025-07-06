import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Shield, Zap, Fuel, Weight } from "lucide-react";
import type { Motorcycle } from "@shared/schema";

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:slug");
  const slug = params?.slug;

  const { data: motorcycle, isLoading, error } = useQuery<Motorcycle>({
    queryKey: [`/api/motorcycles/slug/${slug}`],
    enabled: !!slug,
  });

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("vi-VN").format(parseInt(price)) + "đ";
  };

  if (isLoading) {
    return (
      <div className="py-20 bg-honda-gray-light min-h-screen">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="h-96 w-full rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-12 w-1/2" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !motorcycle) {
    return (
      <div className="py-20 bg-honda-gray-light min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-3xl font-bold text-honda-black mb-4">
              Không tìm thấy sản phẩm
            </h1>
            <p className="text-honda-gray mb-8">
              Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <Link href="/products">
              <Button className="btn-honda text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại danh sách sản phẩm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-honda-gray-light min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Link href="/products">
          <Button variant="ghost" className="mb-8 p-0 h-auto text-honda-gray hover:text-honda-red">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách sản phẩm
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div>
            <img
              src={motorcycle.imageUrl || ""}
              alt={motorcycle.name}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <h1 className="text-4xl font-bold text-honda-black">{motorcycle.name}</h1>
              {motorcycle.isNew && (
                <Badge className="bg-honda-red text-white text-sm">Mới</Badge>
              )}
            </div>

            <p className="text-xl text-honda-gray">{motorcycle.description}</p>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-honda-red">
                {formatPrice(motorcycle.price)}
              </span>
              {motorcycle.originalPrice && (
                <span className="text-xl text-honda-gray line-through">
                  {formatPrice(motorcycle.originalPrice)}
                </span>
              )}
            </div>

            {/* Key Specs */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-honda-black mb-4">
                  Thông số chính
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {motorcycle.engine && (
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-honda-red" />
                      <div>
                        <p className="text-sm text-honda-gray">Động cơ</p>
                        <p className="font-medium">{motorcycle.engine}</p>
                      </div>
                    </div>
                  )}
                  {motorcycle.displacement && (
                    <div className="flex items-center space-x-2">
                      <Fuel className="h-5 w-5 text-honda-red" />
                      <div>
                        <p className="text-sm text-honda-gray">Dung tích</p>
                        <p className="font-medium">{motorcycle.displacement}</p>
                      </div>
                    </div>
                  )}
                  {motorcycle.weight && (
                    <div className="flex items-center space-x-2">
                      <Weight className="h-5 w-5 text-honda-red" />
                      <div>
                        <p className="text-sm text-honda-gray">Trọng lượng</p>
                        <p className="font-medium">{motorcycle.weight}</p>
                      </div>
                    </div>
                  )}
                  {motorcycle.fuelCapacity && (
                    <div className="flex items-center space-x-2">
                      <Fuel className="h-5 w-5 text-honda-red" />
                      <div>
                        <p className="text-sm text-honda-gray">Bình xăng</p>
                        <p className="font-medium">{motorcycle.fuelCapacity}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            {motorcycle.colors && motorcycle.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-honda-black mb-4">
                  Màu sắc có sẵn
                </h3>
                <div className="flex flex-wrap gap-2">
                  {motorcycle.colors.map((color, index) => (
                    <Badge key={index} variant="outline" className="text-honda-gray">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/test-drive" className="flex-1">
                <Button className="btn-honda text-white w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Đăng ký lái thử
                </Button>
              </Link>
              <Link href="/contact" className="flex-1">
                <Button variant="outline" className="border-honda-red text-honda-red hover:bg-honda-red hover:text-white w-full">
                  Liên hệ tư vấn
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <Card>
          <CardContent className="p-8">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specs">Thông số kỹ thuật</TabsTrigger>
                <TabsTrigger value="features">Tính năng</TabsTrigger>
                <TabsTrigger value="warranty">Bảo hành</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specs" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-honda-black mb-4">Động cơ</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-honda-gray">Loại động cơ:</span>
                        <span>{motorcycle.engine || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-honda-gray">Dung tích:</span>
                        <span>{motorcycle.displacement || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-honda-black mb-4">Kích thước</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-honda-gray">Trọng lượng:</span>
                        <span>{motorcycle.weight || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-honda-gray">Dung tích bình xăng:</span>
                        <span>{motorcycle.fuelCapacity || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="mt-6">
                {motorcycle.features && motorcycle.features.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {motorcycle.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-honda-red rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-honda-gray">Thông tin tính năng sẽ được cập nhật sớm.</p>
                )}
              </TabsContent>
              
              <TabsContent value="warranty" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Shield className="h-6 w-6 text-honda-red mt-1" />
                    <div>
                      <h4 className="font-semibold text-honda-black mb-2">
                        Bảo hành chính hãng Honda
                      </h4>
                      <p className="text-honda-gray mb-4">
                        Sản phẩm được bảo hành chính hãng từ Honda Việt Nam với các điều kiện:
                      </p>
                      <ul className="space-y-2 text-honda-gray">
                        <li>• Bảo hành 3 năm hoặc 30.000km (tùy điều kiện nào đến trước)</li>
                        <li>• Bảo hành miễn phí phụ tùng và công lao động</li>
                        <li>• Bảo hành tại tất cả đại lý Honda trên toàn quốc</li>
                        <li>• Có sách bảo hành và tem bảo hành chính thức</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
