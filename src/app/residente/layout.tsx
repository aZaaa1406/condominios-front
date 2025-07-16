import React from 'react'
import NavBarResidente from '@/components/residente-components/NavBarResidente'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 backdrop-blur-md shadow-md p-4">
        <NavBarResidente />
      </header>
      <main className="flex-1 ">
        {children}
      </main>
    </div>
  )
}

export default Layout
