import { Outlet } from "react-router-dom";
import { AppSidebar } from "../AppSidebar/App-sidebar";
import { SidebarProvider } from "../ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}