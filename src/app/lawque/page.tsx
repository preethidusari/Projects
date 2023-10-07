import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function lawque() {
  return (
    <>
      <div className="bg-[#1D0551] sm:h-20 md:16 lg:h-14 py-2 shadow-2xl">
        <MaxWidthWrapper>
          {/* Navbar */}
          <div className="lg:px-2 flex justify-between items-center">
            <h1 className="text-xl text-purple-500">Legal Intellect</h1>
            <ol className=" hidden md:flex max-w-2xl text-white text-lg font-semibold space-x-20 text-center">
              <li>Home</li>
              <li>Features</li>
              <li>Pricing</li>
              <li>About</li>
              <li>Contact us</li>
            </ol>
            <Link className="px-6 py-1 text-[#C11CCA] text-xl rounded-xl bg-white" href="/login">
              Sign In
            </Link>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default lawque;
