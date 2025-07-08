import * as React from "react";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number; // pixels per second
}

export function Marquee({
  children,
  speed = 50,
  ...props
}: MarqueeProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const animationDuration = React.useMemo(() => {
    if (!scrollRef.current) return "20s"; // fallback
    const contentWidth = scrollRef.current.scrollWidth;
    const duration = contentWidth / speed;
    return `${duration}s`;
  }, [speed]);

  return (
    <div className={"overflow-hidden w-full"} {...props}>
      <div
        className="flex w-max animate-marquee gap-8"
        ref={scrollRef}
        style={{
          animationDuration,
        }}
      >
        {children}
        {/* Duplicate for infinite loop */}
        {children}
      </div>
    </div>
  );
}
