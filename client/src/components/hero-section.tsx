import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bike, Calendar } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 hero-gradient"></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Honda <span className="text-yellow-400">Mỹ Huyền</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-200">
              Đại lý xe máy Honda chính hãng với đầy đủ các dòng xe từ tay ga đến số sàn
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button className="btn-honda text-white px-8 py-4 rounded-lg font-semibold text-lg">
                  <Bike className="mr-2 h-5 w-5" />
                  Xem sản phẩm
                </Button>
              </Link>
              <Link href="/test-drive">
                <Button
                  variant="outline"
                  className="bg-white text-honda-red px-8 py-4 rounded-lg font-semibold text-lg border-white hover:bg-gray-100"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Đăng ký lái thử
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Stats */}
          <Card className="bg-white bg-opacity-10 backdrop-blur-md border-white border-opacity-20">
            <CardContent className="p-8">
              <h3 className="text-white text-xl font-semibold mb-6">
                Tại sao chọn Honda Mỹ Huyền?
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">15+</div>
                  <p className="text-white text-sm">Năm kinh nghiệm</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">50K+</div>
                  <p className="text-white text-sm">Khách hàng tin tưởng</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                  <p className="text-white text-sm">Hỗ trợ khách hàng</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
                  <p className="text-white text-sm">Xe chính hãng</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
