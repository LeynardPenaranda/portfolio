import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-[30rem] md:h-[50rem]  flex items-center justify-center">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center">
          <Image src="/images/Leynard.png" alt="me" width={200} height={200} />
          <span className="text-destructive">404 Not Found</span>
        </div>
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
