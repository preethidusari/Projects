import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";
import UserAccountMenu from "./user-dropdown";

const UsersNavbar = () => {
  return (
    <nav className="sticky h-16 py-1 inset-x-0 top-0 z-30 w-full border-b border-gray-200 backdrop-blur-lg transition-all bg-[#1D0551]/90">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-zinc-200">
          <Link href="/dashboard" className="flex z-40 font-semibold ">
            <Image src={"/Asset 2.png"} height={48} width={102} alt="logo" />
          </Link>
          {/* Mobile navbar */}
          <div className="hidden items-center space-x-4 sm:flex">
            <UserAccountMenu />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
export default UsersNavbar;
