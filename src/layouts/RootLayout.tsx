import { Suspense } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <Suspense
        fallback={
          <div className="flex-1 text-center justify-center items-center">
            Loading...
          </div>
        }
      >
        <main className="container mx-auto px-4 mt-20 pb-20 flex flex-col flex-1">
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
};

export default RootLayout;
