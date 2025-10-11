import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Navbar from "@/components/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex flex-1">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}