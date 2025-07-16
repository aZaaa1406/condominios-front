"use client";
import React, { useState } from "react";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { URL_API } from "../../../config.js";
import { useEffect } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";


type Area = {
    id_area: number;
    nombre: string;
}
type Categoria = {
    id_categoria: number;
    nombre: string;
}

function ReporteForm() {
    const [nombreAreas, setNombreAreas] = useState<string[]>([]);
    const [categorias, setCategorias] = useState<string[]>([])

    useEffect(() => {
        async function fetchNombreAreas() {
            try {
                const res = await axios.get<Area[]>(`${URL_API}/api/resident/areas`);
                const nombres = res.data.map((area) => area.nombre);
                setNombreAreas(nombres);
            } catch (error) {
                console.error("Error al obtener nombres de áreas:", error);
            }
        }

        fetchNombreAreas();
        async function fetchCategorias() {
            try {
                const res = await axios.get<Categoria[]>(`${URL_API}/api/resident/categorias`);
                const nombres = res.data.map((categoria) => categoria.nombre);
                setCategorias(nombres);
            }catch(error){
                console.error("Error al obtener categorías:", error);
            }
        }
        fetchCategorias();
    }, [])

    const reporteSchema = z.object({
        descripcion: z.string().min(1, "La descripción es obligatoria"),
        area: z.string().refine((val) => nombreAreas.includes(val), { message: "Area no válida" }),
        categoria: z.string().refine((val) => categorias.includes(val), { message: "Categoría no válida" }),
        fecha: z.string().refine(val => !isNaN(Date.parse(val)), {
            message: "Fecha inválida",
        })
    })
    type ReporteType = z.infer<typeof reporteSchema>;
    const form = useForm<ReporteType>({
        resolver: zodResolver(reporteSchema)
    })

    const onSubmit = form.handleSubmit(async (values: ReporteType) => {
        console.log(values);
        try{
            const response = await axios.post(`${URL_API}/api/resident/register-incidencia`, values, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            if (response.status === 200) {
                toast.success("Incidencia registrada correctamente");
                form.reset({
                    descripcion: "",
                    area: "",
                    categoria: "",
                    fecha: ""
                });
            } else {
                console.error("Error al registrar la incidencia:", response.data);
            }
        }catch(error){
            console.error("Error al registrar la incidencia:", error);
        }
    })
    return (
        <Card className="bg-[#1a1a1a] text-white border border-[#FFD700] shadow-lg w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#FFD700] text-center">
                    Registro de incidencias
                </CardTitle>
            </CardHeader>
            <CardDescription>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-4  p-4 flex flex-col items-center">
                        <FormField
                            name="area"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#FFD700] font-semibold">
                                        Area
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                        <FormControl>
                                            <SelectTrigger className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-2 focus:ring-yellow-500 w-72">
                                                <SelectValue placeholder="Seleccion el área de la incidencia" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-[#1a1a1a] text-white border border-[#FFD700]">
                                            {nombreAreas.map((nombre) => (
                                                <SelectItem key={nombre} value={nombre}>
                                                    {nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="categoria"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#FFD700] font-semibold">
                                        Categoria
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                        <FormControl>
                                            <SelectTrigger className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-2 focus:ring-yellow-500 w-72">
                                                <SelectValue placeholder="Seleccion la categoria de la incidencia" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-[#1a1a1a] text-white border border-[#FFD700]">
                                            {categorias.map((nombre) => (
                                                <SelectItem key={nombre} value={nombre}>
                                                    {nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="descripcion"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#FFD700] font-semibold">Descripción</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="Ingrese una descripción de la incidencia"
                                            className="w-72"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="fecha"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#FFD700] font-semibold">Fecha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            {...field}
                                            className="w-72"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="bg-[#FFD700] text-black hover:bg-yellow-500 transition-colors duration-200"
                        >
                            Registrar Incidencia
                        </Button>
                    </form>
                </Form>
            </CardDescription>
        </Card>
    )
}

export default ReporteForm