import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { UserCircle, LogOut } from "lucide-react";
import { signInWithGoogle, logOut } from "@/lib/firebase";

const TopBar = () => {
    const { user } = useAuth()

    const handleLoginClick = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    }

    const handleLogoutClick = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo/Brand */}
                <div className="flex items-center">
                    <h1 className="text-xl font-serif font-semibold text-foreground">
                        Nuvia
                    </h1>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Par projektu
                    </a>
                    <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Experience
                    </a>
                    <a href="#cta" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Join Us
                    </a>
                </nav>

                {/* Profile/Login Button */}
                {user ? (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{user.email}</span>
                        <Button variant="outline" size="sm" onClick={handleLogoutClick} className="gap-2">
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Sign out</span>
                        </Button>
                    </div>
                ) : (
                    <Button variant="outline" className="gap-2" onClick={handleLoginClick}>
                        <UserCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">Sign in with Google</span>
                    </Button>
                )}
            </div>
        </header>
    );
};

export default TopBar;
