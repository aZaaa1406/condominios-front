"use client";
import React from "react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { URL_API } from "@/config";
import { toast } from "sonner";

const mascotaSchema = z.object({
  tipo: z.enum(["Perro", "Gato", "Otro"]),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  color: z.string().min(1, "El color es obligatorio"),
  rasgos: z.string().min(1, "Los rasgos son obligatorios"),
  raza: z.string().optional()
});

type MascotaType = z.infer<typeof mascotaSchema>;

function MascotaForm() {
  const form = useForm<MascotaType>({
    resolver: zodResolver(mascotaSchema),
  });

  const onSubmit = form.handleSubmit(async (values: MascotaType) => {
    console.log(values);
    try {
      const res = await axios.post(`${URL_API}/api/resident/register-mascota`, values, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Mascota registrada exitosamente");
        form.reset({
          tipo: "Perro",
          nombre: "",
          color: "",
          rasgos: "",
          raza: "",
        });
      }
    } catch (error) {
      toast.error("Error al registrar la mascota");
      console.error("Error al registrar la mascota:", error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md mx-auto px-4 flex flex-col">
        <FormField
          name="tipo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#FFD700] font-semibold">
                Mascota
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-2 focus:ring-yellow-500 w-full">
                    <SelectValue placeholder="Seleccione el tipo de su mascota" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#1a1a1a] text-white border border-[#FFD700]">
                  <SelectItem value="Perro">Perro</SelectItem>
                  <SelectItem value="Gato">Gato</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          name="nombre"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          name="color"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          name="rasgos"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rasgos</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          name="raza"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raza</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-[#FFD700] text-black hover:bg-yellow-500 hover:text-white"
        >
          Registrar Mascota
        </Button>
      </form>
    </Form>
  );
}

export default MascotaForm;
