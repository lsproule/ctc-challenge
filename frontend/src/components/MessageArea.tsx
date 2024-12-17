import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createContext } from "react";
import ActionCable, {Cable} from "actioncable";

const CableContext = createContext<Cable | null>(null);

export function MessageArea() {
  const [message, setMessage] = useState<string>("");
  //const [messages, setMessages] = useState<string[]>([]);
  const [roomObj, setRoomObj] = useState({ messages: [] });
  console.log(roomObj); 
  //const BACKEND_URL = "http://localhost:3000"; 
  //const messages = fetch(`${BACKEND_URL}/messages`) 
  const actionCableUrl =
    process.env.NODE_ENV === "production"
      ? "ws://localhost:3000/cable"
      : "ws://localhost:3000/cable";

  const CableApp = ActionCable.createConsumer(actionCableUrl);

  CableApp.subscriptions.create(
    { channel: "RoomChannel" },
    {
      connected: () => console.log("thing connected!"),
      disconnected: () => console.log("room disconnected!"),
      received: (updatedRoom) => setRoomObj(updatedRoom),
    },
  );

  const handleSend = () => {
    console.log("Sending message:", message);
  };

  return (
    <CableContext.Provider value={CableApp}>
      <div className="flex flex-col h-full w-full">
        <div className="flex-grow p-4 h-full w-full">
          {/* Message history would go here */}
        </div>
        <div className="p-4 border-t w-full">
          <div className="flex w-full h-full  items-center space-x-2">
            <Textarea
              value={message}
              onChange={(e: any) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow resize-none"
              rows={3}
            />
            <Button onClick={handleSend} className="shrink-0">
              Send
            </Button>
          </div>
        </div>
      </div>
    </CableContext.Provider>
  );
}
