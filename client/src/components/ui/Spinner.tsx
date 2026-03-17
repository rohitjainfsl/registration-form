import React from "react";
import { Loader2 } from "lucide-react";

type Props = {
  className?: string;
  size?: number | string;
  title?: string;
};

export default function Spinner({ className = "h-4 w-4", size, title }: Props) {
  const style = size ? ({ width: size, height: size } as React.CSSProperties) : undefined;
  return (
    <Loader2
      className={`animate-spin ${className}`}
      style={style}
      aria-hidden={false}
      aria-label={title ?? "loading"}
    />
  );
}
