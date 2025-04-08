import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { ArrowRight, CalendarRange } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center flex-col gap-6 text-center w-full md:w-[60%] mx-auto leading-relaxed">
        <h1 className="font-bold text-xl md:text-7xl">
          <span className="underline underline-offset-8">Short</span>,{" "}
          <span className="underline underline-offset-8">Track</span> and{" "}
          <span className="underline underline-offset-8">Analyze</span> With
          UShort
        </h1>
        <p className="text-xl text-neutral-600">
          UShort is a free tool to shorten URLs and generate short links URL
          shortener allows to create a shortened link making it easy to share
        </p>
        {isAuthenticated ? (
          <Link to={"/dashboard"}>
            <Button>
              Navigate to dashboard <ArrowRight />
            </Button>
          </Link>
        ) : (
          <div className="flex items-center justify-center gap-9 mt-[50px]">
            <Button variant={"ghost"}>
              Schedule a demo
              <CalendarRange />
            </Button>
            <Link to={"/register"}>
              <Button>
                Get Started for free <ArrowRight />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
