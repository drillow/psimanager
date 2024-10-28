import { Link } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { CalendarDays, Settings, Users, LayoutDashboard, Headphones, Hexagon, DollarSign, Crown } from 'lucide-react'

const applicationItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Consultas",
    url: "weekly-consults",
    icon: CalendarDays,
  },
  {
    title: "Pacientes",
    url: "patients",
    icon: Users,
  },
]

const financeItems = [
  {
    title: "Faturamento",
    url: "billing",
    icon: DollarSign,
  },
  {
    title: "Plano",
    url: "plan",
    icon: Crown,
  },
]

const footerItems = [
  {
    title: "Configurações",
    url: "settings",
    icon: Settings,
  },
  {
    title: "Ajuda e Suporte",
    url: "help-support",
    icon: Headphones,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="bg-white">
      <SidebarHeader className="flex flex-row">
        <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
          <Hexagon className="text-zinc-50"/>
        </div>
        <h1 className="font-bold text-2xl text-purple-500">Teste</h1>
      </SidebarHeader>
      {/* <Separator /> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Aplicativo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {applicationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Financeiro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {financeItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {footerItems.map(item => (
          <SidebarMenuButton asChild key={item.title}>
            <Link to={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        ))}
      </SidebarFooter>
    </Sidebar>
  )
}