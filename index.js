const fs = require("fs");
const imports = { /* imports go here */ };
const compiled = new WebAssembly.Module(
  fs.readFileSync(__dirname + "/build/optimized.wasm")
);

Object.defineProperty(module, "exports", {
  get: () => new WebAssembly.Instance(compiled, imports).exports,
});