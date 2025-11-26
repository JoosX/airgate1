import { Plane, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Plane className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-foreground">Airgate</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-smooth font-medium">
              Inicio
            </Link>
            <Link to="/#destinations" className="text-foreground hover:text-primary transition-smooth font-medium">
              Destinos
            </Link>
            <Link to="/#offers" className="text-foreground hover:text-primary transition-smooth font-medium">
              Ofertas
            </Link>
            {user && (
              <Link to="/my-account" className="text-foreground hover:text-primary transition-smooth font-medium">
                Mi Cuenta
              </Link>
            )}
            <Link to="/help" className="text-foreground hover:text-primary transition-smooth font-medium">
              Ayuda
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">Hola, {user.name}</span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/login")} variant="outline" size="sm">
                  Iniciar Sesión
                </Button>
                <Button onClick={() => navigate("/register")} size="sm" className="bg-accent hover:bg-accent/90">
                  Registrarse
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-foreground hover:text-primary transition-smooth font-medium">
                Inicio
              </Link>
              <Link to="/#destinations" className="text-foreground hover:text-primary transition-smooth font-medium">
                Destinos
              </Link>
              <Link to="/#offers" className="text-foreground hover:text-primary transition-smooth font-medium">
                Ofertas
              </Link>
              {user && (
                <Link to="/my-account" className="text-foreground hover:text-primary transition-smooth font-medium">
                  Mi Cuenta
                </Link>
              )}
              <Link to="/help" className="text-foreground hover:text-primary transition-smooth font-medium">
                Ayuda
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                {user ? (
                  <>
                    <span className="text-sm text-muted-foreground">Hola, {user.name}</span>
                    <Button onClick={handleLogout} variant="outline" size="sm">
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => navigate("/login")} variant="outline" size="sm">
                      Iniciar Sesión
                    </Button>
                    <Button onClick={() => navigate("/register")} size="sm" className="bg-accent hover:bg-accent/90">
                      Registrarse
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
