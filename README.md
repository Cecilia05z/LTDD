
# LTDD - React Native Labs

## 1. Development Environment

- OS: Windows 11
- Linux: Ubuntu on WSL2
- Framework: React Native CLI
- Android Emulator: Windows
- ADB Client: Ubuntu WSL2
- ADB Server: Windows TCP port 5037
- Metro Bundler: port 8081

## 2. Project Structure

```text
LTDD/
├── LAB2/
├── LAB3/
├── docs/
│   └── WSL2-ANDROID-SETUP.md
└── README.md
```

## 3. Create a New Lab

Use the `rnlab` command:

```bash
rnlab LAB3
```

Create another lab:

```bash
rnlab LAB4
```

Default React Native version: 0.88.1.

The script creates the project, adds VS Code automatic connection configuration, and opens VS Code.

## 4. Run the Application

Terminal 1 - Start Metro:

```bash
npm start
```

Terminal 2 - Run Android:

```bash
npm run android
```

## 5. Check Android Connection

```bash
adb devices -l
adb reverse --list
```

Check Metro:

```bash
curl http://localhost:8081/status
```

Expected result:

```text
packager-status:running
```

## 6. Useful Scripts

| Script | Function |
|---|---|
| `~/bin/rnlab` | Create a React Native lab |
| `~/bin/android-connect-wait` | Wait for and connect Emulator |
| `~/bin/update-rn-readme` | Update documentation |

## 7. Delete a Lab

Example:

```bash
rm -rf ~/LTDD/LAB3
```

Warning: This permanently deletes the project folder.

## 8. Documentation

See [WSL2 Android Setup](docs/WSL2-ANDROID-SETUP.md) for setup instructions and troubleshooting.
