import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Bike, User, LogOut, Settings } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { useAuth } from "@/hooks/use-auth";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const navigation = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Sản phẩm" },
    { href: "/promotion", label: "Khuyến mãi" },
    { href: "/services", label: "Dịch vụ" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/contact", label: "Liên hệ" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === href;
    return location.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 navbar-scroll border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-12 h-12 bg-honda-red rounded-lg flex items-center justify-center">
                <Bike className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-honda-black">{COMPANY_INFO.name}</h1>
                <p className="text-sm text-honda-gray">Đại lý chính hãng</p>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`font-medium transition-colors cursor-pointer ${
                    isActive(item.href)
                      ? "text-honda-red"
                      : "text-honda-gray hover:text-honda-red"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="ghost" className="text-honda-gray hover:text-honda-red">
                      <Settings className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-honda-gray hover:text-honda-red">
                      <User className="h-4 w-4 mr-2" />
                      {user?.fullName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <span className="text-honda-gray hover:text-honda-red transition-colors cursor-pointer">
                    Đăng nhập
                  </span>
                </Link>
                <Link href="/register">
                  <Button className="btn-honda text-white">Đăng ký</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-8">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span
                      className={`text-lg font-medium cursor-pointer ${
                        isActive(item.href) ? "text-honda-red" : "text-honda-gray"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
                <div className="flex flex-col space-y-4 pt-6 border-t">
                  {isAuthenticated ? (
                    <>
                      {isAdmin && (
                        <Link href="/admin">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-honda-gray"
                            onClick={() => setIsOpen(false)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Admin Dashboard
                          </Button>
                        </Link>
                      )}
                      <div className="text-sm text-honda-gray">
                        Xin chào, {user?.fullName}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Đăng xuất
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <span
                          className="text-honda-gray cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        >
                          Đăng nhập
                        </span>
                      </Link>
                      <Link href="/register">
                        <Button
                          className="btn-honda text-white w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          Đăng ký
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
