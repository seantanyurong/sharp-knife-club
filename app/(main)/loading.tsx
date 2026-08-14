// Mirrors the shape of HeroSection so the page appears to arrive rather than
// blank out. Keep the block sizes roughly in step with the hero if it changes.
const Loading = () => {
  return (
    <div className="relative bg-primary pt-20 pb-16 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center px-6">
        <div className="flex animate-pulse flex-col items-center w-full">
          {/* rating pill */}
          <div className="h-9 w-64 rounded-full bg-white/10" />

          {/* headline */}
          <div className="mt-6 h-9 w-full max-w-2xl rounded-md bg-white/10 md:h-14" />
          <div className="mt-3 h-9 w-4/5 max-w-xl rounded-md bg-white/10 md:h-14" />

          {/* subheadline */}
          <div className="mt-6 h-4 w-full max-w-lg rounded-md bg-white/5" />
          <div className="mt-2 h-4 w-3/4 max-w-md rounded-md bg-white/5" />

          {/* cta */}
          <div className="mt-8 h-16 w-full max-w-xs rounded-md bg-white/10" />
          <div className="mt-3 h-3 w-40 rounded-md bg-white/5" />

          {/* as seen on */}
          <div className="mt-10 h-6 w-44 rounded-md bg-white/5" />
        </div>
      </div>

      <span className="sr-only" role="status">
        Loading
      </span>
    </div>
  );
};

export default Loading;
