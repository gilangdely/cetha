"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"
import { auth } from "@/app/lib/firebase";
import { logoutUser } from "@/app/lib/auth";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  User,
  LayoutDashboard,
  Settings,
  Info,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronsUpDown,
  Settings2,
  FileSearch,
  Linkedin,
  Newspaper,
} from "lucide-react";

import logo from "@/assets/icons/cetha-logo.svg"
import cardImg from "@/assets/img/article2.jpg";

import { Avatar } from "@/components/ui/avatar";
import UserAvatar from "@/components/user-avatar";
import LogoutAlert from "@/components/logout-alert";

const mainMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Perbaiki CV",
    icon: FileSearch,
    href: "/dashboard/review-cv",
  },
  {
    title: "Tingkatkan LinkedIn",
    icon: Linkedin,
    href: "/dashboard/tingkatkan-linkedIn",
  },
  {
    title: "Artikel & Video",
    icon: Newspaper,
    href: "/dashboard/article-and-video",
  },
];

const lainnyaMenu = [
  { title: "Pengaturan", icon: Settings, href: "/settings" },
  { title: "Bantuan", icon: HelpCircle, href: "/help" },
  { title: "Tentang Aplikasi", icon: Info, href: "/about" },
];

export function AppSidebar() {
  const router = useRouter();
  const [username, setUsername] = useState("Cetha");
  const [email, setEmail] = useState("m@example.com");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(
          user.displayName || user.email?.split("@")[0] || "Pengguna",
        );
        setEmail(user.email || "m@example.com");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  return (
    <>
      <Sidebar className="border-r bg-white/90 backdrop-blur">
        <SidebarHeader className="flex items-center justify-start pt-4">
          <Link href={"/"} className="text-TextPrimary flex items-center gap-2 text-lg font-semibold h-12">
            <Image alt="logo cetha" src={logo} height={60} />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className="hover:bg-accent/50 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150"
                      >
                        <item.icon className="text-muted-foreground h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <div className="p-2.5">
                  <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-xs">
                    <div className="relative h-20 w-full bg-gradient-to-br from-blue-50 to-blue-100">
                      <Image
                        src={cardImg}
                        alt="CV Review"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="mb-3 text-xs font-semibold text-gray-800">
                        Coba nilai CV-mu berdasarkan pekerjaan impian mu
                      </h3>
                      <button className="w-full rounded-lg bg-primaryBlue px-2 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                        Coba sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Lainnya</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton className="hover:bg-accent/50 flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Settings2 className="text-muted-foreground h-4 w-4" />
                          <span>Pengaturan</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[--radix-popper-anchor-width]">
                      {lainnyaMenu.map((item) => (
                        <DropdownMenuItem key={item.title} asChild>
                          <Link
                            href={item.href}
                            className="flex items-center gap-2 text-sm"
                          >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:bg-accent/50 flex w-full items-center justify-between rounded-md px-2 py-2 text-sm transition-all duration-150 focus:outline-none">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <UserAvatar />
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{username}</span>
                    <span className="text-muted-foreground text-xs">
                      {email}
                    </span>
                  </div>
                </div>
                <ChevronsUpDown size={16} className="text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{username}</p>
                  <p className="text-muted-foreground text-xs">{email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Akun</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenDialog(true)}>
                <LogOut className="mr-2 h-4 w-4 text-red-500" />
                <span className="text-red-500">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      {/* === Dialog Konfirmasi Logout === */}
      <LogoutAlert
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleLogout={handleLogout}
      />
    </>
  );
}
