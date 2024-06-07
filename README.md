# OrderMe

OrderMe is a cross-platform application that allows users to order drinks at the table when they come to a bar. The app is built using React and the Ionic framework, with Firebase for database and authentication.

![Ionic Framework](https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Ionic-logo-landscape.svg/1200px-Ionic-logo-landscape.svg.png)
![Firebase](https://upload.wikimedia.org/wikipedia/commons/b/bd/Firebase_Logo.png)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Order drinks directly from your table
- Real-time order updates
- User authentication
- QR code scanning for table identification

## Installation

To get a local copy up and running follow these steps:

1. Clone the repository
    ```sh
    git clone https://github.com/SinanovicEdis/OrderMe_TVA.git
    ```
2. Navigate to the project directory
    ```sh
    cd OrderMe
    ```
3. Install the dependencies
    ```sh
    npm install
    ```
4. Start the development server
    ```sh
    npm start
    ```

## Usage

1. Open the app in your browser.
2. Sign up or log in using your credentials.
3. Scan the QR code at your table to start ordering.
4. Select your desired drinks and place the order.
5. Track your order status in real-time.

## Building for Mobile

To build the app for mobile platforms, follow these steps:

1. Install the Ionic CLI
    ```sh
    npm install -g @ionic/cli
    ```
2. Add the desired platform (iOS or Android)
    ```sh
    ionic cap add ios
    ionic cap add android
    ```
3. Build the app
    ```sh
    ionic build
    ionic cap copy
    ionic cap sync
    ```
4. Open the project in the respective IDE (Xcode for iOS, Android Studio for Android)
    ```sh
    ionic cap open ios
    ionic cap open android
    ```

## Contributing

Contributions are what make the open-source community such an amazing place to be, learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Edis Sinanovic - [edis.sinanovic1@student.um.si](mailto:edis.sinanovic1@student.um.si)
Jure Kozole - [jure.kozole1@student.um.si](mailto:jure.kozole1@student.um.si)
