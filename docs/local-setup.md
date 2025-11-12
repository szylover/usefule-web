# Local Development Setup

Follow the steps below to run the Usefule Web desktop portal locally.

## 1. Install Prerequisites
- **Rust toolchain**: Install via [rustup](https://rustup.rs/). Ensure the `cargo` command is available in your shell.
- **Node.js**: Install Node.js version 18 or later. Using a version manager such as `nvm` is recommended.
- **Package manager**: Install either `pnpm` (preferred) or `yarn`. Instructions assume `pnpm`.
- **Tauri dependencies**: Refer to the [official Tauri prerequisites guide](https://tauri.app/v1/guides/getting-started/prerequisites/) for any additional system libraries required by your operating system.

## 2. Clone the Repository
```bash
git clone https://github.com/<your-org>/usefule-web.git
cd usefule-web
```

## 3. Install JavaScript Dependencies
```bash
pnpm install
```
This command downloads all Node.js dependencies defined in the workspace manifests.

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

Following these steps should get you up and running with the Usefule Web project on your local machine.
