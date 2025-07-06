import { Link } from "wouter";
import { Bike, Facebook, Youtube } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-honda-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-honda-red rounded-lg flex items-center justify-center">
                <Bike className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{COMPANY_INFO.name}</h3>
                <p className="text-gray-400 text-sm">Đại lý chính hãng</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Đại lý xe máy Honda uy tín với hơn 15 năm kinh nghiệm phục vụ khách hàng.
            </p>
            <div className="flex space-x-4">
              <a
                href={COMPANY_INFO.social.facebook}
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={COMPANY_INFO.social.youtube}
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Sản phẩm
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/promotion">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Khuyến mãi
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Dịch vụ
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/test-drive">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Đăng ký lái thử
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Giới thiệu
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Sản phẩm nổi bật</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Honda SH 350i
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Honda Vision 2024
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Honda Winner X
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Honda Wave RSX
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Thông tin liên hệ</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <span className="text-honda-red mt-1">📍</span>
                <p className="text-gray-400">{COMPANY_INFO.address}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-honda-red">📞</span>
                <p className="text-gray-400">
                  {COMPANY_INFO.phone} | {COMPANY_INFO.mobile}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-honda-red">✉️</span>
                <p className="text-gray-400">{COMPANY_INFO.email}</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-honda-red mt-1">🕒</span>
                <div className="text-gray-400">
                  <p>{COMPANY_INFO.workingHours.weekdays}</p>
                  <p>{COMPANY_INFO.workingHours.weekend}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 {COMPANY_INFO.name}. Bản quyền thuộc về {COMPANY_INFO.name}.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Thiết kế bởi Phòng CNTT
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
