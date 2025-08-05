import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import FacultyLogin from "./pages/FacultyLogin";
import FacultyAuth from "./pages/FacultyAuth";
import AddFaculty from "./pages/AddFaculty";
import FacultyDetails from "./pages/FacultyDetails";
import TopPerformer from "./TopPerformer/TopPerformer";
import FacultyStats from "./TopPerformer/FacultyStats";
import FacultyDetailView from "./components/FacultyDetailView";
import LoginForm from "./components/LoginForm";

function ProtectedRoute({ children }) {
  const loggedInFaculty = localStorage.getItem("loggedInFaculty");
  return loggedInFaculty ? children : <Navigate to="/login" replace />;
}

const queryClient = new QueryClient();

const App = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className={theme}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/home" element={<Index theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faculty-login" element={<FacultyLogin />} />
              <Route path="/faculty-auth" element={<FacultyAuth />} />
              <Route path="/add-faculty" element={<AddFaculty />} />
              <Route path="/faculty-details/:id" element={<FacultyDetails />} />
              <Route path="/top-performer" element={<TopPerformer data={[]} />} />
              <Route path="/faculty-stats/:id" element={<FacultyStats />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />

              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Index theme={theme} toggleTheme={toggleTheme} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/details"
                element={
                  <ProtectedRoute>
                    <FacultyDetailView />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
