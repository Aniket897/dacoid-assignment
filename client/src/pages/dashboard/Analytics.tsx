import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Copy, Loader, MousePointerClick } from "lucide-react";

import { Url } from "@/types";
import axios from "@/utils/axios";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ClickTable from "@/components/ClickTable";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

interface Click {
  ip: string;
  createdAt: string;
}

function Analytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState<Url>();
  const [clicks, setClicks] = useState<Click[]>();
  const { id } = useParams();

  useEffect(() => {
    fetchAnalytics(id!);
  }, []);

  const fetchAnalytics = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/analytics/${id}`);
      setUrl(data.url);
      setClicks(data.clicks);
      console.log(data.clicks);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    return <Navigate to={"/dashboard"} />;
  }

  const handleCopy = () => {
    window.navigator.clipboard.writeText(
      `${window.location.origin}/${url!.shortId}`
    );
    toast.success("url copied");
  };

  return (
    <div>
      <Navbar />
      <MaxWidthWrapper>
        {loading && (
          <div className="flex items-center justify-center flex-col gap-3 py-[50px]">
            <Loader className="animate-spin" />
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center flex-col gap-3 py-[50px] text-3xl font-bold">
            <p>😥</p>
            <p>Something went wrong</p>
          </div>
        )}

        {!loading && !error ? (
          <div className="py-[40px] space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link to={"/dashboard"}>
                  <Button>
                    <ArrowLeft />
                  </Button>
                </Link>
                <p className="underline underline-offset-8">
                  {url?.originalUrl}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card rounded-md border flex-1 p-8 flex items-center justify-center flex-col gap-4 h-[200px]">
                {url?.clickCount}
                <p>Clicks</p>
              </div>
              <div className="flex-1 bg-card border rounded-md h-[200px] flex items-center justify-center">
                <QRCodeSVG
                  value={`${window.location.origin}/${url!.shortId}`}
                />
              </div>
              <div className="flex-1 h-[200px] bg-card rounded-md border p-4 flex items-center justify-center flex-col gap-4">
                <Input value={`${window.location.origin}/${url!.shortId}`} />
                <Button className="w-full" onClick={handleCopy}>
                  <Copy /> Copy shorten url
                </Button>
              </div>
            </div>
            {/* RECENT CLICKS CONTAINER */}
            <div>
              <p className="text-xl underline underline-offset-8 flex items-center gap-3">
                <MousePointerClick />
                Recent Clicks
              </p>
              {clicks?.length && <ClickTable clicks={clicks} />}
            </div>
          </div>
        ) : null}
      </MaxWidthWrapper>
    </div>
  );
}

export default Analytics;
