import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Gift, Calendar, Check } from "lucide-react";
import type { Promotion } from "@shared/schema";

export default function PromotionPage() {
  const { data: promotions, isLoading } = useQuery<Promotion[]>({
    queryKey: ["/api/promotions"],
  });

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("vi-VN").format(parseInt(price)) + "đ";
  };

  return (
    <div className="py-20 bg-honda-gray-light min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-honda-black mb-4">
            Khuyến mãi
          </h1>
          <p className="text-xl text-honda-gray max-w-2xl mx-auto">
            Các chương trình khuyến mãi hấp dẫn dành cho khách hàng mua xe Honda
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-8 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-2/3" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : promotions && promotions.length > 0 ? (
          <div className="space-y-8">
            {promotions.map((promotion) => (
              <Card key={promotion.id} className="overflow-hidden shadow-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <img
                      src={promotion.imageUrl || "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
                      alt={promotion.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                    {promotion.isActive && (
                      <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                        Đang diễn ra
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-2xl font-bold text-honda-black">
                        {promotion.title}
                      </h2>
                      <Gift className="h-6 w-6 text-honda-red" />
                    </div>
                    
                    <p className="text-honda-gray text-lg mb-6">
                      {promotion.description}
                    </p>

                    {/* Promotion Value */}
                    <div className="mb-6">
                      {promotion.discountAmount && (
                        <div className="text-2xl font-bold text-honda-red mb-2">
                          Giảm giá: {formatPrice(promotion.discountAmount)}
                        </div>
                      )}
                      {promotion.discountPercentage && (
                        <div className="text-2xl font-bold text-honda-red mb-2">
                          Giảm: {promotion.discountPercentage}%
                        </div>
                      )}
                    </div>

                    {/* Conditions */}
                    {promotion.conditions && promotion.conditions.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-honda-black mb-3">
                          Điều kiện áp dụng:
                        </h4>
                        <ul className="space-y-2">
                          {promotion.conditions.map((condition, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-honda-gray">{condition}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Date Range */}
                    <div className="flex items-center space-x-2 text-honda-gray">
                      <Calendar className="h-5 w-5" />
                      <span>
                        Từ {promotion.startDate} đến {promotion.endDate}
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold text-honda-black mb-4">
              Chưa có chương trình khuyến mãi nào
            </h3>
            <p className="text-honda-gray">
              Hiện tại chưa có chương trình khuyến mãi nào đang diễn ra. Vui lòng quay lại sau để không bỏ lỡ các ưu đãi hấp dẫn.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
