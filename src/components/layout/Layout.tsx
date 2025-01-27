import { Outlet } from "react-router-dom";
import { AppSidebar } from "../AppSidebar/App-sidebar";
import { SidebarProvider } from "../ui/sidebar";
import useScreenSize from "@/utils/hooks/useScreenSize";
import { Button } from "../ui/button";
import { Toaster } from "../ui/toaster";

export default function Layout() {
  const { width } = useScreenSize()

  if (width <= 1024) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-violet-600 pb-4">
        <div className="flex flex-col items-center text-center gap-4">
          <strong className="text-4xl text-zinc-50">Opss...</strong>
          <p className="text-lg text-zinc-100">Estamos trabalhando para que você possa utilizar <br /> a plataforma em diversos aparelhos.</p>
          <Button variant={"secondary"} asChild>
            <a href="https://www.google.com.br">
              Voltar para site
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <Toaster />
      <AppSidebar />
      <main className="w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}