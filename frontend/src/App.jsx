import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import ApiKeyManager from "@/pages/ApiKeyManager";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/key-manager"
          element={
            <ProtectedRoute>
              <ApiKeyManager />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
