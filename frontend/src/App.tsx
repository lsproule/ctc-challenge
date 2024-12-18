import "./App.css";
import { Home, Profile } from "@/pages";
import { BrowserRouter, Routes, Route } from "react-router";



//setup router
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<Home />} />
        <Route path="/app/profile" element={<Profile />} />
        <Route
          path="/app/sign_in"
          Component={() => {
            //gives me a path from inside react to hit for redirecting to rails auth
            window.location.href = window.origin + "/users/sign_in"; 
            return null;
          }}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
