import { useAuth } from "@/hooks/useAuth";
import ProfileButton from "@/components/ProfileButton";

const TopBar = () => {
    const { user } = useAuth();
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo/Brand */}
                <div className="flex items-center">
                    <h1 className="text-xl font-serif font-semibold text-foreground">
                        Nuvia
                    </h1>
                </div>
                
                {/* Profile/Login Button */}
                <ProfileButton user={user} />
            </div>
        </header>
    );
};

export default TopBar;
