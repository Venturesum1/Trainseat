
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthModalOpen, toggleAuthModal } = useAuthStore();
  
  const toggleForm = () => setIsLogin(!isLogin);
  
  return (
    <Dialog open={isAuthModalOpen} onOpenChange={toggleAuthModal}>
      <DialogContent className="sm:max-w-md">
        {isLogin ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <RegisterForm onToggleForm={toggleForm} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
