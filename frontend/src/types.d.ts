type User = {
  id: number;
  email: string;
  password?: string;
  created_at: string;
  updated_at: string;
};

type Message = {
  id: number;
  user_id: number;
  room_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: User;
};
