"use client"
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
import {headers} from "next/headers"
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import NavbarLink from "./NavbarLink";
import UserDropdownMenu from "./user-dropdown";

interface NavbarLinks {
  head: string,
  route: string
}

const Navbar = () => {
  const currentPage = usePathname();
  const isLandingPage = currentPage.includes("/our/") || currentPage=="/";
  const navBarItems : NavbarLinks[] = [
    {
      head: "Services",
      route: "/our/services",
    },
    {
      head: "Pricing",
      route: "/our/pricing",
    },
    {
      head: "About",
      route: "/our/about",
    },
    {
      head: "Contact Us",
      route: "/contact-us",
    },
  ];
  const userNavBarItems : NavbarLinks[] = [
    {
      head: "LawQue",
      route: ""
    }
  ]

  return (
    <nav
      className={cn(
        "sticky h-16 py-1 inset-x-0 top-0 z-30 w-full border-b border-gray-200 backdrop-blur-lg transition-all ",
        !isLandingPage ? "bg-white/75" : "bg-[#1D0551]/90"
      )}
    >
      <MaxWidthWrapper>
        {!isLandingPage ? (
          <div className="flex h-14 items-center justify-between border-b border-zinc-200">
            <Link href="/dashboard" className="flex z-40 font-semibold ">
              <Image src={"/Asset 2.png"} height={48} width={102} alt="logo" />
            </Link>
            {/* Mobile navbar */}
            <div className="hidden items-center space-x-4 sm:flex">
              <UserDropdownMenu/>
            </div>
          </div>
        ) : (
          <div className="lg:px-2 pt-1 flex justify-between items-center">
            <Link href="/">
              <Image src={"/Asset 1.png"} height={48} width={102} alt="logo" />
            </Link>
            <ol className=" hidden md:flex max-w-2xl items-center text-white text-md font-semibold space-x-16 text-center">
              {navBarItems.map((item) => {
                return (
                  <NavbarLink key={item.route}
                    className={cn(" duration-100",currentPage==item.route ? " uppercase underline underline-offset-4 text-lg shadow-purple-400" : "")}
                    route={item.route}
                  >
                    <li>{item.head}</li>
                  </NavbarLink>
                );
              })}
            </ol>
            <div className="flex items-center space-x-4">
            <RegisterLink className="z-10 px-5 py-2 rounded-lg text-purple-700 bg-white text-lg font-semibold hover:shadow-md hover:underline duration-100 ">
              Try Now
            </RegisterLink>
            <Separator className="h-7" orientation="vertical" />
            <LoginLink className="z-10 px-5 py-[0.46rem] rounded-lg text-white bg-purple-700 text-lg font-semibold hover:shadow-md hover:bg-purple-600 duration-100 ">
              Sign In
            </LoginLink>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
