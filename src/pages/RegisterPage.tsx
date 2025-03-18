import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../store/userStore';

export function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await userStore.register(email, password, username);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1e1e1e] min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full mb-2 p-2 bg-[#3c3c3c] text-white"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-2 p-2 bg-[#3c3c3c] text-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-2 p-2 bg-[#3c3c3c] text-white"
        />
        <button 
          type="submit"
          className="w-full p-2 bg-[#007acc] text-white"
        >
          Зарегистрироваться
        </button>
        <div className="text-white mt-2 text-center">
          <span 
            onClick={() => navigate('/login')}
            className="cursor-pointer text-[#007acc]"
          >
            Войти
          </span>
        </div>
      </form>
    </div>
  );
} 