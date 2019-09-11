Creatella React Native Test
====
This is test challenge project done in React Native.

Platforms and Tools
----
React Native and React Redux.

How to run project
----
- Open command line interface
- Run command "npm install" to install node modules.

To start the server

- Run command "npm start" to start the server.

To run React Native project

- Server must be running in order to view products.
- Run command "ipconfig" and copy IPv4 address
- Change the BASE_URL in the file src/constants/GlobalConstants and replace IPv4 address with IP_Address in the Url.
- Open another command line interface.
- Run command "react-native run-android/ios" to run React Native project.

Features
----

- Products are displayed in a grid.
- Products can be sort by id, size and price.
- Load more products when user reaches near the end of the list.
- Loading ... animation shown while loading the next batch of products.
- When there are no more products in the list, there is a footer that shows "~ end of catalogue ~"

### Ads

- After every 20 products, an advertisement has been append with product.
