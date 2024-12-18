import { Chat } from "@/components";
import {useState} from "react"; 
import { useNavigate } from "react-router";

export function Home() {
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  // this function checks if the user is authenticated 
  // if not, it redirects to the sign in page 
  const check = async () => {
    try {
      const req = await fetch(window.origin + "/check_auth");
      const _ = await req.json();
      console.log(_);
    } catch {
      navigate("/app/sign_in");

    }
    setLoading(false); 
  };
  check()

  if (loading){
    return <div>Loading...</div> 
  }


  return (
    <div className="h-dvh w-full">
      <Chat></Chat>
    </div>
  );
}
