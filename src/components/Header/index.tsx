import { Link } from "react-router";

const Header = () => {
  return (
    <header
      className="fixed top-0 left-0 right-0 backdrop-blur-md
    bg-white/10
    border-b border-white/20
     z-30"
    >
      <div className="mx-auto px-4 py-2 h-16 flex items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Youtube</Link>
        </h1>
      </div>
    </header>
  );
};
export default Header;
