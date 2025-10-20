// Example usage of ProfileButton component
import ProfileButton from "@/components/ProfileButton";
import { useAuth } from "@/hooks/useAuth";

const ExampleUsage = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-4">
      <h2>Profile Button Example</h2>
      <div className="mt-4">
        <ProfileButton user={user} />
      </div>
    </div>
  );
};

export default ExampleUsage;
