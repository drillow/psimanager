import { Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar'
import {
  CalendarDays,
  Settings,
  Users,
  LayoutDashboard,
  Headphones,
  Hexagon,
  DollarSign,
  Crown,
  ChartColumnBig,
} from 'lucide-react'
import { useEffect } from 'react'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'

const applicationItems = [
  {
    title: 'Dashboard',
    url: '',
    icon: LayoutDashboard,
  },
  {
    title: 'Consultas',
    url: 'weekly-consults',
    icon: CalendarDays,
  },
  {
    title: 'Pacientes',
    url: 'patients',
    icon: Users,
  },
  {
    title: 'Métricas',
    url: 'metrics',
    icon: ChartColumnBig,
  },
]

const financeItems = [
  {
    title: 'Faturamento',
    url: 'billing',
    icon: DollarSign,
    disabled: true,
    asSoon: true,
  },
  {
    title: 'Plano',
    url: 'plan',
    icon: Crown,
    disabled: false,
    asSoon: false,
  },
]

const footerItems = [
  {
    title: 'Configurações',
    url: 'settings',
    icon: Settings,
  },
  {
    title: 'Ajuda e Suporte',
    url: 'help-support',
    icon: Headphones,
  },
]

export function AppSidebar() {
  const { open, setOpen } = useSidebar()

  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/weekly-consults') {
      setOpen(true)
    }
  }, [location])

  return (
    <Sidebar className="bg-white" collapsible="icon">
      <SidebarHeader className="flex flex-row w-full items-center">
        <div
          className={`${open ? 'w-8 h-8' : 'w-7 h-7'} bg-violet-600 rounded-md flex items-center justify-center`}
        >
          <Hexagon className={`${open ? 'w-5 h-5' : 'w-4 h-4'} text-zinc-50`} />
        </div>
        {open && <h1 className="font-bold text-2xl text-violet-600">Idfk</h1>}
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
              {financeItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild disabled>
                    {item.disabled ? (
                      <div className="cursor-pointer text-zinc-500">
                        <item.icon />
                        <span className="flex items-center gap-2">
                          {item.title}
                          {item.asSoon && (
                            <Badge variant={'secondary'}>Em breve</Badge>
                          )}
                        </span>
                      </div>
                    ) : (
                      <Link to={item.url}>
                        <item.icon />
                        <span className="flex items-center gap-2">
                          {item.title}
                          {item.asSoon && (
                            <Badge variant={'secondary'}>Em breve</Badge>
                          )}
                        </span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {open && (
          <div className="flex flex-col border border-zinc-200 p-2 rounded-md mb-4">
            <div className="flex flex-col gap-2 mb-4">
              <h2 className="text-lg font-semibold text-zinc-700 flex items-center gap-2">
                <Crown />
                Plano Gratuito
              </h2>
              <span className="text-xs text-zinc-400">
                Seu plano <strong>gratuíto</strong> permite adicionar até{' '}
                <strong>5</strong> pacientes.
              </span>
            </div>
            <Progress value={20} />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-zinc-400">1</span>
              <span className="text-xs text-zinc-400">5</span>
            </div>
          </div>
        )}
        {footerItems.map((item) => (
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
