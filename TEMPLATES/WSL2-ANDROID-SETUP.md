# WSL2 + Ubuntu + Android Studio Setup

Tài liệu lưu trữ cấu hình môi trường phát triển React Native trên Windows 11 và Ubuntu 24.04 WSL2.

## 1. System Environment

| Thành phần | Cấu hình |
|---|---|
| Host OS | Windows 11 |
| Linux Distribution | Ubuntu 24.04 |
| WSL Version | WSL2 |
| IDE | Visual Studio Code |
| Remote Development | VS Code WSL Extension |
| Terminal | Ubuntu Bash |

## 2. Development Environment

| Thành phần | Phiên bản / Đường dẫn |
|---|---|
| Node.js | 22.x |
| npm | Theo NVM |
| React Native | 0.88.1 |
| Java JDK | OpenJDK 17 |
| Android SDK Platform | 37.0 |
| Android Build Tools | 37.0.0 |
| Android NDK | 27.1.12297006 |
| Android Gradle Plugin | 9.2.1 |
| Gradle Wrapper | 9.4.1 |
| Android Command-line Tools | 22.0 |

## 3. Android SDK Configuration

### Windows Android SDK

Đường dẫn:

```text
C:\Users\cecil\AppData\Local\Android\Sdk
```

Các công cụ quan trọng:

```text
Android\Sdk\
├── platform-tools\
│   └── adb.exe
├── emulator\
│   └── emulator.exe
├── platforms\
└── build-tools\
```

### Ubuntu Android SDK

Đường dẫn:

```text
/home/cecilia/Android/Sdk
```

Biến môi trường:

```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
```

PATH:

```bash
export PATH="$HOME/bin:$ANDROID_HOME/platform-tools:$PATH"
export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin"
export PATH="$PATH:$ANDROID_HOME/emulator"
```

## 4. Android SDK Packages

Các package đã cài trên Ubuntu:

```text
platform-tools

platforms;android-37.0

build-tools;37.0.0

ndk;27.1.12297006
```

Lệnh kiểm tra:

```bash
sdkmanager --list_installed
```

Kiểm tra các thư mục:

```bash
ls "$ANDROID_HOME/platforms"
ls "$ANDROID_HOME/build-tools"
ls "$ANDROID_HOME/ndk"
```

## 5. Java Configuration

Java JDK:

```text
/usr/lib/jvm/java-17-openjdk-amd64
```

Cấu hình:

```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
```

Kiểm tra:

```bash
java -version
javac -version
echo "$JAVA_HOME"
```

## 6. Windows ADB Server Configuration

ADB Server chạy trên Windows:

```text
Windows ADB Server
127.0.0.1:5037
```

Windows ADB executable:

```text
C:\Users\cecil\AppData\Local\Android\Sdk\platform-tools\adb.exe
```

ADB Server sử dụng TCP port:

```text
5037
```

### Windows Port Proxy

Cấu hình Port Proxy hiện tại:

| Thành phần | Giá trị |
|---|---|
| Listen Address | 172.19.48.1 |
| Listen Port | 5037 |
| Connect Address | 127.0.0.1 |
| Connect Port | 5037 |

Mô hình kết nối:

```text
Ubuntu WSL2
     |
     | TCP 5037
     |
172.19.48.1:5037
     |
Windows Port Proxy
     |
127.0.0.1:5037
     |
Windows ADB Server
     |
Android Emulator
```

Kiểm tra Port Proxy trên Windows PowerShell Administrator:

```powershell
netsh interface portproxy show v4tov4
```

Kiểm tra ADB:

```powershell
$adb = "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe"

& $adb devices -l
```

### Windows Firewall

Firewall rule:

```text
ADB from WSL2 only
```

Cấu hình:

```text
Direction: Inbound
Action: Allow
Protocol: TCP
Local Port: 5037
Remote Address: 172.19.63.59
```

Chỉ cho phép địa chỉ IP WSL2 đã khai báo truy cập ADB Server.

Không mở cổng ADB cho toàn bộ mạng LAN hoặc Internet.

## 7. Ubuntu ADB Configuration

Ubuntu sử dụng Android ADB Linux Client:

```text
/home/cecilia/Android/Sdk/platform-tools/adb
```

Wrapper:

```text
/home/cecilia/bin/adb
```

Nội dung file `~/bin/adb`:

```bash
#!/usr/bin/env bash
exec "$HOME/Android/Sdk/platform-tools/adb" "$@"
```

Cấp quyền thực thi:

```bash
chmod +x ~/bin/adb
```

### ADB Server Socket

Ubuntu kết nối tới Windows ADB Server thông qua:

```bash
WIN_HOST=$(ip route show default | awk '$1=="default" {print $3; exit}')

export ADB_SERVER_SOCKET="tcp:${WIN_HOST}:5037"
```

Kiểm tra:

```bash
echo "$ADB_SERVER_SOCKET"
adb version
adb devices -l
```

Kết quả mong muốn:

```text
List of devices attached
emulator-5554    device
```

### Kiểm tra kết nối TCP

```bash
WIN_HOST=$(ip route show default | awk '$1=="default" {print $3; exit}')

timeout 3 bash -c "echo > /dev/tcp/$WIN_HOST/5037" \
&& echo "ADB PORT OPEN" \
|| echo "ADB PORT CLOSED"
```

## 8. WSL2 Network Configuration

IP đã quan sát trong lần cấu hình gần nhất:

| Thành phần | IP |
|---|---|
| Windows Gateway | 172.19.48.1 |
| Ubuntu WSL2 | 172.19.63.59 |

IMPORTANT:

Hai địa chỉ IP trên có thể thay đổi khi WSL2 restart hoặc Windows thay đổi mạng.

Luôn kiểm tra IP hiện tại trước khi cấu hình lại Port Proxy và Firewall.

Lấy Windows Gateway trong Ubuntu:

```bash
ip route show default
```

Lấy IP Ubuntu:

```bash
hostname -I
```

## 9. Android Emulator Configuration

AVD đã kiểm tra trước đó:

```text
Name: Pixel_7
ABI: x86_64
Android: 17
API Level: 37
```

System Image tại thời điểm kiểm tra:

```text
android-37.1/google_apis_playstore_ps16k/x86_64
```

Cấu hình RAM trước đó:

```text
2048 MB
```

Kiểm tra Emulator trên Windows:

```powershell
$adb = "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe"

& $adb devices -l
```

Kiểm tra Android Boot:

```powershell
& $adb -s emulator-5554 shell getprop sys.boot_completed
```

Kết quả:

```text
1
```

Lưu ý: Emulator ID có thể thay đổi khi tạo AVD mới hoặc khởi động lại máy ảo.

## 10. Metro Bundler Configuration

Metro chạy trong Ubuntu WSL2:

```text
Port: 8081
```

Khởi động Metro:

```bash
cd ~/LTDD/LAB2

npx react-native start
```

Kiểm tra:

```bash
curl http://localhost:8081/status
```

Kết quả:

```text
packager-status:running
```

Windows PowerShell có thể kiểm tra:

```powershell
curl.exe http://localhost:8081/status
```

## 11. ADB Reverse Configuration

Kết nối Android Emulator với Metro:

```bash
adb reverse tcp:8081 tcp:8081
```

Kiểm tra:

```bash
adb reverse --list
```

Kết quả mong muốn:

```text
host-18 tcp:8081 tcp:8081
```

Nếu không có mapping, chạy lại:

```bash
adb reverse tcp:8081 tcp:8081
```

ADB Reverse giúp Android Emulator truy cập Metro trên cổng 8081 của máy tính chạy ADB Server.

## 12. React Native Project Configuration

Project tham chiếu:

```text
/home/cecilia/LTDD/LAB2
```

Phiên bản:

```text
React Native: 0.88.1
```

Cài dependencies:

```bash
npm ci
```

Cấu hình Android SDK cho project:

```bash
echo "sdk.dir=$HOME/Android/Sdk" > android/local.properties
```

Build APK:

```bash
cd android
./gradlew assembleDebug
```

Chạy Android:

```bash
cd ~/LTDD/LAB2

npx react-native run-android --device emulator-5554
```

## 13. Troubleshooting

### A. ADB không nhận Emulator

```bash
adb devices -l
```

Nếu không thấy thiết bị, kiểm tra Windows:

```powershell
& $adb devices -l
```

Kiểm tra Port Proxy:

```powershell
netsh interface portproxy show v4tov4
```

### B. ADB Port Closed

Trong Ubuntu:

```bash
WIN_HOST=$(ip route show default | awk '$1=="default" {print $3; exit}')

timeout 3 bash -c "echo > /dev/tcp/$WIN_HOST/5037" \
&& echo "OPEN" \
|| echo "CLOSED"
```

Nếu CLOSED, kiểm tra lại Windows Port Proxy, Firewall và IP hiện tại.

### C. Unable to load script

Kiểm tra Metro:

```bash
curl http://localhost:8081/status
```

Thiết lập ADB Reverse:

```bash
adb reverse tcp:8081 tcp:8081
```

Khởi động Metro:

```bash
npx react-native start --reset-cache
```

Sau đó Reload ứng dụng trên Emulator.

### D. Gradle không nhận Android SDK

Kiểm tra:

```bash
echo "$ANDROID_HOME"
```

Kiểm tra:

```bash
cat android/local.properties
```

Nội dung mong muốn:

```properties
sdk.dir=/home/cecilia/Android/Sdk
```

### E. Gradle không nhận thiết bị

```bash
adb devices
```

Dừng Gradle Daemon:

```bash
cd android
./gradlew --stop
```

Sau đó chạy lại React Native.

## 14. WSL2 Android Recovery Checklist

Khi Windows hoặc Ubuntu restart, thực hiện theo thứ tự:

1. Khởi động Android Emulator trên Windows.
2. Kiểm tra Windows ADB:

```powershell
& $adb devices -l
```

3. Mở Ubuntu và kiểm tra Gateway:

```bash
ip route show default
```

4. Kiểm tra IP Ubuntu:

```bash
hostname -I
```

5. Kiểm tra Windows Port Proxy:

```powershell
netsh interface portproxy show v4tov4
```

Nếu IP thay đổi, cập nhật Port Proxy và Firewall theo IP hiện tại.

6. Cấu hình ADB Server Socket:

```bash
WIN_HOST=$(ip route show default | awk '$1=="default" {print $3; exit}')

export ADB_SERVER_SOCKET="tcp:${WIN_HOST}:5037"
```

7. Kiểm tra thiết bị:

```bash
adb devices -l
```

8. Khởi động Metro:

```bash
cd ~/LTDD/LAB2

npx react-native start
```

9. Thiết lập ADB Reverse:

```bash
adb reverse tcp:8081 tcp:8081
```

10. Chạy ứng dụng:

```bash
npx react-native run-android --device emulator-5554
```

---

## 15. Important Notes

- Source code lưu trong Ubuntu filesystem: `/home/cecilia/`.
- Windows SDK và Ubuntu SDK là hai đường dẫn khác nhau.
- Không xóa Android SDK nếu chưa kiểm tra project đang sử dụng.
- Không commit `node_modules/`.
- Không commit `android/local.properties`.
- Không commit `debug.keystore`.
- Không đưa SSH Private Key hoặc API secrets lên GitHub.
- `ADB_SERVER_SOCKET` cần trỏ tới Windows ADB Server.
- Metro phải chạy khi phát triển React Native ở chế độ Debug.
- IP WSL2 và Windows Gateway không được xem là cố định.

## 16. Useful Commands

| Chức năng | Lệnh |
|---|---|
| Kiểm tra Git | `git status` |
| Kiểm tra Node | `node -v` |
| Kiểm tra npm | `npm -v` |
| Kiểm tra Java | `java -version` |
| Kiểm tra ADB | `adb devices` |
| Kiểm tra Android SDK | `echo $ANDROID_HOME` |
| Chạy Metro | `npx react-native start` |
| Chạy Android | `npx react-native run-android` |
| Build APK | `cd android && ./gradlew assembleDebug` |
| Dừng Gradle | `./gradlew --stop` |
| Xem cây thư mục | `tree -L 3` |

---

**Document:** WSL2 Android Development Environment

**Purpose:** Backup, troubleshooting and reproducible React Native development setup.

**Reference Project:** LTDD/LAB2

**Maintainer:** Cecilia
