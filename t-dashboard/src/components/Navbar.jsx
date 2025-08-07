import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Menu, 
  X, 
  Home, 
  BarChart3, 
  Users, 
  Award, 
  Info, 
  Settings, 
  LogOut, 
  User,
  Plus,
  Sun,
  Moon
} from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { getCookie, deleteCookie } from '../utils/cookies';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('loggedInFaculty') || getCookie('loggedInFaculty');
  const loggedInFaculty = isLoggedIn ? 
    (localStorage.getItem('loggedInFaculty') ? 
      JSON.parse(localStorage.getItem('loggedInFaculty')) : 
      getCookie('loggedInFaculty')) : null;

  const handleLogout = () => {
    localStorage.removeItem('loggedInFaculty');
    deleteCookie('loggedInFaculty');
    deleteCookie('loginTimestamp');
    deleteCookie('sessionInfo');
    deleteCookie('lastActivity');
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    navigate('/login');
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { name: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
    { name: 'Services', href: '/services', icon: <Settings className="w-4 h-4" /> },
    { name: 'Contact', href: '/contact', icon: <User className="w-4 h-4" /> },
  ];

  const dashboardItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Top Performers', href: '/top-performer', icon: <Award className="w-4 h-4" /> },
    { name: 'Add Faculty', href: '/add-faculty', icon: <Plus className="w-4 h-4" /> },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Faculty Dashboard</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Public Navigation */}
            {!isLoggedIn && (
              <>
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </>
            )}

            {/* Dashboard Navigation */}
            {isLoggedIn && (
              <>
                {dashboardItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="ml-2"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            {/* User Menu */}
            {isLoggedIn && (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {loggedInFaculty?.name?.split(' ')[0] || 'User'}
                  </span>
                </Button>

                {isMenuOpen && (
                  <Card className="absolute right-0 mt-2 w-48 z-50">
                    <CardContent className="p-2">
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        {loggedInFaculty?.name}
                      </div>
                      <div className="border-t border-border my-1"></div>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
            {/* Public Navigation */}
            {!isLoggedIn && (
              <>
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                ))}
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-start">
                    Login
                  </Button>
                </Link>
              </>
            )}

            {/* Dashboard Navigation */}
            {isLoggedIn && (
              <>
                {dashboardItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                ))}
                <div className="border-t border-border my-2"></div>
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  {loggedInFaculty?.name}
                </div>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            )}

            {/* Theme Toggle Mobile */}
            <div className="px-3 py-2">
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="w-full justify-start"
              >
                {theme === 'light' ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
