import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a5d26fbd2abe4e46bf9bce182cb1d44b',
  appName: 'Battery Alarm',
  webDir: 'dist',
  server: {
    url: 'https://a5d26fbd-2abe-4e46-bf9b-ce182cb1d44b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1a1a1a",
      showSpinner: false
    }
  }
};

export default config;