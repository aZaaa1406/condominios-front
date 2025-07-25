import { AppSidebar } from "@/components/admin-components/app-sidebar"
import DynamicBreadcrumb from "@/components/dynamic-bread"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumb/>
          </div>
        </header>
        <div className="p-8">
            {children}
        </div>
        
      </SidebarInset>
    </SidebarProvider>
  )
}
