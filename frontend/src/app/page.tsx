import { AppSidebar } from "@/components/Sidebar"
import { MessageArea } from "@/components/MessageArea"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-auto flex flex-col">
          <MessageArea />
        </main>
      </div>
    </SidebarProvider>
  )
}

