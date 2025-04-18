import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import axios from "@/utils/axios";
import ButtonLoader from "../loaders/ButtonLoader";

function ShortNewUrl() {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

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
      window.location.href = `/${data.url.id}/analytics`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data.message || error.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
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
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ShortNewUrl;
