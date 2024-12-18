import { AppSidebar } from "@/components/Sidebar";
import { MessageArea } from "@/components/MessageArea";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Chat() {
  const [mobileShow, setMobileShow] = useState<boolean>(false);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <div
          className={`${mobileShow ? "block" : "hidden"} w-1/2 md:block md:w-1/3 lg:w-1/5`}
        >
          <AppSidebar setMobileShow={setMobileShow} />
        </div>
        <main className="flex-1 w-full overflow-auto flex flex-col">
          <Button
            className={`${mobileShow ? "hidden" : "block"} bg-blue-500 rounded-full drop-shadow-lg absolute m-4 md:hidden top-0 left-0`}
            onClick={() => {
              setMobileShow((prev) => !prev);
            }}
          >
            <Menu />
          </Button>
          <MessageArea />
        </main>
      </div>
    </SidebarProvider>
  );
}
