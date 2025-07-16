"use client"

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, FileText, CheckCircle2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { URL_API } from '@/config'
import { toast } from 'sonner'

const ACCEPTED_MIME_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',       // .xlsx
    'image/jpeg'                                                                // .jpg
];

const documentSchema = z.object({
    titulo: z.string().min(1, 'El título es obligatorio'),
    documento: z.instanceof(File, { message: "El archivo es obligatorio" }).refine(file => file.size <= 10 * 1024 * 1024, {
        message: 'El archivo debe ser menor a 10MB',
    }).refine(file => ACCEPTED_MIME_TYPES.includes(file.type), {
        message: 'Tipo de archivo no permitido. Solo se permiten PDF, DOCX, XLSX y JPG.',
    }),
})

type DocumentFormValues = z.infer<typeof documentSchema>

function UploadDocument() {
    const [isUploading, setIsUploading] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [dragActive, setDragActive] = useState(false)

    const form = useForm({
        resolver: zodResolver(documentSchema)
    })

    const selectedFile = form.watch('documento')

    const onSubmit = form.handleSubmit(async (values: DocumentFormValues) => {
        setIsUploading(true)
        setUploadSuccess(false)
        try {
            console.log(values);
            const formData = new FormData()
            formData.append('titulo', values.titulo)
            formData.append('documento', values.documento)
            console.log("Se envia lo siguiente: ", formData);
            const response = await axios.post(`${URL_API}/api/admin/uploadFile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (response.status === 200) {
                toast.success(response.data.message || "Documento subido exitosamente")
                form.reset({
                    titulo: '',
                    documento: undefined
                })
                setUploadSuccess(true)
            }

        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error al subir el documento")
        }

    })

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            form.setValue('documento', file)
        }
    }

    const removeFile = () => {
        form.setValue('documento', undefined as any)
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const getFileIcon = (type: string) => {
        if (type.includes('pdf')) return '📄'
        if (type.includes('word')) return '📝'
        if (type.includes('sheet')) return '📊'
        if (type.includes('image')) return '🖼️'
        return '📎'
    }

    return (
        <div className="min-h-screen bg-black p-4 flex items-center justify-center">
            <Card className='w-full max-w-2xl bg-black border border-amber-500/30 shadow-2xl shadow-amber-500/10'>
                <div className="p-8">
                    <div className="text-center mb-8">
                        <CardTitle className='text-4xl font-bold text-amber-400 mb-4'>
                            Documentos para residentes
                        </CardTitle>
                        <CardDescription className="text-amber-200 text-lg">
                            Publica documentos y avisos para los residentes de la comunidad
                        </CardDescription>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    {uploadSuccess && (
                        <div className="mb-6 p-4 bg-amber-500/20 border border-amber-500/40 rounded-lg flex items-center gap-3 text-amber-300">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>¡Documento subido exitosamente!</span>
                        </div>
                    )}

                    <CardContent className="p-0">
                        <Form {...form}>
                            <form onSubmit={onSubmit} className='space-y-6'>
                                <FormField
                                    name="titulo"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-amber-200 font-medium">
                                                Título del documento
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ingrese el título del documento"
                                                    type="text"
                                                    {...field}
                                                    className="bg-black border-amber-500/30 text-amber-100 placeholder:text-amber-400/60 focus:border-amber-400 focus:ring-amber-400/20"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-amber-300" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="documento"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-amber-200 font-medium">
                                                Documento
                                            </FormLabel>
                                            <FormControl>
                                                <div className="space-y-4">
                                                    {!selectedFile ? (
                                                        <div
                                                            className={cn(
                                                                "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer",
                                                                dragActive
                                                                    ? "border-amber-400 bg-amber-400/10"
                                                                    : "border-amber-500/30 bg-amber-500/5 hover:border-amber-400/50 hover:bg-amber-500/10"
                                                            )}
                                                            onDragEnter={handleDrag}
                                                            onDragLeave={handleDrag}
                                                            onDragOver={handleDrag}
                                                            onDrop={handleDrop}
                                                            onClick={() => document.getElementById('file-input')?.click()}
                                                        >
                                                            <Upload className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                                                            <p className="text-amber-100 mb-2">
                                                                Arrastra tu archivo aquí o haz clic para seleccionar
                                                            </p>
                                                            <p className="text-sm text-amber-400/70">
                                                                PDF, DOCX, XLSX, JPG (máx. 10MB)
                                                            </p>
                                                            <input
                                                                id="file-input"
                                                                type="file"
                                                                accept={ACCEPTED_MIME_TYPES.join(', ')}
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        field.onChange(file);
                                                                    }
                                                                }}
                                                                onBlur={field.onBlur}
                                                                name={field.name}
                                                                ref={field.ref}
                                                                className="hidden"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center text-xl">
                                                                        {getFileIcon(selectedFile.type)}
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-amber-100 font-medium truncate max-w-[200px]">
                                                                            {selectedFile.name}
                                                                        </p>
                                                                        <p className="text-sm text-amber-400/70">
                                                                            {formatFileSize(selectedFile.size)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={removeFile}
                                                                    className="text-amber-400 hover:text-amber-300 hover:bg-amber-400/10"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-amber-300" />

                                            {/* Tipos de archivo permitidos */}
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <Badge variant="outline" className="text-amber-400 border-amber-500/40 bg-amber-500/10">
                                                    PDF
                                                </Badge>
                                                <Badge variant="outline" className="text-amber-400 border-amber-500/40 bg-amber-500/10">
                                                    DOCX
                                                </Badge>
                                                <Badge variant="outline" className="text-amber-400 border-amber-500/40 bg-amber-500/10">
                                                    XLSX
                                                </Badge>
                                                <Badge variant="outline" className="text-amber-400 border-amber-500/40 bg-amber-500/10">
                                                    JPG
                                                </Badge>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={isUploading}
                                    className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-semibold py-3 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isUploading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                                            Subiendo documento...
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="w-4 h-4 mr-2" />
                                            Subir documento
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}

export default UploadDocument