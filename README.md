Reflection


Here’s my honest reflection on this gallery.
I really enjoyed this one. Using Tailwind was a delight— after a bit of React research I’m not sure why some folks still dislike utility-first CSS. It helped me keep things tidy and consistent instead of juggling a thousand lines of bespoke styles. Paired with React’s component model, it felt like I could keep everything small, focused, and in order.
What requirements I achieved
useState for gallery state: I track the current selection via selectedIndex (and derive selectedImage from it). This keeps state simple and avoids drift between two sources of truth.
useEffect to fetch images: On mount I fetch from an external API (via VITE_API_URL), normalize the response, and set initial state.
Multiple components returning JSX: Thumbnail renders each thumb, LargeImage shows the big preview, and App coordinates them.
.map() to render images dynamically: Thumbnails are rendered from the fetched array.
Click shows larger version: Selecting a thumb updates the main image.
Alt text for all images: Every image has alt with a sensible fallback when the API doesn’t provide one.
Keyboard navigation for selection: Thumbnails are real <button> elements (focusable by default). I added explicit Enter/Space handling (preventing Space from scrolling) and global arrow-key navigation (←/→/↑/↓) to move through images. There are also visible focus/selected states.
Enter/Space not activating thumbnails: The tricky part was that Space often scrolls the page and different browsers fire the “click” on different key phases (keydown vs keyup). The fix was:
Use native <button> for thumbnails (so Enter/Space “just work”).

Keyboard navigation in a horizontal scroller: It’s easy to end up pressing Space with the container focused instead of the button. Clear focus styles + explicit key handling + optional arrow-key navigation made this feel reliable.
What went really well
Tailwind + small components kept the codebase compact, readable, and visually consistent.
Custom hook for arrows (useArrowKeys) pulled noisy event wiring out of App.jsx.

I think what couldve gone better is compacting the code a bit more. I would quite often realise after about how to organise the code and of course the multiple errors that come with !one! updated bit of code. The auto fill coding was helpful but also quite irritatiing at times as it would feel like it was getting in the way. 
Helpful sources
React docs (state/effects)
MDN: KeyboardEvent.key / code and default button behavior
WAI-ARIA Authoring Practices for lists/grids and keyboard patterns
Tailwind CSS docs for focus rings and patterns

https://tailwindcss.com/docs/background-image#adding-a-linear-gradient
https://www.youtube.com/shorts/LZiuj0g0dNk
