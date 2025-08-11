# Battery Alarm ⚡

A smart battery monitoring app that alerts you when your device reaches a target charge percentage. Built with React, TypeScript, and Capacitor for cross-platform mobile deployment.

## Features

- 🔋 **Real-time Battery Monitoring** - Uses Battery Status API to monitor charging status
- 🎯 **Target Percentage Setting** - Set charging target between 10%-100% with a smooth slider
- 🔊 **Audio Alarm** - Plays alarm sound when target is reached
- 📱 **Mobile Ready** - Works on Android, iOS, and desktop via Capacitor
- 🎨 **Beautiful UI** - Dark theme with glassmorphism design and smooth animations
- ⚡ **Smart Controls** - Automatically stops alarm when charger is unplugged

## Quick Start

### Web Version
1. Clone and install dependencies:
```bash
git clone <your-repo-url>
cd battery-alarm
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:8080](http://localhost:8080) in your browser

### Mobile Development

To run on mobile devices or emulators:

1. **Export to GitHub** via Lovable and clone locally
2. **Install dependencies:**
```bash
npm install
```

3. **Build the project:**
```bash
npm run build
```

4. **Add mobile platforms:**
```bash
# For Android
npx cap add android

# For iOS (macOS only)
npx cap add ios
```

5. **Sync project:**
```bash
npx cap sync
```

6. **Run on device/emulator:**
```bash
# Android
npx cap run android

# iOS (requires Xcode on macOS)
npx cap run ios
```

## Browser Compatibility

- **Full Support**: Chromium-based browsers (Chrome, Edge, Opera)
- **Demo Mode**: Firefox, Safari (shows demo battery data)

The Battery Status API has limited support across browsers. On unsupported browsers, the app runs in demo mode with simulated battery data.

## Development

Built with:
- ⚛️ **React 18** with TypeScript
- 🎨 **Tailwind CSS** with custom design system
- 📱 **Capacitor** for mobile deployment
- 🎵 **Web Audio API** for alarm sounds
- 🔋 **Battery Status API** for real battery monitoring

## Project Structure

```
src/
├── components/
│   ├── BatteryAlarm.tsx      # Main app component
│   ├── BatteryDisplay.tsx    # Battery status visualization
│   ├── TargetSlider.tsx      # Target percentage control
│   └── MonitoringControls.tsx # Start/stop controls
├── hooks/
│   ├── useBattery.ts         # Battery API integration
│   └── useAlarm.ts           # Audio alarm functionality
└── assets/
    └── battery-icon.png      # App icon
```

## Customization

The app uses a semantic design system defined in `src/index.css`. Key color variables:

- `--battery-full`: Green for healthy battery levels
- `--battery-medium`: Amber for medium levels  
- `--battery-low`: Orange for low levels
- `--battery-critical`: Red for critical levels

## Mobile Deployment Notes

- The app uses Capacitor's hot-reload server during development
- For production builds, update `capacitor.config.ts` to remove the server configuration
- iOS deployment requires macOS with Xcode installed
- Android deployment requires Android Studio

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

MIT License - feel free to use this project for your own battery monitoring needs!