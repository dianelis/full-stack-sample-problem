export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-blue-500 text-white text-center">
      <h1 className="text-2xl font-bold">John Doe</h1>
      <button
        type="submit"
        className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded transition-all font-montserrat font-semibold"
        onClick={() => {
          console.log("logout");
        }}
      >
        Logout
      </button>
    </header>
  );
};
