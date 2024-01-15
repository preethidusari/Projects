import { LoginLink, LogoutLink, RegisterLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import NavbarLink from "./NavbarLink";
import UserAccountMenu from "./UserAccountMenu";
import { Separator } from "../ui/separator";

interface NavbarLinks {
  head: string;
  route: string;
}

const Navbar = async () => {
  const navBarItems: NavbarLinks[] = [
    {
      head: "Services",
      route: "/our/services",
    },
    {
      head: "Pricing",
      route: "/our/pricing",
    },
    {
      head: "About us",
      route: "/our/company",
    },
    {
      head: "Support",
      route: "/our/support",
    },
  ];
  const { getUser } = getKindeServerSession();
  const user = getUser();
  var isLoggedIn = false;
  if (user) {
    isLoggedIn = true;
  }
  return (
    <nav className="sticky h-16 py-1 inset-x-0 top-0 z-30 w-full border-b border-gray-200 backdrop-blur-lg transition-all bg-[#1D0551]/90">
      <MaxWidthWrapper>
        <div className="lg:px-2 pt-1 flex justify-between items-center">
          <Link href={isLoggedIn ? '/dashboard' : "/"}>
            <Image src={"/Asset 1.png"} height={48} width={102} alt="logo" />
          </Link>
          <ol className=" hidden md:flex max-w-2xl items-center text-white text-md font-semibold space-x-16 text-center">
            {navBarItems.map((item) => {
              return (
                <NavbarLink key={item.route} route={item.route}>
                  <li>{item.head}</li>
                </NavbarLink>
              );
            })}
          </ol>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <UserAccountMenu />
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <RegisterLink className="z-10 px-5 py-2 rounded-lg text-purple-700 bg-white text-lg font-semibold hover:shadow-md hover:underline duration-100 ">
                Try Now
              </RegisterLink>
              <Separator className="h-7" orientation="vertical" />
              <LoginLink className="z-10 px-5 py-[0.46rem] rounded-lg text-white bg-purple-700 text-lg font-semibold hover:shadow-md hover:bg-purple-600 duration-100 ">
                Sign In
              </LoginLink>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
