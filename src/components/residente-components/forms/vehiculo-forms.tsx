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
import { URL_API } from "@/config";
import { toast } from "sonner";

const vehiculosSchema = z
  .object({
    tipo: z.enum(["Carro", "Motocicleta", "Otro"]),
    
    placa: z
      .string()
      .min(1, "La placa es obligatoria")
      .transform((val) => val.toUpperCase().trim()),

    modelo: z
      .string()
      .min(1, "El modelo es obligatorio")
      .transform((val) => val.trim()),

    color: z
      .string()
      .min(1, "El color es obligatorio")
      .transform((val) => val.trim()),

    marca: z
      .string()
      .min(1, "La marca es obligatoria")
      .transform((val) => val.trim()),
  })
  .superRefine((data, ctx) => {
    const { tipo, placa } = data;

    const regexCarro = /^[A-Z]{3}-\d{3}-[A-Z]$/;       // ABC-123-D
    const regexMoto = /^\d{3}-[A-Z]{3}$/;              // 123-ABC
    const regexOtro = /^[A-Z0-9\-]{5,}$/;              // algo flexible

    let isValid = false;

    if (tipo === "Carro") {
      isValid = regexCarro.test(placa);
      if (!isValid) {
        ctx.addIssue({
          path: ["placa"],
          code: z.ZodIssueCode.custom,
          message: "La placa debe tener el formato ABC-123-D",
        });
      }
    } else if (tipo === "Motocicleta") {
      isValid = regexMoto.test(placa);
      if (!isValid) {
        ctx.addIssue({
          path: ["placa"],
          code: z.ZodIssueCode.custom,
          message: "La placa debe tener el formato 123-ABC",
        });
      }
    } else {
      isValid = regexOtro.test(placa);
      if (!isValid) {
        ctx.addIssue({
          path: ["placa"],
          code: z.ZodIssueCode.custom,
          message: "La placa debe tener al menos 5 caracteres válidos",
        });
      }
    }
  });

type VehiculoType = z.infer<typeof vehiculosSchema>;

function VehiculoForm() {
  const form = useForm<VehiculoType>({
    resolver: zodResolver(vehiculosSchema),
  });

  const onSubmit = form.handleSubmit(async (values: VehiculoType) => {
    console.log(values);
    try {
      const res = await axios.post(`${URL_API}/api/resident/register-vehiculo`, values,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      if(res.status === 200){
        toast.success(res.data.message)
        form.reset({
          tipo: "Carro",
          placa: "",
          modelo: "",
          color: "",
          marca: "",
        });
      }
    } catch (error) {
      throw new Error("Error al registrar el vehículo", error as Error);
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
                Vehículo
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-[#1a1a1a] text-white border border-[#FFD700] focus:ring-2 focus:ring-yellow-500 w-full">
                    <SelectValue placeholder="Seleccione el tipo de su vehículo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#1a1a1a] text-white border border-[#FFD700]">
                  <SelectItem value="Carro">Carro</SelectItem>
                  <SelectItem value="Motocicleta">Motocicleta</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        {["placa", "modelo", "color", "marca"].map((fieldName) => (
          <FormField
            key={fieldName}
            name={fieldName as keyof VehiculoType}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{fieldName}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={`Ingrese la ${fieldName} de su vehículo`}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          className="bg-[#FFD700] text-black hover:bg-yellow-500 transition-colors duration-200"
        >
          Registrar Vehículo
        </Button>
      </form>
    </Form>
  );
}

export default VehiculoForm;
