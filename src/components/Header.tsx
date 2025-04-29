import { MenuIcon } from "lucide-react";

function Header() {
  return (
    <header className="flex w-full items-center justify-between lg:w-5xl">
      <span className="text-xl font-semibold">Monica Bellucci</span>
      <MenuIcon className="size-5 cursor-pointer" />
    </header>
  );
}

export default Header;
