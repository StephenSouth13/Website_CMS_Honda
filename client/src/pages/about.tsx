import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { COMPANY_INFO } from "@/lib/constants";
import { 
  Users, 
  Award, 
  Heart, 
  Star,
  Calendar,
  Phone
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { number: "50,000+", label: "Khách hàng tin tưởng", icon: Users },
    { number: "15+", label: "Năm kinh nghiệm", icon: Calendar },
    { number: "100%", label: "Xe chính hãng", icon: Award },
    { number: "24/7", label: "Hỗ trợ khách hàng", icon: Heart },
  ];

  const team = [
    {
      name: "Nguyễn Văn An",
      position: "Giám đốc kinh doanh",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      experience: "15 năm kinh nghiệm",
    },
    {
      name: "Trần Thị Bình",
      position: "Trưởng phòng dịch vụ",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      experience: "12 năm kinh nghiệm",
    },
    {
      name: "Lê Minh Cường",
      position: "Trưởng bộ phận kỹ thuật",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      experience: "10 năm kinh nghiệm",
    },
  ];

  const milestones = [
    { year: "2010", event: "Thành lập đại lý Honda Mỹ Huyền" },
    { year: "2015", event: "Mở rộng showroom và khu vực trưng bày" },
    { year: "2018", event: "Đạt danh hiệu đại lý xuất sắc Honda Việt Nam" },
    { year: "2020", event: "Ra mắt trung tâm dịch vụ hiện đại" },
    { year: "2023", event: "Kỷ niệm 50,000 khách hàng tin tưởng" },
    { year: "2025", event: "Tiếp tục cam kết phục vụ khách hàng tốt nhất" },
  ];

  return (
    <div className="py-20 bg-honda-gray-light min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-honda-black mb-4">
            Honda Mỹ Huyền
          </h1>
          <p className="text-xl text-honda-gray max-w-2xl mx-auto">
            Đại lý xe máy Honda uy tín với hơn 15 năm kinh nghiệm phục vụ khách hàng tại Việt Nam
          </p>
        </div>

        {/* Company Introduction */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-honda-black mb-6">
              Về chúng tôi
            </h2>
            <p className="text-honda-gray text-lg mb-6">
              Honda Mỹ Huyền được thành lập từ năm 2010 với mục tiêu mang đến cho khách hàng 
              những sản phẩm xe máy Honda chính hãng chất lượng cao cùng dịch vụ chăm sóc 
              khách hàng tận tâm.
            </p>
            <p className="text-honda-gray text-lg mb-8">
              Với đội ngũ nhân viên giàu kinh nghiệm và showroom hiện đại, chúng tôi tự hào 
              là một trong những đại lý Honda uy tín nhất khu vực. Chúng tôi cam kết mang đến 
              trải nghiệm mua sắm tuyệt vời và dịch vụ hậu mãi chuyên nghiệp.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-honda-red mb-2">50,000+</div>
                <p className="text-honda-gray">Khách hàng tin tưởng</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-honda-red mb-2">15+</div>
                <p className="text-honda-gray">Năm kinh nghiệm</p>
              </div>
            </div>

            <Link href="/contact">
              <Button className="btn-honda text-white">
                <Phone className="mr-2 h-4 w-4" />
                Liên hệ với chúng tôi
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
              alt="Showroom Honda Mỹ Huyền"
              className="rounded-2xl shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
              alt="Trung tâm bảo hành"
              className="rounded-2xl shadow-lg mt-8"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-honda-red mb-2">
                  {stat.number}
                </div>
                <p className="text-honda-gray">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-honda-black mb-4">
                Sứ mệnh
              </h3>
              <p className="text-honda-gray text-lg">
                Mang đến cho khách hàng những sản phẩm xe máy Honda chất lượng cao nhất, 
                cùng với dịch vụ chăm sóc khách hàng tận tâm và chuyên nghiệp. Chúng tôi 
                cam kết tạo ra giá trị bền vững cho cộng đồng và xã hội.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-honda-black mb-4">
                Tầm nhìn
              </h3>
              <p className="text-honda-gray text-lg">
                Trở thành đại lý Honda hàng đầu khu vực với hệ thống dịch vụ hoàn hảo, 
                được khách hàng tin tưởng và lựa chọn. Chúng tôi hướng tới việc không ngừng 
                cải tiến và nâng cao chất lượng dịch vụ.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Timeline */}
        <Card className="bg-white mb-16">
          <CardContent className="p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-honda-black text-center mb-12">
              Lịch sử phát triển
            </h3>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-honda-red rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <p className="text-honda-gray text-lg">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="bg-white">
          <CardContent className="p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-honda-black text-center mb-12">
              Đội ngũ nhân viên
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="font-semibold text-honda-black mb-2">
                    {member.name}
                  </h4>
                  <p className="text-honda-red font-medium mb-1">
                    {member.position}
                  </p>
                  <p className="text-honda-gray text-sm">
                    {member.experience}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-honda-red to-red-500 text-white">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">
                Sẵn sàng trải nghiệm Honda?
              </h3>
              <p className="text-xl mb-8">
                Hãy đến showroom Honda Mỹ Huyền để khám phá các dòng xe mới nhất
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button className="bg-white text-honda-red hover:bg-gray-100">
                    Xem sản phẩm
                  </Button>
                </Link>
                <Link href="/test-drive">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-honda-red">
                    Đăng ký lái thử
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
