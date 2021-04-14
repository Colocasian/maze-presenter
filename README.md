# maze-presenter

Webpack project which uses the
[`maze-generator-two`](https://github.com/Colocasian/maze-generator-two) to
generate mazes on a Canvas, which you can also right-click to render as PNG.

## Building

### Prerequisites

* Yarn

### Build instructions

To build the static bundle (warning: takes some time to do due to the SVG-to-PNG
conversion and subsequent PNG compression),
```sh
yarn build
```

A static bundle will be generated in the `dist/` directory. Before building a
new bundle, remove the `dist/` directory if it already exists.
