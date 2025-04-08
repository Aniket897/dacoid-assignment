import { Loader } from "lucide-react";

function ButtonLoader() {
  return (
    <div className="flex items-center justify-center gap-3">
      <Loader className="animate-spin" />
      <p>Loading...</p>
    </div>
  );
}

export default ButtonLoader;
