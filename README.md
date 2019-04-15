# HaptiJordon

HaptiJordon is a wrist-worn wearable technology prototype with the goal of conveying colour information via haptic feedback.
This repository contains the user-interface and monitoring software responsible for supplying input to the hardware device, available at [HaptiJordon - Arduino](https://github.com/jordones/haptijordon-arduino)

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `node index.js` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [body-parser](https://github.com/expressjs/body-parser) - Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
- [serialport](https://github.com/node-serialport/node-serialport) - API for interacting with serial devices

## Application Structure

- `index.js` - The entry point to our application. This file defines our express server. It also requires the routes and models we'll be using in the application.
- `arduino/` - This folder contains configuration for interacting with the arduino hardware.
- `dictionary/` - This folder contains our colour name dictionary from [Flatla et al.][1].
- `view/` - This folder contains the user-interface portion of the application.

## References

David R. Flatla, Alan R. Andrade, Ross D. Teviotdale, Dylan L. Knowles, and Craig Stewart. 2015. ColourID: Improving Colour Identification for People with Impaired Colour Vision. In Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems (CHI '15). ACM, New York, NY, USA, 3543-3552. DOI: https://doi.org/10.1145/2702123.2702578

[1]: https://doi.org/10.1145/2702123.2702578
