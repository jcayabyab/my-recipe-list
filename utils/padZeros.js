// this function turns an input string, normally a
// number, into a number padded with zeros.
// e.g. 123 => "0012300"
const padZeros = inputNum => "00" + inputNum + "00";

module.exports = padZeros;
// this is also valid:
// module.exports = inputNum => "00" + inputNum + "00";
