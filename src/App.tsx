import { useApp } from '@/context/AppContext';
import AuthScreen from '@/components/AuthScreen';
import UserPanel from '@/components/user/UserPanel';
import AdminPanel from '@/components/admin/AdminPanel';

function App() {
  const { currentUser } = useApp();

  if (!currentUser) return <AuthScreen />;
  if (currentUser.role === 'admin') return <AdminPanel />;
  return <UserPanel />;
}

export default App;
