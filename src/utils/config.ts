export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Validate API_URL
if (!API_URL) {
  console.error("NEXT_PUBLIC_API_URL environment variable is not set!");
  console.error("Please add NEXT_PUBLIC_API_URL to your .env.local file");
}

export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTA1OSwicm9sZV9pZHMiOlsxMDBdLCJ0eXBlIjoiYWdlbnQiLCJleHAiOjE4MTUwMjcxMTN9.2IGDKYQUUNiNsobTcxoimWSr4644VR5QPi_S2k5qrwI";
