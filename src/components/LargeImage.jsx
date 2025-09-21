export default function LargeImage({ image }) {


  return (
    <div className="mt-6 w-full">
      <div className="relative w-full overflow-hidden rounded-2xl bg-black/20 shadow-lg aspect-[4/3] sm:aspect-[16/10]">
        <img
          src={image.url}
          alt={image.alt ?? image.title ?? "Selected image"}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
      {image.title && (
        <p className="mt-2 text-center text-white/90">{image.title}</p>
      )}
    </div>
  );
}
