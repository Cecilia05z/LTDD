
#!/usr/bin/env bash
set -euo pipefail

# Move to project root
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

# Android SDK
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
export PATH="$HOME/bin:$ANDROID_HOME/platform-tools:$PATH"

# Connect to Windows ADB Server through WSL gateway
WIN_HOST="$(ip route show default | awk '$1=="default" {print $3; exit}')"

if [[ -z "$WIN_HOST" ]]; then
    echo "ERROR: Cannot determine Windows gateway."
    exit 1
fi

export ADB_SERVER_SOCKET="tcp:${WIN_HOST}:5037"

# Check ADB
if ! command -v adb >/dev/null 2>&1; then
    echo "ERROR: ADB command not found."
    exit 1
fi

# Select connected device
DEVICE="${1:-}"

if [[ -z "$DEVICE" ]]; then
    mapfile -t DEVICES < <(
        adb devices | awk 'NR > 1 && $2 == "device" {print $1}'
    )

    if [[ ${#DEVICES[@]} -eq 0 ]]; then
        echo "ERROR: No Android device connected."
        adb devices -l
        exit 1
    elif [[ ${#DEVICES[@]} -gt 1 ]]; then
        echo "Multiple devices found. Please specify device ID:"
        adb devices -l
        echo "Example: ./scripts/run-android-wsl.sh emulator-5554"
        exit 1
    fi

    DEVICE="${DEVICES[0]}"
fi

# Verify device
if [[ "$(adb -s "$DEVICE" get-state 2>/dev/null || true)" != "device" ]]; then
    echo "ERROR: Device $DEVICE is not ready."
    adb devices -l
    exit 1
fi

# Connect Android to Metro
adb -s "$DEVICE" reverse tcp:8081 tcp:8081

echo "======================================"
echo " React Native WSL2 Environment"
echo "======================================"
echo "Project : $PROJECT_ROOT"
echo "Device  : $DEVICE"
echo "Gateway : $WIN_HOST"
echo "Metro   : localhost:8081"
echo "======================================"

# Build and run
exec npx react-native run-android --device "$DEVICE"
