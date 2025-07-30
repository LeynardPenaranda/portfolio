import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Logs } from "lucide-react";
import Navbar from "./navbar";

const HeaderDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger className="btn">
        <Logs className="mt-3" />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>My Side Panel</SheetTitle>
          <SheetDescription>Click the text to navigate.</SheetDescription>
        </SheetHeader>
        <Navbar flex="flex-col" />
      </SheetContent>
    </Sheet>
  );
};

export default HeaderDrawer;
