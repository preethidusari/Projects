import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  FolderPlus,
} from "lucide-react";
import { Icons } from "../Icons";

export function LegalDocumentSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className=" text-md" variant="secondary">
          <Icons.LibraryBig className="text-purple-800 mr-2" /> Legal Forms
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-purple-800 text-4xl">
            Legal Documents
          </SheetTitle>
          <SheetDescription>
            A Categorized Legal Documentation Shell.
          </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">
              <FolderPlus className="mr-2" /> Add Files
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
