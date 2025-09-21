import { useEffect, useState, useCallback } from "react";
import Thumbnail from "./components/Thumbnail.jsx";
import LargeImage from "./components/LargeImage.jsx";
import "./App.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  useEffect(() => {
    async function getImages() {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL, {
           });
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.images ?? [];
        setImages(list);
        setSelectedImage(list[0] ?? null);
        setSelectedIndex(0); 
      } catch (e) {
        console.error(e);
        setImages([]);
        setSelectedImage(null);
      }
    }
    getImages();
  }, []);

  const goToNext = useCallback(() => {
    if (images.length === 0) return;
    const nextIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  }, [images, selectedIndex]);

  const goToPrevious = useCallback(() => {
    if (images.length === 0) return;
    const prevIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  }, [images, selectedIndex]);

  const selectImage = (img, index) => {
    setSelectedImage(img);
    setSelectedIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          goToPrevious();
          break;
        default:
   }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  return (
    <main className="mx-auto max-w-5xl p-4">
      <h1 className="mb-6 text-4xl font-extrabold text-white text-center drop-shadow">Frog-tastic!</h1>
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={goToPrevious}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-colors focus:ring-2 focus:ring-green-400"
          title="Previous (← or ↑)"
        >
          ← Previous
        </button>
        <button
          onClick={goToNext}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-colors focus:ring-2 focus:ring-green-400"
          title="Next (→ or ↓)"
        >
          Next →
        </button>
      </div>

      <div className="rounded-2xl bg-white/10 p-3 shadow">
        {selectedImage ? <LargeImage image={selectedImage} /> : <p className="p-2 text-white/80">Loading image…</p>}
        
        <div className="text-center mt-2 text-white/70">
          {selectedIndex + 1} of {images.length}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="flex gap-3 overflow-x-auto p-2 max-w-full">
          {images.map((img, index) => (
            <Thumbnail
              key={img.id ?? img.url}
              src={img.url}
              alt={img.alt ?? img.title ?? "Image"}
              title={img.title}
              active={index === selectedIndex}
              onActivate={() => selectImage(img, index)} 
            />
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-white/60 text-sm">
        <p>Use ← → arrow keys to navigate</p>
      </div>
    </main>
  );
}