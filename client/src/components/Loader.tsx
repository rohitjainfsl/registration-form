import React from "react";
import bundledLogo from "@/assets/logo.png";

// Use public images so the loader can show the retina logo when available
const logoSrc = "/images/logo.png";
const logoSrcSet = "/images/logo@2x.png 2x, /images/logo.png 1x";

type Props = { message?: string };

export default function Loader({ message = "Loading..." }: Props) {
  // Use a fully opaque background so page content is not visible during loading
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 rounded-full flex items-center justify-center shadow-lg">
          <img
            src={logoSrc}
            srcSet={logoSrcSet}
            alt="logo"
            className="w-20 h-20 object-contain animate-[spin_1.8s_linear_infinite]"
            onError={(e) => {
              const t = e.currentTarget as HTMLImageElement;
              if (!t.dataset.fallback) {
                t.src = bundledLogo;
                t.removeAttribute("srcset");
                t.dataset.fallback = "1";
              }
            }}
          />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground">FullStack Learning</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
}
