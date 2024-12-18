import React from "react";
import { format } from "date-fns";

interface MessageProps {
  message: Message;
  currentUser?: User;
}

export const Message: React.FC<MessageProps> = ({ message, currentUser }) => {
  if (!currentUser) return null;

  const isCurrentUser = message.user_id === currentUser.id;
  const createdAt = new Date(message.created_at);
  const date = isNaN(createdAt.getTime()) ? new Date(Date.now()) : createdAt;
  const formattedTime = format(date, "h:mm a");

  return (
    <div
      className={`flex w-full my-2 ${isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] min-w-32 rounded-lg p-3 ${
          isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {isCurrentUser ? null : (
          <p className="text-black font-bold text-xs">{message.user.email}</p>
        )}
        <p className="text-sm mb-1 whitespace-pre">{message.content}</p>
        <p
          className={`text-xs ${isCurrentUser ? "text-blue-100" : "text-gray-500"}`}
        >
          {formattedTime}
        </p>
      </div>
    </div>
  );
};
