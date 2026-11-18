
# React Native CLI - WSL2 Template

## Environment

- OS: Ubuntu 24.04 WSL2
- React Native: 0.88.1
- Node.js: 22.x
- Java JDK: 17
- Android SDK Platform: 37.0
- Android Build Tools: 37.0.0
- Android NDK: 27.1.12297006
- Android Gradle Plugin: 9.2.1
- Gradle Wrapper: 9.4.1

## Project setup

Install dependencies:

```bash
npm ci
```

Configure local Android SDK:

```bash
echo "sdk.dir=$HOME/Android/Sdk" > android/local.properties
```

## Run Android

Make sure:

1. Android Emulator is running on Windows.
2. Windows ADB Server is running.
3. WSL2 ADB connection is available.
4. Port 8081 is available for Metro.

Run:

```bash
./scripts/run-android-wsl.sh
```

For a specific emulator:

```bash
./scripts/run-android-wsl.sh emulator-5554
```

## Important

- Do not commit node_modules.
- Do not commit Android local.properties.
- Do not commit debug.keystore.
- Do not commit private API keys or .env files.
- Use npm ci to restore dependencies.
