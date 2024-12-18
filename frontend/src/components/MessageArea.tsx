import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createContext } from "react";
import ActionCable, { Cable } from "actioncable";
import { Message } from "./Message";

const CableContext = createContext<Cable | null>(null);

const actionCableUrl =
  process.env.NODE_ENV === "production"
    ? "ws://localhost:3000/cable"
    : "ws://localhost:3000/cable";

const BACKEND_URL = "http://localhost:3000";

export function MessageArea() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [cable, setCable] = useState<Cable | null>(null);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  //const [roomObj, setRoomObj] = useState({ messages: [] });

  useEffect(() => {
    const getMessages = async () => {
      const req = await fetch(`${BACKEND_URL}/messages`);
      const messages = await req.json();
      setMessages(messages);
    };
    const getCurrentUser = async () => {
      const req = await fetch(`${BACKEND_URL}/current_user`);
      const currentUser = await req.json();
      setCurrentUser(currentUser);
    };
    getCurrentUser();
    getMessages();
  }, []);

  useEffect(() => {
    const CableApp = ActionCable.createConsumer(actionCableUrl);
    setCable(CableApp);
  }, []);

  console.log(currentUser);

  const new_channel = cable?.subscriptions.create(
    { channel: "RoomChannel" },
    {
      connected: () => console.log("room connected!"),
      disconnected: () => console.log("room disconnected!"),
      received: (newMessage: string) => {
        console.log("Received message:", newMessage);
        setMessages([...messages, JSON.parse(newMessage)]);
      },
    },
  );

  const handleSend = () => {
    console.log("Sending message:", message);
    if (message === "") return;
    if (new_channel !== undefined) {
      new_channel.send({ message: message, user_id: currentUser?.id });
    }
    setMessage("");
  };

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CableContext.Provider value={cable}>
      <div className="flex flex-col h-full w-full">
        <div className="flex-grow p-4 h-full w-full scroll-auto overflow-y-scroll">
          {messages.map((message) => {
            return (
              <Message
                key={message.id}
                message={message}
                currentUser={currentUser}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t w-full">
          <div className="flex w-full h-full  items-center space-x-2">
            <Textarea
              value={message}
              onKeyDown={(e: any) => {
                if (e.which === 13 && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                  return;
                }
                if (e.which === 13 && e.shiftKey) {
                  e.preventDefault();
                  setMessage((prev) => prev + "\n");
                  return;
                }
              }}
              onChange={(e: any) => {
                e.preventDefault();

                setMessage(e.target.value);
              }}
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
