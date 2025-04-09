import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { Url } from "@/types";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function UrlTable() {
  const [urls, setUrls] = useState<Url[]>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchAllUrls();
  }, []);

  const fetchAllUrls = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/url/list");
      setUrls(data.urls);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="">
        <Table className="border rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Short URL</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls?.map((url) => (
              <TableRow key={url.shortId}>
                <TableCell className="max-w-[200px] truncate">
                  {url.originalUrl}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span>{`${window.location.origin}/${url.shortId}`}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        window.navigator.clipboard.writeText(
                          `${window.location.origin}/${url.shortId}`
                        );
                        toast.success("copied successfully");
                      }}
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{url.clickCount}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link to={`/${url.id}/analytics`}>
                      <Button>Analytics</Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!loading && !urls?.length ? (
          <div className="p-5 flex items-center justify-center py-[50px] font-bold">
            😥 Opps you haven't Shorten any url yet
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default UrlTable;
