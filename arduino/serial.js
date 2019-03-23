const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const portName = "/dev/cu.usbserial-1420";
const baudRate = 57600;

module.exports = function() {
  let _port = new SerialPort(portName, {
    baudRate: baudRate,
    autoOpen: false,
    flowControl: false,
    parser: new Readline("\r\n")
  });

  _port.open(function(err) {
    if (err) {
      return console.log("Error opening port: ", err.message);
    }

    console.log("port open!");
  });

  _port.on("error", function(err) {
    console.log("Error: ", err.message);
  });

  _port.on("open", function() {
    console.log("open event called");
    _port.write("we open");
  });

  _port.on("data", function(data) {
    console.log("Data:", data, data.toString("utf8"));
  });

  return {
    write(message) {
      _port.write(message);
    }
  };
};
