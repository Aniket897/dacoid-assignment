import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Copy, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import axios from "@/utils/axios";
import ButtonLoader from "../loaders/ButtonLoader";
import { Url } from "@/types";

function ShortNewUrl() {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Url>();

  const toggleModal = () => {
    setShowModal((pre) => !pre);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!url) return;
      setLoading(true);
      const { data } = await axios.post("/url", {
        url,
      });
      setResult(data.url);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data.message || error.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    window.navigator.clipboard.writeText(
      `${window.location.origin}/${result!.shortId}`
    );
    toast.success("url copied");
  };
  return (
    <div>
      <Button onClick={toggleModal}>
        Short new Url
        <Plus />
      </Button>
      {showModal && (
        <Dialog open onOpenChange={toggleModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Shorten a long URL</DialogTitle>
            </DialogHeader>
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <Label>Long Url *</Label>
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="text"
                    placeholder="enter long url"
                    required
                  />
                </div>
                <Button disabled={loading} className="w-full" type="submit">
                  {loading ? (
                    <ButtonLoader />
                  ) : (
                    <>
                      Shorten <ArrowRight />
                    </>
                  )}
                </Button>
              </form>
            </div>
            {result && (
              <div className="bg-card p-5 rounded-md border flex items-center gap-3">
                <Input value={`${window.location.origin}/${result.shortId}`} />
                <Button onClick={handleCopy}>
                  <Copy />
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ShortNewUrl;
