import { useAuth } from "../hooks/useUser";

export const Header = () => {
  const { logout, user } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-blue-500 text-white text-center">
      <h1 className="text-2xl font-bold">{user?.fullName}</h1>
      <button
        type="submit"
        className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded transition-all font-montserrat font-semibold"
        onClick={logout}
      >
        Logout
      </button>
    </header>
  );
};
