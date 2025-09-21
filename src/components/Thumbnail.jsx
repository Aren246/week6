
export default function Thumbnail({ src, alt, title, onActivate }) {
  return (
    <button
      type="button"
      onClick={onActivate}
      className={`w-20 h-20 shrink-0 overflow-hidden rounded-xl shadow cursor-pointer
                  focus:ring-2 focus:ring-green-500 transition-all duration-200
                 hover:ring-2 hover:ring-green-400 hover:scale-105
                `}
    >
      <img
        src={src}
        alt={alt || title || 'Image'}
        className="h-full w-full object-cover"
      />
    </button>
  );
}