import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle, LogOut, User } from "lucide-react";
import { signInWithGoogle, logOut } from "@/lib/firebase";
import { User as FirebaseUser } from "firebase/auth";

interface ProfileButtonProps {
  user: FirebaseUser | null | undefined;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ user }) => {
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
      <Button variant="outline" className="gap-2 hover:text-white hover:bg-foreground" onClick={handleLoginClick}>
        <UserCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Sign in with Google</span>
      </Button>
    );
  }

  // If user is logged in, show profile dropdown
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-10 h-10 rounded-full p-0 bg-primary hover:bg-primary hover:text-white text-white hover:scale-110"
        >
          <span className="text-sm font-medium">
            {getUserInitials(user)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
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
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutClick} className="gap-2 text-gray-500 focus:text-white focus:bg-foreground" style={{ cursor: 'pointer' }}>
          <LogOut className="w-4 h-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
