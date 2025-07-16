"use client"; // Componente del lado del cliente

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Ajusta la ruta según tu configuración

// Función para capitalizar texto sin lodash
const capitalize = (str: string): string =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const DynamicBreadcrumb: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment); // Divide la ruta en segmentos

  return (
    <Breadcrumb>
      <BreadcrumbList>

        {/* Migajas para cada segmento de la ruta */}
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const displayName = capitalize(segment); // Usa la función personalizada

          return (
            <div key={href} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
              <BreadcrumbItem className="hidden md:block">
                {isLast ? (
                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{displayName}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;