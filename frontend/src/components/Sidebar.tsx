import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "/app" },
  { icon: User, label: "Profile", href: "/app/profile" },
];

type SidebarPops = {
  setMobileShow: (show: boolean) => void;
};

export function AppSidebar({ setMobileShow }: SidebarPops) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    const getUser = async () => {
      const req = await fetch(window.origin + "/current_user");
      const user = await req.json();
      setCurrentUser(user);
    };
    getUser();
  }, []);

  return (
    <SidebarContent className="flex  flex-col h-full border-r">
      <SidebarHeader className="p-4 flex flex-row">
        <h2 className="text-lg font-semibold">Chat App</h2>
        <Button
          className="md:hidden bg-blue-500 w-auto ml-auto"
          onClick={() => {
            setMobileShow(false);
          }}
        >
          <Menu />
        </Button>
      </SidebarHeader>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <Link to={item.href} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <div className="flex-grow" />
      <SidebarFooter className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-white" asChild>
            <button className="flex items-center w-full p-2  bg-white rounded-md hover:bg-accent transition-colors duration-200">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback>{currentUser?.email.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{currentUser?.email}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <a href="/users/sign_out" className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </SidebarContent>
  );
}
