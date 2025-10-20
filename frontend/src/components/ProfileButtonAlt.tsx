import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { UserCircle, LogOut } from "lucide-react";
import { signInWithGoogle, logOut } from "@/lib/firebase";
import { User as FirebaseUser } from "firebase/auth";

interface ProfileButtonAltProps {
  user: FirebaseUser | null | undefined;
}

const ProfileButtonAlt: React.FC<ProfileButtonAltProps> = ({ user }) => {
  const handleLoginClick = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Function to get user initials
  const getUserInitials = (user: FirebaseUser) => {
    if (user.displayName) {
      return user.displayName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    // Fallback to email initials if no display name
    if (user.email) {
      const emailParts = user.email.split('@')[0];
      return emailParts.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  // If user is not logged in, show sign in button
  if (!user) {
    return (
      <Button variant="outline" className="gap-2" onClick={handleLoginClick}>
        <UserCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Sign in with Google</span>
      </Button>
    );
  }

  // If user is logged in, show profile popover (no scroll lock)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-10 h-10 rounded-full p-0 bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
        >
          <span className="text-sm font-medium">
            {getUserInitials(user)}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-0">
        <div className="flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
            {getUserInitials(user)}
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium">
              {user.displayName || 'User'}
            </p>
            <p className="text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <Separator />
        <div className="p-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-red-600 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogoutClick}
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileButtonAlt;
