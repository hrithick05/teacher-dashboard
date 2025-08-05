import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
