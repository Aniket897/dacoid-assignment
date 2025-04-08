import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      <p>Home page</p>
      <Button>
        Click Me <ArrowRight />
      </Button>
    </div>
  );
}
