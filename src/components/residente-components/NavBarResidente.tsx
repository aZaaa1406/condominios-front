"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { CreditCard, FileText, BarChart3, Calendar, Home, Menu, X, UserPen, Users, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import axios from "axios"
import { URL_API } from "@/config"

function NavBarResidente() {
  const [isOpen, setIsOpen] = useState(false)
  const [nameUser, setNameUser] = useState("")
  const menuRef = useRef<HTMLDivElement>(null)

  const links = [
    { href: "/residente", icon: <Home className="w-5 h-5" />, label: "Inicio" },
    { href: "/residente/pagos", icon: <CreditCard className="w-5 h-5" />, label: "Pagos" },
    { href: "/residente/documentos", icon: <FileText className="w-5 h-5" />, label: "Documentos" },
    { href: "/residente/reportes", icon: <BarChart3 className="w-5 h-5" />, label: "Reportes" },
    { href: "/residente/reservas", icon: <Calendar className="w-5 h-5" />, label: "Reservar" },
    { href: "/residente/registros", icon: <UserPen className="w-5 h-5" />, label: "Registros" },
    { href: "/residente/invitados", icon: <Users className="w-5 h-5" />, label: "Invitados" },
  ]

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Cerrar menú al cambiar el tamaño de pantalla
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  async function handleLogout() {
    try {
      await axios.post(`${URL_API}/api/user/logout`, {}, {
        withCredentials: true,
      });
      // Luego rediriges o limpias estado
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Opcional: mostrar un toast o alerta
    }
  }
  useEffect(() => {
    async function getName() {
      try {
        const res = await axios.get(`${URL_API}/api/user/getInfoUser`, {
          withCredentials: true,
        });
        console.log(res.data);
        console.log(res.data.user.nombre);
        const name = res.data.user.nombre;
        if (res.status === 200) {
          setNameUser(name);
        }
      } catch {
        console.error("Error al obtener el nombre del usuario");
      }
    }
    getName();
  }, [])
  console.log("Nombre del usuario: ", nameUser);


  return (


    <nav className="relative " ref={menuRef}>
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/residente">
            <Image
              src={"https://res.cloudinary.com/dt9vn9bnb/image/upload/v1751772003/urbaniteLogoPNG_aw2s4z.png"}
              alt="Urbanite Logo"
              width={80}
              height={60}

            />
          </Link>
        </div>

        {/* Links centrados - Desktop y Tablet */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-8">
          <div className="flex items-center gap-4 lg:gap-6 xl:gap-8">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex items-center gap-2 text-yellow-500 hover:text-white transition-colors duration-200 px-2 py-1 rounded-md hover:bg-gray-800"
              >
                {link.icon}
                <span className="text-sm lg:text-base font-medium whitespace-nowrap">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Avatar y botón hamburguesa */}
        <div className="flex items-center gap-3">
          {/* Avatar - visible en desktop */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 lg:w-10 lg:h-10 cursor-pointer hover:ring-2 hover:ring-yellow-500 transition-all duration-200">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback className="bg-yellow-500 text-black font-semibold">{nameUser.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.location.href = "/profile"}>
                  <UserPen /> Mi perfil
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700"
                >
                  <LogOut className="text-red-500" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Avatar - visible en móvil */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-yellow-500 transition-all duration-200">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-yellow-500 text-black font-semibold text-sm">U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.location.href = "/profile"}>
                  <UserPen>Mi perfil</UserPen>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Botón hamburguesa */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-white hover:text-yellow-500 hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <div className="bg-gray-900 border-t">
          <div className="px-4 py-3 space-y-1">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex items-center gap-3 text-yellow-500 hover:text-white hover:bg-gray-800 transition-colors duration-200 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span className="text-base font-medium">{link.label}</span>
              </Link>
            ))}

            {/* Separador */}
            <div className="border-t border-gray-700 my-2"></div>

            {/* Enlace al perfil en móvil */}
            <Link
              href="/profile"
              className="flex items-center gap-3 text-yellow-500 hover:text-white hover:bg-gray-800 transition-colors duration-200 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                <AvatarFallback className="bg-yellow-500 text-black font-semibold text-xs">U</AvatarFallback>
              </Avatar>
              <span className="text-base font-medium">Mi Perfil</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar menú en móvil */}
      {isOpen && (
        <div className="fixed inset-0 z-[-1] md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </nav>
  )
}

export default NavBarResidente
