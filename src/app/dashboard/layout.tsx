"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Menu } from "lucide-react";
import CethaBot from "@/components/cetha-bot";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex flex-1 min-h-screen bg-Background lg:p-3">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col">

          {/* Header */}
          <header className="flex lg:hidden items-center gap-2 border-b bg-white  py-3 shadow-sm">
            <SidebarTrigger className="lg:hidden">
              <Menu className="h-5 w-5 text-gray-700" />
            </SidebarTrigger>
          </header>
          <main className="flex flex-1 flex-col bg-white lg:p-4 lg:rounded-2xl">
            {children}
            <CethaBot />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
