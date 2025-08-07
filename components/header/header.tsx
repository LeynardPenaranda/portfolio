import HeaderDrawer from "./drawer";
import Logo from "./logo";
import ModeToggle from "./mode-toogle";
import Navbar from "./navbar";

const Header = () => {
  return (
    <header className="w-full bg-background flex items-center justify-around h-[3.9rem] border-b border-gray-300">
      <Logo />
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-5 ">
          <ModeToggle />
          <div className="md:hidden">
            <HeaderDrawer />
          </div>
        </div>
        <div className="hidden md:block">
          <Navbar flex="flex-row" />
        </div>
      </div>
    </header>
  );
};

export default Header;
