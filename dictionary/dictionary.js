const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  var dictionary = [];
  const fileStream = fs.createReadStream("./dictionary/rgb565_dictionary.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const colour = line.split("\t");
    dictionary.push(colour[1]);
  }

  return dictionary;
}

module.exports = async function() {
  _dict = await processLineByLine();

  return {
    getRGB565FromHex(hex) {
      // Break the hex value into RGB
      var r_hex = hex.substring(0, 2);
      var g_hex = hex.substring(2, 4);
      var b_hex = hex.substring(4, 6);

      // Convert the hex based RGB values to decimal
      var r_dec = parseInt(r_hex, 16);
      var g_dec = parseInt(g_hex, 16);
      var b_dec = parseInt(b_hex, 16);

      // Apply bit mask to the r, g, and b values in order to convert from
      // RGB888 to RGB565 (in order to be compatible with our colour dictionary)
      // Retrieved from: https://stackoverflow.com/questions/11471122/rgb888-to-rgb565-bit-shifting
      var rgb =
        ((r_dec & 0b11111000) << 8) |
        ((g_dec & 0b11111100) << 3) |
        (b_dec >> 3);

      console.log(rgb);
      return _dict[rgb];
    }
  };
};
