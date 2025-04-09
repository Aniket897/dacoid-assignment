import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ShortNewUrl from "@/components/modals/ShortNewUrl";
import Navbar from "@/components/Navbar";
import UrlTable from "@/components/UrlTable";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <MaxWidthWrapper>
        <div className="space-y-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="underline underline-offset-8 text-3xl">
                Dashboard
              </h1>
            </div>
            <div>
              <ShortNewUrl />
            </div>
          </div>
        </div>
        <UrlTable />
      </MaxWidthWrapper>
    </div>
  );
}
