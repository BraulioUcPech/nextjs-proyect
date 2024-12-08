import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Aquí puedes añadir la lógica para cerrar sesión, por ejemplo, eliminar tokens de autenticación
    // localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    router.push('/login');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
