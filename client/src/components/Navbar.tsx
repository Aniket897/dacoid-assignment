import { ArrowRight, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import axios from "@/utils/axios";
import { useState } from "react";
import ButtonLoader from "./loaders/ButtonLoader";

function Navbar() {
  const { isAuthenticated, userData } = useSelector(
    (state: RootState) => state.auth
  );

  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await axios.get("/auth/logout");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("unable to logout, please try again");
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="border-b rounded-md">
      <MaxWidthWrapper>
        <div className="py-4 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">UShort</h1>
          </div>
          <div className="flex items-center gap-x-5">
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="w-[30px] h-[30px] text-xs rounded-full flex items-center justify-center bg-pink-500 text-white">
                      {userData?.name.slice(0, 2).toUpperCase()}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Button onClick={handleLogout} variant={"destructive"}>
                      {logoutLoading ? (
                        <ButtonLoader />
                      ) : (
                        <>
                          Logout <LogOut />
                        </>
                      )}
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <Button variant={"link"}>Login</Button>
                </Link>
                <Link to={"/register"}>
                  <Button>
                    Get Started <ArrowRight />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Navbar;
