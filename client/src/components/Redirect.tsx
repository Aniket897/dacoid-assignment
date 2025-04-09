import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { Home, Loader } from "lucide-react";
import { Button } from "./ui/button";

function Redirect() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleRedirect(id!);
  }, []);

  if (!id) {
    return <NotFound />;
  }

  const handleRedirect = async (shortId: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/${shortId}`);
      const { originalUrl } = data;
      window.location.href = originalUrl;
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-3">
      {loading && (
        <>
          <Loader className="animate-spin" />
          <p>Loading...</p>
        </>
      )}

      {error && (
        <>
          <p>🥲 Url not found</p>
          <Link to={"/"}>
            <Button>
              <Home />
              Homepage
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Redirect;
