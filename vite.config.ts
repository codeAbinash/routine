import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
export default defineConfig({
   base: '/routine',
   plugins: [react()],
   build: {
      assetsInlineLimit: 0,
      rollupOptions: {
         output: {
            entryFileNames: 'js/[name].js',
            chunkFileNames: 'js/[name].js',
            assetFileNames: 'assets/[name].[ext]',
         },
      },
   },
   esbuild: {
      drop: ['debugger'],
      pure: ['console.log'],
   },
});
