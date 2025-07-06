import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import HeroSection from "@/components/hero-section";
import ProductCard from "@/components/product-card";
import { Gift, Bolt, Shield, Ambulance, Check, ArrowRight } from "lucide-react";
import type { Motorcycle, Promotion } from "@shared/schema";

export default function Home() {
  const { data: featuredMotorcycles, isLoading: motorcyclesLoading } = useQuery<Motorcycle[]>({
    queryKey: ["/api/motorcycles?featured=true"],
  });

  const { data: promotions, isLoading: promotionsLoading } = useQuery<Promotion[]>({
    queryKey: ["/api/promotions?active=true"],
  });

  return (
    <div>
      <HeroSection />

      {/* Featured Products Section */}
      <section id="products" className="py-20 bg-honda-gray-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-honda-black mb-4">
              Dòng xe nổi bật
            </h2>
            <p className="text-xl text-honda-gray max-w-2xl mx-auto">
              Khám phá các dòng xe máy Honda mới nhất với thiết kế hiện đại và công nghệ tiên tiến
            </p>
          </div>

          {motorcyclesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-8 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredMotorcycles?.map((motorcycle) => (
                <ProductCard key={motorcycle.id} motorcycle={motorcycle} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link href="/products">
              <Button className="btn-honda text-white px-8 py-4 rounded-lg font-semibold text-lg">
                <ArrowRight className="mr-2 h-5 w-5" />
                Xem tất cả sản phẩm
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotion Section */}
      <section id="promotion" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-honda-black mb-4">
              Khuyến mãi hot
            </h2>
            <p className="text-xl text-honda-gray max-w-2xl mx-auto">
              Cơ hội sở hữu xe Honda với mức giá ưu đãi và nhiều quà tặng hấp dẫn
            </p>
          </div>

          {promotionsLoading ? (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Skeleton className="h-96 w-full rounded-2xl" />
              <div className="space-y-6">
                <Skeleton className="h-32 w-full rounded-2xl" />
                <Skeleton className="h-24 w-full rounded-2xl" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 flex-1 rounded-lg" />
                  <Skeleton className="h-12 flex-1 rounded-lg" />
                </div>
              </div>
            </div>
          ) : (
            promotions &&
            promotions.length > 0 && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <img
                    src={promotions[0].imageUrl || "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
                    alt={promotions[0].title}
                    className="rounded-2xl shadow-lg w-full"
                  />
                </div>

                <div className="space-y-6">
                  <Card className="bg-gradient-to-r from-honda-red to-red-500 text-white">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-4">
                        <Gift className="inline mr-2" />
                        {promotions[0].title}
                      </h3>
                      <p className="text-lg mb-4">{promotions[0].description}</p>
                      {promotions[0].conditions && (
                        <ul className="space-y-3 text-lg">
                          {promotions[0].conditions.map((condition, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="mr-3 text-yellow-400 h-5 w-5" />
                              {condition}
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-honda-gray-light">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-honda-black mb-4">
                        Thời gian áp dụng
                      </h4>
                      <p className="text-honda-gray text-lg mb-4">
                        📅 Từ {promotions[0].startDate} đến {promotions[0].endDate}
                      </p>
                      <p className="text-honda-gray">
                        ℹ️ Áp dụng cho khách hàng mua xe trong thời gian khuyến mãi
                      </p>
                    </CardContent>
                  </Card>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/promotion">
                      <Button className="btn-honda text-white px-6 py-3">
                        Xem chi tiết khuyến mãi
                      </Button>
                    </Link>
                    <Link href="/test-drive">
                      <Button variant="outline" className="border-honda-red text-honda-red hover:bg-honda-red hover:text-white px-6 py-3">
                        Đăng ký ngay
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-honda-gray-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-honda-black mb-4">
              Dịch vụ sau bán hàng
            </h2>
            <p className="text-xl text-honda-gray max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến dịch vụ chăm sóc khách hàng tốt nhất với đội ngũ kỹ thuật viên chuyên nghiệp
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white shadow-lg text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bolt className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-honda-black mb-4">
                  Bảo trì định kỳ
                </h3>
                <p className="text-honda-gray mb-6">
                  Dịch vụ bảo trì định kỳ theo đúng khuyến nghị của Honda để xe luôn hoạt động tốt nhất
                </p>
                <div className="text-honda-red font-semibold text-lg">Từ 150.000đ</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-honda-black mb-4">
                  Bảo hành chính hãng
                </h3>
                <p className="text-honda-gray mb-6">
                  Bảo hành chính hãng Honda với phụ tung và linh kiện 100% chính hãng
                </p>
                <div className="text-honda-red font-semibold text-lg">3 năm bảo hành</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Ambulance className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-honda-black mb-4">
                  Cứu hộ 24/7
                </h3>
                <p className="text-honda-gray mb-6">
                  Dịch vụ cứu hộ xe máy 24/7 trong phạm vi thành phố với thời gian phản hồi nhanh
                </p>
                <div className="text-honda-red font-semibold text-lg">
                  Miễn phí trong năm đầu
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button className="btn-honda text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Xem tất cả dịch vụ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
