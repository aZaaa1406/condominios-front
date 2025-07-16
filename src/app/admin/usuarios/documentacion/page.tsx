"use client"
import { useEffect, useState } from "react"
import PDFViewer from '@/components/PDFViewer'
import { URL_API } from "@/config"
import axios from "axios"

interface Documento {
  titulo: string
  url: string
}

function DocumentosSubidos() {
  const [documentos, setDocumento] = useState<Documento []>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDocumentos() {
      try {
        const res = await axios.get<Documento[]>(`${URL_API}/api/admin/get-documentos`)
        console.log(res.data);
        setDocumento(res.data)
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    }
    fetchDocumentos()
  }, [])

  if (loading) return <p className="text-center mt-10">Cargando documentos...</p>

  if (documentos.length === 0) return <p className="text-center mt-10 text-red-500">No se encontraron documentos</p>

  return (
    <div className="space-y-10">
      {documentos.map((doc, index) => (
        <PDFViewer key={index} url={doc.url} titulo={doc.titulo} />
      ))}
    </div>
  )
}

export default DocumentosSubidos