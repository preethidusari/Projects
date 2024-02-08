"use client";
import { trpc } from "@/app/_trpc/client";
import { UserDataTable } from "./userDataTable";
import UnAuthorized from "@/app/un-authorized";
import { Loader2, MoreHorizontal, Save } from "lucide-react";
import { Button } from "../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistance } from "date-fns";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface UsersData {
  email: string;
  first_name: string | null;
  last_name: string | null;
  joinedAt: string;
  is_admin: boolean;
  is_advisor: boolean;
  rating: number;
}

const UsersTable = () => {
  const utils = trpc.useUtils();
  const [tableChanged, setTableChanged] = useState<boolean>(false)
  const {
    data: usersData,
    isLoading,
    error,
    isError,
  } = trpc.user.getAllUsers.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const handleTryAgain = () => {
    utils.user.getAllUsers.invalidate();
  };
  if (isError) {
    if (error?.data?.code == "FORBIDDEN") {
      return <UnAuthorized />;
    } else {
      return (
        <div className=" my-80 flex flex-col justify-center items-center space-y-2">
          <h2 className=" text-2xl">Something went wrong!</h2>
          <Button onClick={handleTryAgain}>Try Again</Button>
        </div>
      );
    }
  }
  const columns: ColumnDef<UsersData>[] = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "first_name",
      header: "First Name",
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
    },
    {
      accessorKey: "joinedAt",
      header: "Member since",
      cell: ({ row }) => {
        const date = formatDistance(
          new Date(row.getValue("joinedAt")),
          new Date()
        );
        return date;
      },
    },
    {
      accessorKey: "is_admin",
      header: "Is Admin",
    },
    {
      accessorKey: "is_advisor",
      header: "Is Legal Advisor",
    },
    {
      accessorKey: "rating",
      header: "Rating",
    },
    {
      id: "actions",
      cell: ({row}) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => console.log(tableChanged)}
              >
                Advisor
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ];

  return (
    <div className=" mx-20">
      {isLoading ? (
        <Loader2 className=" items-center mx-auto my-80 animate-spin h-8 w-8" />
      ) : (
        <UserDataTable columns={columns} data={usersData!} />
      )}
    </div>
  );
};

export default UsersTable;
