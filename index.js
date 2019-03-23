const Serial = require("./arduino/serial.js");

const SerialConn = Serial();

setInterval(() => {
  console.log("*** Sending data to arduino *** ");
  SerialConn.write("writing data from index");
}, 3000);
