Creatella React Native Test
====
This is test challenge project done in React Native.

Platforms and Tools
----
React Native and React Redux.

How to Run Project
----
- Open command line interface
- Run command "npm install"

To start the server

- Run command "npm start"

To Run React Native Project

- Server must be running in order to view Products.
- run command "ipconfig" and copy IPv4 Address
- Change the BASE_URL in the file src/constants/GlobalConstants and replace IPv4 Address with IP_Address
- Open another command line interface
- Run command "react-native run-android/ios"

Features
----

- products are displayed in a grid.
- Products can be sort by id, size and price.
- Load more products when user reaches near the end of the list.
- Loading ... animation shown while loading the next batch of Products.
- when there are no more products in the list, there is a footer that shows "~ end of catalogue ~"

### Ads

- after every 20 products, an advertisement has been append with Product.
