import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="p-4 flex items-center justify-between border-b">
      <div>
        <h1 className="font-bold text-xl">UShort</h1>
      </div>
      <div className="space-x-5">
        <Link to={"/login"}>
          <Button variant={"link"}>Login</Button>
        </Link>
        <Link to={"/register"}>
          <Button>
            Get Started <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
