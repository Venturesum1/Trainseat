
import { useAuthStore } from '../../store/authStore';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { isAuthenticated, user, logout, toggleAuthModal } = useAuthStore();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600">TrainSeatEasy</h1>
        </div>
        
        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Button onClick={toggleAuthModal}>Login / Register</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
