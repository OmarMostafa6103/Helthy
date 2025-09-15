import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// If you will deploy to GitHub Pages under a repo named `luna-frontend`,
// set base to '/luna-frontend/'. Adjust if you deploy under a different path.
// https://vite.dev/config/
export default defineConfig({
  // Set base to the repository name used for GitHub Pages
  // The site is served at https://omarmostafa6103.github.io/Helthy/
  base: "/Helthy/",
  plugins: [react()],
  server: { port: 5174 },
});
