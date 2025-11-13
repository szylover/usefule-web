# Local Development Setup

Follow the steps below to run the Useful Web desktop portal locally.

## 1. Install Prerequisites

### Rust toolchain (via rustup)
- macOS & Linux:
  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  source "$HOME/.cargo/env"
  ```
- Windows (PowerShell):
  ```powershell
  winget install --id Rustlang.Rustup -e
  rustup default stable
  ```
Verify the installation with:
```bash
rustc --version
cargo --version
```

### Node.js 18+
- Using `nvm` on macOS/Linux:
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
  source "$HOME/.nvm/nvm.sh"
  nvm install 18
  nvm use 18
  ```
- Using `nvm-windows` on Windows:
  1. Download the latest installer from <https://github.com/coreybutler/nvm-windows/releases>.
  2. Run the installer and follow the prompts, then execute:
     ```powershell
     nvm install 18.19.0
     nvm use 18.19.0
     ```
- Using package managers:
  - Homebrew: `brew install node@18`
  - Chocolatey: `choco install nodejs-lts`

Confirm the active version:
```bash
node --version
npm --version
```

### JavaScript package manager (pnpm preferred)
- Using Corepack (ships with Node 16.13+):
  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate
  ```
- Alternative direct install:
  ```bash
  npm install -g pnpm
  ```
Check installation:
```bash
pnpm --version
```

### Tauri system dependencies
Install the platform-specific libraries described in the [official Tauri prerequisites guide](https://tauri.app/v1/guides/getting-started/prerequisites/). Common commands include:
- macOS: `xcode-select --install`
- Ubuntu/Debian:
  ```bash
  sudo apt update
  sudo apt install -y libwebkit2gtk-4.0-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
  ```
- Fedora:
  ```bash
  sudo dnf install webkit2gtk4.0-devel gtk3-devel libappindicator-gtk3 librsvg2-devel
  ```
- Windows: ensure the "Desktop development with C++" workload is installed via Visual Studio Build Tools.

## 2. Clone the Repository
```bash
git clone https://github.com/<your-org>/useful-web.git
cd useful-web
```

## 3. Install JavaScript Dependencies
```bash
pnpm install
```
This command downloads all Node.js dependencies defined in the workspace manifests, including the portal app’s local Vite
binary. Without this step the `vite` command invoked by `pnpm dev` will not be available.

If you encounter an error such as `'vite' is not recognized as an internal or external command'`, rerun the install step scoped
to the portal package to make sure its `node_modules` directory is populated:
```bash
pnpm --filter portal install
```
You can verify that Vite is available with:
```bash
pnpm --filter portal exec vite --version
```

## 4. Prepare the Database (Optional for now)
Database tooling will live under `packages/db`. Once ORM tooling is available, push the schema with:
```bash
pnpm db:push
```
For the current prototype you can skip this step.

## 5. Run the Development Environment
Start the Tauri + React development server:
```bash
pnpm tauri dev
```
This command launches the React frontend alongside the Tauri shell for live-reload development.

## 6. Build a Production Bundle (Optional)
To create a desktop bundle for distribution, run:
```bash
pnpm tauri build
```
The compiled application will be emitted to the `src-tauri/target/` directory.

## 7. Troubleshooting Tips
- If Rust crates fail to compile, run `rustup update` to install the latest stable toolchain.
- On macOS, install Xcode Command Line Tools with `xcode-select --install` if Tauri cannot find required libraries.
- On Linux, ensure that WebKitGTK and other dependencies listed in the Tauri docs are installed before building.

Following these steps should get you up and running with the Useful Web project on your local machine.
