/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: The rewrite to localhost:5000 has been intentionally removed.
  // All /api/* routes are now handled by native Next.js API routes in app/api/.
  // The chat logic is self-contained in app/api/chat/route.ts and reads
  // the legal document from the /data directory at build/runtime.
};

export default nextConfig;
