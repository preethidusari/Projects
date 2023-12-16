"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const currentPage = usePathname();

  return (
    <nav
      className={cn(
        "sticky h-14 iset-x-0 top-0 z-30 w-full border-b border-gray-200 backdrop-blur-lg transition-all ",
        currentPage != "/" ? "bg-white/75" : "bg-[#1D0551]/90"
      )}
    >
      <MaxWidthWrapper>
        {currentPage != "/" ? (
          <div className="flex h-14 items-center justify-between border-b border-zinc-200">
            <Link href="/dashboard" className="flex z-40 font-semibold ">
              <Image src={"/Asset 2.png"} height={48} width={102} alt="logo" />
            </Link>
            {/* Mobile navbar */}
            <div className="hidden items-center space-x-4 sm:flex">
              <>
                <LogoutLink
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign Out
                </LogoutLink>
              </>
            </div>
          </div>
        ) : (
          <div className="lg:px-2 pt-1 flex justify-between items-center">
            <Link href="/">
              <Image src={"/Asset 1.png"} height={48} width={102} alt="logo" />
            </Link>
            <ol className=" hidden md:flex max-w-2xl text-white text-lg font-semibold space-x-20 text-center">
              <Link href="/features">
                <li>Services</li>
              </Link>
              <Link href="/pricing">
                <li>Pricing</li>
              </Link>
              <Link href="/about">
                <li>About</li>
              </Link>
              <Link href="/ontact-us">
                <li>Contact us</li>
              </Link>
            </ol>
            <LoginLink className="z-10 px-5 py-2 rounded-lg text-white bg-violet-500 text-lg font-semibold hover:bg-violet-700 ">
              Sign In
            </LoginLink>
          </div>
        )}
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
