
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, X, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { NAV_LINKS } from '../../lib/constants';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const MtnLogo = () => (
    <div className="flex items-center gap-2">
        <div className="bg-primary-700 p-2 rounded-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 7L12 12L22 7" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M12 12V22" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
        </div>
        <span className="font-bold text-xl text-primary-900 hidden md:inline">MTN</span>
    </div>
);


const NavContent = () => (
  <nav className="flex flex-col gap-2 p-4">
    {NAV_LINKS.map((link) => (
      <NavLink
        key={link.href}
        to={link.href}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-primary-100 hover:text-primary-900',
            isActive && 'bg-primary-100 text-primary-900 font-semibold'
          )
        }
      >
        <link.icon className="h-4 w-4" />
        {link.label}
      </NavLink>
    ))}
  </nav>
);

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
    const { logout } = useAuth();
    return (
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-white px-4 md:px-6 sticky top-0 z-30">
             <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
                    <Menu className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-semibold text-primary-900">Mailing Masivo</h1>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-white font-bold">
                                A
                            </div>
                            <span className="hidden sm:inline">Admin</span>
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Perfil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Cerrar Sesión</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};


const Sidebar = () => (
    <aside className="hidden border-r bg-muted/40 md:block w-64">
        <div className="flex h-16 items-center border-b px-6">
            <MtnLogo />
        </div>
        <NavContent />
    </aside>
);


export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[256px_1fr]">
      <Sidebar />
       <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="flex flex-col p-0">
          <div className="flex h-16 items-center border-b px-6">
            <MtnLogo />
          </div>
          <NavContent />
        </SheetContent>
      </Sheet>
      <div className="flex flex-col">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 bg-muted p-4 md:p-6 lg:p-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
