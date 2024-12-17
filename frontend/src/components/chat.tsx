"use client"

import { AppSidebar } from "@/components/Sidebar"
import { MessageArea } from "@/components/MessageArea"
import { SidebarProvider } from "@/components/ui/sidebar"

export function Chat() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 w-full overflow-auto flex flex-col">
          <MessageArea />
        </main>
      </div>
    </SidebarProvider>
  )
}


