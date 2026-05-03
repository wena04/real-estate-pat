import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages is served from https://<user>.github.io/<repo>/
// In Actions, GITHUB_REPOSITORY is "owner/repo-name".
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base =
  process.env.VITE_BASE_PATH?.trim() ||
  (process.env.GITHUB_PAGES === 'true' && repo ? `/${repo}/` : '/');

// https://vitejs.dev/config/shared-options.html#base
export default defineConfig({
  base,
  plugins: [react()],
});
