import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Intro from "@/components/intro";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import IntroChat from "@/components/intochat";

export default function Home() {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  return (
    <div className="bg-white">
      <Intro />
      <IntroChat />
    </div>
  );
}
