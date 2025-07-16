import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, CreditCard, Wrench, Calendar, Shield, Clock, Smartphone, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">Urbanite</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#funcionalidades" className="text-gray-300 hover:text-yellow-400 transition-colors scroll-smooth">
              Funcionalidades
            </a>
            <a href="#beneficios" className="text-gray-300 hover:text-yellow-400 transition-colors scroll-smooth">
              Beneficios
            </a>
            <a href="#contacto" className="text-gray-300 hover:text-yellow-400 transition-colors scroll-smooth">
              Contacto
            </a>
          </nav>
          <div className="flex items-center">
            <Link href="/login">
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30">
            Gestión Inteligente de Condominios
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Tu hogar, siempre{" "}
            <span className="text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text">
              conectado
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Plataforma integral para residentes que facilita la gestión de visitas, pagos, mantenimiento y reservas de
            áreas comunes en tu condominio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold text-lg px-8 py-3"
            >
              Comenzar Ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 hover:border-yellow-500 text-lg px-8 py-3"
            >
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Funcionalidades Section */}
      <section id="funcionalidades" className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Todo lo que necesitas en un solo lugar</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Gestiona todos los aspectos de tu vida en el condominio de manera simple y eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Registro de Visitas */}
            <Card className="border border-gray-700 shadow-2xl hover:shadow-yellow-500/10 transition-all bg-gradient-to-br from-gray-800 to-gray-900 hover:border-yellow-500/50 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-xl text-white">Registro de Visitas</CardTitle>
                <CardDescription className="text-gray-300">
                  Registra y autoriza las visitas a tu hogar de forma rápida y segura
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Pre-autorización de visitantes
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Códigos QR para acceso rápido
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Historial de visitas
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Avisos del Administrador */}
            <Card className="border border-gray-700 shadow-2xl hover:shadow-yellow-500/10 transition-all bg-gradient-to-br from-gray-800 to-gray-900 hover:border-yellow-500/50 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-xl text-white">Avisos y Documentación</CardTitle>
                <CardDescription className="text-gray-300">
                  Mantente informado con todos los comunicados oficiales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Notificaciones en tiempo real
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Documentos importantes
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Actas de reuniones
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Gestión de Pagos */}
            <Card className="border border-gray-700 shadow-2xl hover:shadow-yellow-500/10 transition-all bg-gradient-to-br from-gray-800 to-gray-900 hover:border-yellow-500/50 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CreditCard className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-xl text-white">Control de Pagos</CardTitle>
                <CardDescription className="text-gray-300">
                  Mantén al día tus cuotas de mantenimiento y servicios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Estado de cuenta actualizado
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Recordatorios de pago
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Historial de transacciones
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Reportes de Mantenimiento */}
            <Card className="border border-gray-700 shadow-2xl hover:shadow-yellow-500/10 transition-all bg-gradient-to-br from-gray-800 to-gray-900 hover:border-yellow-500/50 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Wrench className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-xl text-white">Reportes de Mantenimiento</CardTitle>
                <CardDescription className="text-gray-300">
                  Reporta fallas y da seguimiento a las reparaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Reportes con fotos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Seguimiento en tiempo real
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Priorización automática
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Reserva de Áreas Comunes */}
            <Card className="border border-gray-700 shadow-2xl hover:shadow-yellow-500/10 transition-all bg-gradient-to-br from-gray-800 to-gray-900 hover:border-yellow-500/50 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-xl text-white">Reserva de Áreas Comunes</CardTitle>
                <CardDescription className="text-gray-300">
                  Reserva salones, canchas y espacios recreativos fácilmente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Calendario interactivo
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Disponibilidad en tiempo real
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Confirmación automática
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Acceso Móvil */}
            <Card className="border border-gray-700 shadow-2xl hover:shadow-yellow-500/10 transition-all bg-gradient-to-br from-gray-800 to-gray-900 hover:border-yellow-500/50 group">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Smartphone className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-xl text-white">Acceso Móvil</CardTitle>
                <CardDescription className="text-gray-300">
                  Gestiona todo desde tu smartphone, en cualquier momento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    App nativa iOS y Android
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Notificaciones push
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    Interfaz intuitiva
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section id="beneficios" className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">¿Por qué elegir CondoManager?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transformamos la manera en que vives tu condominio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Ahorra Tiempo</h3>
              <p className="text-gray-300">
                Gestiona todas tus necesidades del condominio en minutos, no horas. Automatización inteligente para tu
                comodidad.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Mayor Seguridad</h3>
              <p className="text-gray-300">
                Control total sobre quién visita tu hogar. Sistema de autorización avanzado con trazabilidad completa.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Siempre Conectado</h3>
              <p className="text-gray-300">
                Accede desde cualquier dispositivo, en cualquier momento. Tu condominio al alcance de tu mano.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6">¿Listo para modernizar tu condominio?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de residentes que ya disfrutan de una gestión más eficiente y segura
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold text-lg px-8 py-3"
            >
              Comenzar Gratis
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 hover:border-yellow-500 text-lg px-8 py-3"
            >
              Solicitar Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-black border-t border-gray-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-yellow-500" />
                <span className="text-xl font-bold text-white">CondoManager</span>
              </div>
              <p className="text-gray-400">La plataforma líder en gestión de condominios para residentes modernos.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-yellow-400">Funcionalidades</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Registro de Visitas</li>
                <li className="hover:text-white transition-colors cursor-pointer">Gestión de Pagos</li>
                <li className="hover:text-white transition-colors cursor-pointer">Reportes de Mantenimiento</li>
                <li className="hover:text-white transition-colors cursor-pointer">Reserva de Áreas</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-yellow-400">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Centro de Ayuda</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contacto</li>
                <li className="hover:text-white transition-colors cursor-pointer">Tutoriales</li>
                <li className="hover:text-white transition-colors cursor-pointer">FAQ</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-yellow-400">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors">info@condomanager.com</li>
                <li className="hover:text-white transition-colors">+1 (555) 123-4567</li>
                <li className="hover:text-white transition-colors">Lun - Vie: 9AM - 6PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CondoManager. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
