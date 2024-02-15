"use client";

import { trpc } from "@/app/_trpc/client";
import { Ghost, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Icons } from "../Icons";
import { Badge } from "@/components/ui/badge"
import Skeleton from "react-loading-skeleton";


const UserQueries = () => {
  const { data: queries, isLoading } = trpc.user.getUserQueriesByEmail.useQuery();

  return (
    <section className="pb-12">
      <div className="container px-6 py-5 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-5xl dark:text-white">
          Your <span className="text-purple-700 ">Queries</span>
        </h1>
      </div>
      {isLoading ? (
        <div className=" grid grid-cols-1 gap-8 xl:mb-12 lg:grid-cols-2 xl:grid-cols-3">
          <Skeleton height={150} width={400} className="my-2" />
          <Skeleton height={150} width={400} className="my-2" />
          <Skeleton height={150} width={400} className="my-2" />
      </div>
      ) : queries!.length === 0 ? (
        <div className=" flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-zinc-800" />
          <h3 className="text-xl font-semibold">Pretty empty around here</h3>
          <p>Post your Query</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-8 xl:mb-12 lg:grid-cols-2 xl:grid-cols-3">
          {queries!.map((query) => {
            return (
              <div key={query.id} className="relative px-8 py-4 border rounded-lg dark:border-gray-700">
                <Badge className="absolute right-2" variant="default">{query.queryCategory}</Badge>
                <h1 className=" text-xl font-semibold dark:text-gray-400 truncate">
                  {query.querySubject}
                </h1>
                <h2 className="leading-loose text-gray-500 dark:text-gray-400 truncate">
                  “{query.userQuery}?”
                </h2>
                <div className="flex items-center mt-8 -mx-2">
                  <div className="h-10 w-10 flex flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                    <Icons.user className="text-white" />
                  </div>
                  <div className="mx-2">
                    <h1 className="font-semibold text-gray-800 dark:text-white">
                      {query.userName}
                    </h1>
                    <span className="text-sm text-gray-500">
                      {query.userLocation}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </section>
  );
};

export default UserQueries;
