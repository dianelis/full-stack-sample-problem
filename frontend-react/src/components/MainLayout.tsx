import { Outlet } from "react-router-dom";

import { Footer } from "./Footer";
import { Header } from "./Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="p-6 overflow-y-auto sm:overflow-y-hidden h-[calc(100vh-128px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
