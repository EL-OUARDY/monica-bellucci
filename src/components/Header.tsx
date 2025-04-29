import { MenuIcon } from "lucide-react";

function Header() {
  return (
    <header className="flex w-full items-center justify-between px-8 pt-4 lg:w-5xl">
      <span className="font-title text-xl font-semibold">Monica Bellucci</span>
      <MenuIcon className="size-5 cursor-pointer" />
    </header>
  );
}

export default Header;
