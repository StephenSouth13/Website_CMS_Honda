import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertTestDriveRequestSchema } from "@shared/schema";
import { Check, Send, Calendar, Phone, User, MessageSquare } from "lucide-react";
import type { Motorcycle, InsertTestDriveRequest } from "@shared/schema";

export default function TestDrivePage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: motorcycles, isLoading: motorcyclesLoading } = useQuery<Motorcycle[]>({
    queryKey: ["/api/motorcycles"],
  });

  const form = useForm<InsertTestDriveRequest>({
    resolver: zodResolver(insertTestDriveRequestSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      motorcycleId: undefined,
      preferredDate: "",
      notes: "",
    },
  });

  const testDriveMutation = useMutation({
    mutationFn: async (data: InsertTestDriveRequest) => {
      const response = await apiRequest("POST", "/api/test-drive", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/test-drive"] });
      toast({
        title: "Đăng ký thành công!",
        description: "Chúng tôi sẽ liên hệ với bạn trong vòng 24h để xác nhận lịch hẹn.",
      });
      setIsSubmitted(true);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau hoặc liên hệ hotline để được hỗ trợ.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertTestDriveRequest) => {
    testDriveMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="py-20 bg-honda-gray-light min-h-screen">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-honda-black mb-4">
                Đăng ký lái thử thành công!
              </h2>
              <p className="text-honda-gray mb-8">
                Cảm ơn bạn đã đăng ký lái thử xe Honda tại đại lý Mỹ Huyền. 
                Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận lịch hẹn.
              </p>
              <div className="space-y-4 text-left bg-honda-gray-light p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-honda-black">Thông tin liên hệ:</h3>
                <p className="text-honda-gray">📞 Hotline: 1900-1234</p>
                <p className="text-honda-gray">📱 Mobile: 0901-234-567</p>
                <p className="text-honda-gray">🕒 Giờ làm việc: Thứ 2-7 (8:00-18:00)</p>
              </div>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="btn-honda text-white"
              >
                Đăng ký lái thử xe khác
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-honda-gray-light min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-honda-black mb-6">
              Đăng ký lái thử
            </h1>
            <p className="text-xl text-honda-gray mb-8">
              Trải nghiệm cảm giác lái xe Honda trước khi quyết định mua. 
              Chúng tôi sẵn sàng cho bạn test ride miễn phí.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-honda-red rounded-full flex items-center justify-center">
                  <Check className="text-white h-4 w-4" />
                </div>
                <span className="text-honda-gray">Lái thử miễn phí tất cả các dòng xe</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-honda-red rounded-full flex items-center justify-center">
                  <Check className="text-white h-4 w-4" />
                </div>
                <span className="text-honda-gray">Có nhân viên tư vấn đi cùng</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-honda-red rounded-full flex items-center justify-center">
                  <Check className="text-white h-4 w-4" />
                </div>
                <span className="text-honda-gray">Thời gian linh hoạt theo yêu cầu</span>
              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
              alt="Showroom Honda Mỹ Huyền"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>

          {/* Right Form */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-honda-black mb-8 text-center">
                Đặt lịch lái thử ngay
              </h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Họ và tên *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập họ và tên của bạn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>Số điện thoại *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="motorcycleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dòng xe muốn lái thử *</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          value={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn dòng xe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {motorcyclesLoading ? (
                              <div className="p-2">
                                <Skeleton className="h-8 w-full" />
                              </div>
                            ) : (
                              motorcycles?.map((motorcycle) => (
                                <SelectItem
                                  key={motorcycle.id}
                                  value={motorcycle.id.toString()}
                                >
                                  {motorcycle.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Ngày hẹn *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>Ghi chú</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Ghi chú thêm về yêu cầu của bạn..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={testDriveMutation.isPending}
                    className="w-full btn-honda text-white py-4 font-semibold text-lg"
                  >
                    {testDriveMutation.isPending ? (
                      "Đang gửi..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Gửi đăng ký lái thử
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <p className="text-sm text-honda-gray text-center mt-4">
                Chúng tôi sẽ liên hệ với bạn trong vòng 24h để xác nhận lịch hẹn
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
