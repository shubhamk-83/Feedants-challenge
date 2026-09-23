const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "node_modules",
  "nativewind",
  "dist",
  "metro",
  "transformer.js"
);

if (!fs.existsSync(filePath)) {
  console.error("NativeWind transformer not found.");
  process.exit(1);
}

let content = fs.readFileSync(filePath, "utf8");

const issue =
  "`require('${config.nativewind.output}');`";

const fix =
  "`require('${config.nativewind.output.replace(/\\\\/g, '\\\\\\\\')}');`";

if (content.includes(fix)) {
  console.log("NativeWind Windows fix already applied.");
  process.exit(0);
}

if (!content.includes(issue)) {
  console.log("Expected NativeWind transformer code was not found.");
  process.exit(1);
}

content = content.replace(issue, fix);

fs.writeFileSync(filePath, content, "utf8");

console.log("NativeWind Windows fix applied successfully.");