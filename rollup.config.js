import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

export default {
  input: pkg.module,
  output: [
    {
      file: pkg.main,
      format: "cjs"
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**"
    })
  ]
};
