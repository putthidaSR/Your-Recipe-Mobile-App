### Overview of Project Structure

```
│
├── android
├── ios
├── src
│   ├── assets
│   ├── components
│   ├── routers
│   ├── screens
├── App.js
├─ .eslintrc.js
├─ index.js
├─ package.json
```
> **Note**: Only important files and directories are listed in the project structure above. When you download the source code of the project, you will see additional files.

- `src/ `: store all components in the application
 - `src/App.js`: The first component that the application will render when the app is loaded.
 - `src/assets`: store static elements (ie: image, icon -etc)
 - `src/components`: store individual components/objects
 - `src/router`: store components to render screen navigation. *Note: This project is using [react-navigation](https://reactnavigation.org/ "react-navigation") for screen navigation feature.*
 - `src/screens`: store parent components of each application screen

- `index.js`: The entry point of the application. This is where we will call src/App.js to load all components.

- `package.json`: This file contains all the dependencies used in the application.

- `android/`: This directory contains all the code that is specifically for native Android implementation. Any code changes in this directory will only affect Android device.
> Note: The code in this directory are auto-generated when we first initialize and create the react-native project with [React Native CLI](https://reactnative.dev/docs/environment-setup).

- `ios/`: This directory contains all the code that is specifically for native iOS Development. Any code changes in this directory will only affect iOS device.
> Note: The code in this directory are auto-generated when we first initialize and create the react-native project with [React Native CLI](https://reactnative.dev/docs/environment-setup).

-----

### Software Requirement
- [Android Studio](https://developer.android.com/studio "Android Studio") (at least v3.5)
- [Xcode](https://developer.apple.com/xcode/ "Xcode") (always update to the latest version)
- IDE of your choice. Recommended:
	- [Visual Studio Code 2](https://code.visualstudio.com/ "Visual Studio Code 2")

### Hardware Requirement
- macOS is required to run iOS app

### Dependencies Installation
The dependencies below are required to install on your local machine prior to building and running React-Native app. 
- [Node](https://nodejs.org/en/ "Node") (at least v12)
- [Watchman](https://facebook.github.io/watchman/ "Watchman") (v4.9.0)
- [React Native CLI ](https://www.npmjs.com/package/react-native-cli "React Native CLI ")(v2.0.1)
- [React Native](https://www.npmjs.com/package/react-native "React Native") (v0.62.2)
- Java Development Kit (JDK) 8

> **NOTE**: Please use the same version as listed above (if possible) to ensure the app will run properly.

> For third party libraries and dependencies that are used inside the project, please see **package.json** file.

----

### Building And Running The App
#### Getting Started
Navigate to the root of the project and install all the dependencies:
- Run: `npm install`
- Run: `cd ios && pod install && cd ..`
> For third party libraries and dependencies that are used inside the project, please see **package.json** file.

- Start the packager: `npm start`

#### Run the App in client root directory
- Android: `react-native run-android`
- iOS: `react-native run-ios`

#### Debug the App
- Android: `⌘M` (Mac) or `Ctrl+M` (Linux or Windows)
- iOS: `⌘D` (Mac) or `Ctrl+M` (Linux or Windows)

> Resource: https://facebook.github.io/react-native/docs/debugging

