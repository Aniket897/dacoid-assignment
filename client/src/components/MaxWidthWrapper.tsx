import { PropsWithChildren } from "react";

function MaxWidthWrapper({ children }: PropsWithChildren) {
  return <div className="w-[1200px] max-w-[90vw] mx-auto">{children}</div>;
}

export default MaxWidthWrapper;
