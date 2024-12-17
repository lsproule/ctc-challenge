import { Chat } from "@/components";
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate();
  const check = async () => {
    try {
      const req = await fetch(window.origin + "/check_auth");
      const _ = await req.json();
      console.log(_);
    } catch {
      navigate("/app/sign_in");
    }
  };
  check();
  return (
    <div className="h-dvh w-full">
      <Chat></Chat>
    </div>
  );
}
