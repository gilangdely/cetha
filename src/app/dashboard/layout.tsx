import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-Background p-2">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <main className="flex flex-1 rounded-2xl bg-white p-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
