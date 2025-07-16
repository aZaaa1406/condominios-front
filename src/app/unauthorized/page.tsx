"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a] text-white px-4">
      <div className="bg-[#2a2a2a] border border-red-600 rounded-2xl p-8 shadow-xl max-w-md text-center">
        <div className="flex justify-center mb-4">
          <ShieldAlert className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-red-500 mb-2">
          Acceso no autorizado
        </h1>
        <p className="text-sm text-gray-300 mb-6">
          No tienes permisos para acceder a esta página. Si crees que esto es un
          error, contacta al administrador.
        </p>
        <Button
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition"
          onClick={() => router.push("/")}
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
