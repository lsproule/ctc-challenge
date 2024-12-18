import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "@/components/Sidebar";
import { ProfileEditForm } from "@/components";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Profile() {
  const [mobileShow, setMobileShow] = useState<boolean>(false);
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        <div className={`${mobileShow ? "block" : "hidden"} md:block`}>
          <AppSidebar setMobileShow={setMobileShow} />
        </div>
        <main className="flex-1 w-full overflow-auto bg-gray-50">
          <div className="px-5 md:mx-20 lg:mx-32 md:px-20 mt-20">
            <Button
              className={`${mobileShow ? "hidden" : "block"} bg-blue-500 absolute m-4 md:hidden top-0 left-0`}
              onClick={() => {
                setMobileShow((prev) => !prev);
              }}
            >
              sidebar
            </Button>
            <ProfileEditForm />
          </div>
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
