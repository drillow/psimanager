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
  Users,
  LayoutDashboard,
  Headphones,
  DollarSign,
  ChartColumnBig,
  SettingsIcon,
} from 'lucide-react'
import { useEffect } from 'react'
import { Badge } from '../ui/badge'
import { Settings } from '@/components/Settings'
import { PlanWidget } from '../PlanWidget'
import { cx } from 'class-variance-authority'
import DrillowIcon from '@/assets/drillow-icon.svg'
import { useSubscriptionStatus } from '@/context/subscriptionStatus'

const applicationItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Consultas',
    url: '/weekly-consults',
    icon: CalendarDays,
  },
  {
    title: 'Pacientes',
    url: '/patients',
    icon: Users,
  },
  {
    title: 'Métricas',
    url: '/metrics',
    icon: ChartColumnBig,
    disabled: true,
    asSoon: true,
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
]

const footerItems = [
  {
    title: 'Ajuda e Suporte',
    url: 'help-support',
    icon: Headphones,
  },
]

export function AppSidebar() {
  const { open, setOpen } = useSidebar()
  const { status } = useSubscriptionStatus()

  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/weekly-consults') {
      setOpen(true)
    }
  }, [location])

  return (
    <Sidebar className="bg-white" collapsible="icon">
      <SidebarHeader className="flex flex-row w-full items-center">
        <div className={`w-8 h-8 flex items-center justify-center`}>
          <img
            src={DrillowIcon}
            alt="Drillow"
            className={`${open ? 'w-6 h-6' : 'w-5 h-5'} text-violet-600`}
          />
        </div>
        {open && <h1 className="font-extrabold text-2xl text-violet-600">Drillow</h1>}
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
                    {/* <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link> */}
                    {item.disabled ? (
                      <div className="cursor-pointer text-zinc-500 hover:text-zinc-500">
                        <item.icon />
                        <span className="flex items-center gap-2">
                          {item.title}
                          {item.asSoon && <Badge variant={'secondary'}>Em breve</Badge>}
                        </span>
                      </div>
                    ) : (
                      <Link
                        to={item.url}
                        className={cx(
                          'transition-colors ease-in-out hover:bg-violet-50 hover:text-violet-600',
                          location.pathname === item.url && 'text-violet-600',
                        )}
                      >
                        <item.icon />
                        <span className={cx(`flex items-center gap-2`)}>
                          {item.title}
                          {item.asSoon && <Badge variant={'secondary'}>Em breve</Badge>}
                        </span>
                      </Link>
                    )}
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
                      <div className="cursor-pointer text-zinc-500 hover:text-zinc-500">
                        <item.icon />
                        <span className="flex items-center gap-2">
                          {item.title}
                          {item.asSoon && <Badge variant={'secondary'}>Em breve</Badge>}
                        </span>
                      </div>
                    ) : (
                      <Link to={item.url}>
                        <item.icon />
                        <span className="flex items-center gap-2">
                          {item.title}
                          {item.asSoon && <Badge variant={'secondary'}>Em breve</Badge>}
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
        {open && status !== 'ACTIVE' && <PlanWidget />}
        <Settings>
          <SidebarMenuButton className="hover:text-violet-600 transition-colors ease-in-out">
            <SettingsIcon />
            <span>Configurações</span>
          </SidebarMenuButton>
        </Settings>
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
