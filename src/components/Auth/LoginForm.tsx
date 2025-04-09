
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm = ({ onToggleForm }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuthStore();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // In a real app, this would make an API call to verify credentials
    // For now, we'll just do a simple validation and mock login
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Mock successful login
    login({
      id: '1',
      email,
      name: email.split('@')[0], // Use part of email as name
    });
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-center">Login to Your Account</h2>
      
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        
        <Button type="submit" className="w-full">Login</Button>
      </form>
      
      <div className="text-center text-sm">
        <span className="text-gray-500">Don't have an account?</span>{' '}
        <button 
          onClick={onToggleForm}
          className="text-blue-600 hover:underline"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
