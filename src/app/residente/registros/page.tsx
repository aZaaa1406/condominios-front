"use client";
import React, { useState } from "react";
import VehiculoForm from "@/components/residente-components/forms/vehiculo-forms";
import MascotaForm from "@/components/residente-components/forms/mascota-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function RegistrosPage() {
    const [formularioActivo, setFormularioActivo] = useState<"vehiculo" | "mascota">("vehiculo");

    return (
        <div className="max-w-xl mx-auto p-6">
            <Card className="shadow-xl border border-muted-foreground/10 bg-[#1a1a1a] text-white">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Registro de {formularioActivo === "vehiculo" ? "Vehículo" : "Mascota"}
                    </CardTitle>
                </CardHeader>

                {/* Botones tipo tabs */}
                <div className="flex justify-center gap-2 mb-4">
                    <Button
                        variant={formularioActivo === "vehiculo" ? "default" : "outline"}
                        onClick={() => setFormularioActivo("vehiculo")}
                        className="rounded-full px-6"
                    >
                        Vehículo
                    </Button>
                    <Button
                        variant={formularioActivo === "mascota" ? "default" : "outline"}
                        onClick={() => setFormularioActivo("mascota")}
                        className="rounded-full px-6"
                    >
                        Mascota
                    </Button>
                </div>

                {/* Área del formulario con transición */}
                <CardContent className="min-h-[360px] pt-2 px-4 pb-6">
                    <AnimatePresence mode="wait">
                        {formularioActivo === "vehiculo" && (
                            <motion.div
                                key="vehiculo"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.3 }}
                                className="w-full" // 👈 quita el absolute
                            >
                                <VehiculoForm />
                            </motion.div>
                        )}

                        {formularioActivo === "mascota" && (
                            <motion.div
                                key="mascota"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3 }}
                                className="w-full" // 👈 también aquí
                            >
                                <MascotaForm />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}
