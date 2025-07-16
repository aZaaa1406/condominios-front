"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import {
  User,
  BadgeAlert,
  Banknote,
} from "lucide-react"

import { NavMain } from "@/components/admin-components/nav-main"
import { NavUser } from "@/components/admin-components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar" 
import axios from "axios"
import { URL_API } from "@/config"

const data = {
  navMain: [
    {
      title: "Usuarios",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Lista de usuarios",
          url: "/admin/usuarios/lista-usuarios",
        },
        {
          title: "Registro de usuarios",
          url: "/admin/usuarios/registro-usuarios",
        },
        {
          title: "Documentacion",
          url: "/admin/usuarios/documentacion",
        },
        {
          title: "Subir documentos",
          url: "/admin/usuarios/cargar-documento",
        }
      ],
    },
    {
      title: "Financiero",
      url: "#",
      icon: Banknote,
      items: [
        {
          title: "Cuotas mantenimiento",
          url: "/admin/financiero/cuotas",
        },
        {
          title: "Reportes financieros",
          url: "/admin/financiero/reportes",
        },
        // {
        //   title: "Recibos",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Incidencias",
      url: "#",
      icon: BadgeAlert,
      items: [
        // {
        //   title: "Historial incidencias",
        //   url: "/admin/incidencias/historial",
        // },
        {
          title: "Incidencias activas",
          url: "/admin/incidencias/activas",
        },
        {
          title: "Asignar incidencias",
          url: "/admin/incidencias/asignar",
        },
      ],
    },
    // {
    //   title: "Reservaciones",
    //   url: "#",
    //   icon: NotebookText,
    //   items: [
    //     {
    //       title: "Historial reservaciones",
    //       url: "#",
    //     },
    //     {
    //       title: "Calendario reservaciones",
    //       url: "#"
    //     }
    //   ]
    // }
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [nameUser, setNameUser] = useState("")
  const [mailUser, setMailUser] = useState("")
  useEffect(()=> {
    async function userData(){
      try{
        const response = await axios.get(`${URL_API}/api/user/getInfoUser`, {
          withCredentials: true,
        })
        console.log(response.data);
        if(response.status === 200) {
          const nombre = response.data.user.nombre;
          const appat = response.data.user.appat;
          const apmat = response.data.user.apmat;
          const fullName = `${nombre} ${appat} ${apmat}`;
          console.log(fullName);
          setNameUser(fullName);
          setMailUser(response.data.user.correo);
        }
      }catch(error) {
        console.error("Error fetching user data:", error)
      }
    }
    userData()
  }, [])
  const dataUser = {
    name: nameUser,
    email: mailUser,
    avatar: nameUser.charAt(0),
  }
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div >
                  <Image 
                    src={"https://res.cloudinary.com/dt9vn9bnb/image/upload/v1751772003/urbaniteLogoPNG_aw2s4z.png"}
                    alt="Urbanite Logo"
                    width={80}
                    height={60}

                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Urbanite</span>
                  <span className="truncate text-xs">Admin</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={dataUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
