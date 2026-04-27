export default function VideoBackground() {
  return (
    <div className="fixed inset-0">
      <div className="h-full w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="object-cover w-full h-full"
          style={{
            transform: "scale(1.15) translateY(2%)",
            transformOrigin: "center center",
          }}
        >
          <source src="/videos/2026_background_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 22%, rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.28) 72%, rgba(0,0,0,0.5) 100%)",
        }}
      ></div>
    </div>
  );
}
