import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bolt, Shield, Wrench, Clock, Phone } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import type { Service } from "@shared/schema";

export default function ServicesPage() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const formatPrice = (price: string) => {
    if (price === "0") return "Miễn phí";
    return new Intl.NumberFormat("vi-VN").format(parseInt(price)) + "đ";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "maintenance":
        return <Bolt className="h-8 w-8" />;
      case "repair":
        return <Wrench className="h-8 w-8" />;
      case "warranty":
        return <Shield className="h-8 w-8" />;
      default:
        return <Bolt className="h-8 w-8" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "maintenance":
        return "bg-blue-500";
      case "repair":
        return "bg-orange-500";
      case "warranty":
        return "bg-green-500";
      default:
        return "bg-honda-red";
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = SERVICE_CATEGORIES.find(c => c.key === category);
    return cat ? cat.label : category;
  };

  return (
    <div className="py-20 bg-honda-gray-light min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-honda-black mb-4">
            Dịch vụ sau bán hàng
          </h1>
          <p className="text-xl text-honda-gray max-w-2xl mx-auto">
            Chúng tôi cung cấp đầy đủ các dịch vụ bảo trì, sửa chữa và bảo hành với đội ngũ kỹ thuật viên chuyên nghiệp
          </p>
        </div>

        {/* Service Categories Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {SERVICE_CATEGORIES.map((category) => (
            <Card key={category.key} className="text-center card-hover">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${getCategoryColor(category.key)} rounded-full flex items-center justify-center mx-auto mb-6 text-white`}>
                  {getCategoryIcon(category.key)}
                </div>
                <h3 className="text-xl font-bold text-honda-black mb-4">
                  {category.label}
                </h3>
                <p className="text-honda-gray">
                  {category.key === "maintenance" && "Bảo trì định kỳ theo tiêu chuẩn Honda"}
                  {category.key === "repair" && "Sửa chữa chuyên nghiệp với phụ tùng chính hãng"}
                  {category.key === "warranty" && "Bảo hành chính hãng trên toàn quốc"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services List */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-honda-black text-center mb-12">
            Bảng giá dịch vụ
          </h2>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-12 w-12 rounded-full mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-8 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : services && services.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${getCategoryColor(service.category)} rounded-full flex items-center justify-center text-white`}>
                        {getCategoryIcon(service.category)}
                      </div>
                      <Badge variant="outline">
                        {getCategoryLabel(service.category)}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-bold text-honda-black mb-2">
                      {service.name}
                    </h3>
                    
                    <p className="text-honda-gray text-sm mb-4">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-honda-red">
                        {service.price && formatPrice(service.price)}
                      </div>
                      {service.duration && (
                        <div className="flex items-center text-honda-gray text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          {service.duration}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold text-honda-black mb-4">
                Chưa có thông tin dịch vụ
              </h3>
              <p className="text-honda-gray">
                Thông tin chi tiết về các dịch vụ sẽ được cập nhật sớm.
              </p>
            </div>
          )}
        </div>

        {/* Service Process */}
        <Card className="mb-16">
          <CardContent className="p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-honda-black text-center mb-12">
              Quy trình tiếp nhận xe
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Tiếp nhận", desc: "Kiểm tra tổng thể tình trạng xe" },
                { step: 2, title: "Chẩn đoán", desc: "Sử dụng thiết bị chuyên dụng để chẩn đoán" },
                { step: 3, title: "Sửa chữa", desc: "Thực hiện sửa chữa với phụ tùng chính hãng" },
                { step: 4, title: "Bàn giao", desc: "Kiểm tra và bàn giao xe cho khách hàng" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-honda-black mb-2">{item.title}</h4>
                  <p className="text-honda-gray text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-honda-red to-red-500 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Cần hỗ trợ dịch vụ?
            </h3>
            <p className="text-lg mb-6">
              Liên hệ với chúng tôi để được tư vấn và đặt lịch hẹn dịch vụ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-honda-red hover:bg-gray-100">
                <Phone className="mr-2 h-4 w-4" />
                Gọi ngay: 1900-1234
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-honda-red">
                Đặt lịch online
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
