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
import { useToast } from "../ui/use-toast";
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
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const [tableChanged, setTableChanged] = useState<boolean>(false)
  const {
    data: usersData,
    isLoading,
    error,
    isError,
  } = trpc.getAllUsers.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const handleTryAgain = () => {
    utils.getAllUsers.invalidate();
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
      cell: ({ row }) => {
        const [isAdvisor, setIsAdvisor] = useState<string>(row.getValue("is_advisor"));
        const [isChanged, setIsChanged] = useState<boolean>(false)
        const isAdmin: string = row.getValue("is_admin");
        const email: string = row.getValue("email");
        const { mutate: mutateUserRole, isLoading, isError } = trpc.updateUserRole.useMutation({
          onSuccess: () => {
            // utils.getAllUsers.invalidate();
            return toast({
              title: "Role Updated",
              description: row.getValue("first_name")
                ? `${row.getValue("first_name")}'s Record updated successfully`
                : "Record updated successfully",
              variant: "default",
            });
          },
          onMutate: ({ is_advisor }) => {
            setIsAdvisor(is_advisor.toString())
            console.log(isAdvisor)
          },
        });
        const onSave = () => {
          setIsChanged(false)
          mutateUserRole({email: email, is_admin: isAdmin === "true", is_advisor: isAdvisor === "true" })
        }
        return (
          <div className="flex w-fit space-x-3">
            <Select
              value={isAdvisor.toString()}
              onValueChange={(value) => {
                setIsAdvisor(value)
                setIsChanged(true)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={isAdvisor.toString() } />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
              <div className="">
                <Button className={cn(!isChanged ? "hidden" : "")} onClick={onSave}>
                  <Save className="h-5 w-5" />
                </Button>
              </div>
          </div>
        );
      },
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
