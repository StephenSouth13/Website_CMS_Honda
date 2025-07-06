import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactRequestSchema } from "@shared/schema";
import { CONTACT_SUBJECTS, COMPANY_INFO } from "@/lib/constants";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Send, 
  User, 
  MessageSquare,
  Check
} from "lucide-react";
import type { InsertContactRequest } from "@shared/schema";

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertContactRequest>({
    resolver: zodResolver(insertContactRequestSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactRequest) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Gửi tin nhắn thành công!",
        description: "Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.",
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

  const onSubmit = (data: InsertContactRequest) => {
    contactMutation.mutate(data);
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
                Tin nhắn đã được gửi thành công!
              </h2>
              <p className="text-honda-gray mb-8">
                Cảm ơn bạn đã liên hệ với Honda Mỹ Huyền. 
                Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="btn-honda text-white"
              >
                Gửi tin nhắn khác
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-honda-black mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-xl text-honda-gray max-w-2xl mx-auto">
            Đến trực tiếp showroom hoặc liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-honda-gray-light text-center card-hover">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-honda-black mb-4">
                Địa chỉ showroom
              </h3>
              <p className="text-honda-gray">{COMPANY_INFO.address}</p>
            </CardContent>
          </Card>

          <Card className="bg-honda-gray-light text-center card-hover">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-honda-black mb-4">
                Hotline
              </h3>
              <p className="text-honda-gray font-semibold text-lg">
                {COMPANY_INFO.phone}
              </p>
              <p className="text-honda-gray">{COMPANY_INFO.mobile}</p>
            </CardContent>
          </Card>

          <Card className="bg-honda-gray-light text-center card-hover">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-honda-black mb-4">
                Giờ làm việc
              </h3>
              <p className="text-honda-gray">{COMPANY_INFO.workingHours.weekdays}</p>
              <p className="text-honda-gray">{COMPANY_INFO.workingHours.weekend}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-honda-gray-light shadow-lg">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-honda-black mb-8">
                Gửi tin nhắn cho chúng tôi
              </h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
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
                              placeholder="Nhập họ và tên"
                              className="bg-white"
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
                              className="bg-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Nhập địa chỉ email"
                            className="bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chủ đề</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Chọn chủ đề" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CONTACT_SUBJECTS.map((subject) => (
                              <SelectItem key={subject.key} value={subject.key}>
                                {subject.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>Nội dung *</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Nhập nội dung tin nhắn..."
                            className="bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full btn-honda text-white py-4 font-semibold text-lg"
                  >
                    {contactMutation.isPending ? (
                      "Đang gửi..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Gửi tin nhắn
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Map Placeholder */}
          <Card className="bg-honda-gray-light overflow-hidden">
            <div className="h-full min-h-[500px] relative">
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-honda-gray mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-honda-black mb-2">
                    Vị trí showroom
                  </h4>
                  <p className="text-honda-gray mb-4">
                    Google Maps sẽ được tích hợp tại đây
                  </p>
                  <p className="text-sm text-honda-gray">
                    {COMPANY_INFO.address}
                  </p>
                  <Button
                    className="mt-4 btn-honda text-white"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.address)}`, "_blank")}
                  >
                    Xem trên Google Maps
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
