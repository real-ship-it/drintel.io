import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = location === href;
    return (
      <Link href={href} className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground"
      )}>
        {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <ShieldCheck className="h-6 w-6" />
          <span>DrIntel</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/">Home</NavLink>
          
          {/* Premium Services Dropdown */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                  location === "/dashboard" || location === "/templates" || location === "/trainings" || location === "/reports" ? "text-primary" : "text-muted-foreground"
                )}>
                  Premium Services
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/templates" className="cursor-pointer">Templates</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/trainings" className="cursor-pointer">Trainings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/reports" className="cursor-pointer">Reports</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 hidden lg:inline-block">Hi, {user.name}</span>
              <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login" className="inline-block">
                <Button variant="ghost" className="font-medium">Log in</Button>
              </Link>
              <Link href="/signup" className="inline-block">
                <Button className="font-medium">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium">Home</Link>
                
                {user && (
                  <>
                    <div className="pl-4 border-l-2 border-primary space-y-4">
                      <p className="text-sm font-semibold text-primary uppercase tracking-wide">Premium Services</p>
                      <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-medium block">Dashboard</Link>
                      <Link href="/templates" onClick={() => setIsOpen(false)} className="text-lg font-medium block">Templates</Link>
                      <Link href="/trainings" onClick={() => setIsOpen(false)} className="text-lg font-medium block">Trainings</Link>
                      <Link href="/reports" onClick={() => setIsOpen(false)} className="text-lg font-medium block">Reports</Link>
                    </div>
                  </>
                )}
                
                <Link href="/pricing" onClick={() => setIsOpen(false)} className="text-lg font-medium">Pricing</Link>
                <Link href="/blog" onClick={() => setIsOpen(false)} className="text-lg font-medium">Blog</Link>
                <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-medium">About</Link>
                <div className="h-px bg-border" />
                {!user && (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium">Log in</Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)} className="text-lg font-medium text-primary">Get Started</Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-muted/50 py-12 border-t mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-primary">
              <ShieldCheck className="h-6 w-6" />
              <span>DrIntel</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The trusted standard for medical office compliance and training management.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/templates">Templates</Link></li>
              <li><Link href="/trainings">Trainings</Link></li>
              <li><Link href="/reports">Reports</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="#">HIPAA Compliance</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DrIntel Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
