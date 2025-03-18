import { useNavigate } from 'react-router-dom';
import { userStore } from '../store/userStore';

export function HomePage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await userStore.logout();
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="p-6 bg-[#1e1e1e] min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-white">Главная страница</h1>
      <p className="text-white/80 mb-4">
        Добро пожаловать в приложение!
      </p>
      <button 
        onClick={handleLogout}
        className="px-4 py-2 bg-[#007acc] text-white rounded"
      >
        Выйти
      </button>
    </div>
  );
} 