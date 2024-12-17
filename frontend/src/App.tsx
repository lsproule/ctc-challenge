import "./App.css";
import { Home } from "@/pages";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<Home />} />
        <Route
          path="/app/sign_in"
          Component={() => {
            window.location.href = window.origin + "/users/sign_in"; 
            return null;
          }}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
