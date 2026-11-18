
# WSL2 - Android Emulator Setup

## 1. Architecture

Windows 11:
- Android Emulator
- Android SDK
- ADB Server (TCP 5037)
- Port Proxy

Ubuntu WSL2:
- React Native CLI
- Linux ADB Client
- Metro Bundler (8081)

ADB Client in WSL connects to Windows ADB Server through the Windows gateway.

## 2. Android SDK Environment

SDK location:

```text
~/Android/Sdk
```

Environment variables in `~/.bashrc`:

```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$HOME/bin:$PATH"
```

Reload configuration:

```bash
source ~/.bashrc
```

## 3. ADB Connection

Find Windows gateway:

```bash
ip route show default
```

Check port 5037:

```bash
WIN_HOST=$(ip route show default | awk 'NR==1 {print $3}')
timeout 3 bash -c ":</dev/tcp/$WIN_HOST/5037"
```

Check connected devices:

```bash
adb devices -l
```

Windows must have ADB Server running and portproxy/firewall configured to allow WSL access.

## 4. Automatic Emulator Connection

Script:

```text
~/bin/android-connect-wait
```

Run manually:

```bash
~/bin/android-connect-wait 180
```

The script:
1. Detects the Windows gateway.
2. Connects to the Windows ADB Server.
3. Waits for an Android Emulator.
4. Waits for Android boot completion.
5. Configures reverse port 8081.

Each project created using `rnlab` should have:

```text
.vscode/tasks.json
```

This task starts the connection script when the workspace opens.

VS Code setting:

```json
"task.allowAutomaticTasks": "on"
```

The workspace must be trusted and automatic task execution allowed.

## 5. Running React Native

Start Metro:

```bash
npm start
```

Run Android:

```bash
npm run android
```

Check reverse:

```bash
adb reverse --list
```

## 6. Troubleshooting

### Emulator not detected

```bash
adb devices -l
```

Check:
- Emulator is running.
- Windows ADB Server is running.
- TCP port 5037 is reachable.
- Portproxy and Windows Firewall are configured correctly.

### Metro connection problem

```bash
curl http://localhost:8081/status
adb reverse tcp:8081 tcp:8081
```

### Automatic task does not run

Check:
- `.vscode/tasks.json` exists.
- `task.allowAutomaticTasks` is enabled.
- VS Code workspace is trusted.
- Emulator boots within the script's waiting period.

### Check connection log

```bash
cat ~/.android-connect.log
```

## 7. Important Notes

- Windows gateway can change after WSL restarts.
- Portproxy may need updating if network configuration changes.
- The Emulator must be running for ADB to detect it.
- Metro must be started separately.
- Do not delete the shared scripts when deleting an individual lab.
