// {
//   paletteName: "Material UI Colors",
//   id: "material-ui-colors",
//   emoji: "🎨",
//   colors: [
//     { name: "red", color: "#F44336" },
//     { name: "pink", color: "#E91E63" },
//     { name: "purple", color: "#9C27B0" },
//     { name: "deeppurple", color: "#673AB7" },
//     { name: "indigo", color: "#3F51B5" },
//     { name: "blue", color: "#2196F3" },
//     { name: "lightblue", color: "#03A9F4" },
//     { name: "cyan", color: "#00BCD4" },
//     { name: "teal", color: "#009688" },
//     { name: "green", color: "#4CAF50" },
//     { name: "lightgreen", color: "#8BC34A" },
//     { name: "lime", color: "#CDDC39" },
//     { name: "yellow", color: "#FFEB3B" },
//     { name: "amber", color: "#FFC107" },
//     { name: "orange", color: "#FF9800" },
//     { name: "deeporange", color: "#FF5722" },
//     { name: "brown", color: "#795548" },
//     { name: "grey", color: "#9E9E9E" },
//     { name: "bluegrey", color: "#607D8B" }
//   ]
// }

// https://gka.github.io/chroma.js/
import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {},
  };

  // Set every element in levels as keys in newPalette.colors object and set their values to an empty array
  for (let level of levels) {
    newPalette.colors[level] = [];
  }

  // Take each color in starterPalette (which is of the form  { name: "yellow", color: "#FFEB3B" }), get a ten step variation of each, and
  // add it to the newPalette.colors object
  for (let color of starterPalette.colors) {
    // We're reversing becuae the order we get by default goes from dark to light and we want it to go from light to dark
    let scale = getScale(color.color, 10).reverse();

    // In for (let i in scale), i is the index of the item while in for (let i of scale), i is the item itself. Note that scale is an array
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        // The first push will be of the form 50: [{lightest-color}], second push will be 100: [{second-push}]..till 900: [{darkest-color}]
        // So each level of the newPalette.colors(ie 50, 100, 200 etc) contains hex code for each of the 20 colors in the starterPalette.
        // eg 50: [contains hex code for the lightest version of all the 20 colurs ] becuase we keep pushing the approaritte color to it's
        // appropriate level ie lightest colours keeps getting pushed to 50 while darkest colors keep getting pushed to 900 and we do this
        // for all the colors in starterPalette.colors.
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"), // relace space with -
        hex: scale[i],
        rgb: chroma(scale[i]).css(), // .css() returns an rgb version of the color passed
        rgba: chroma(scale[i]).css("rgba"),
      });
    }
  }

  return newPalette;
}

function getRange(hexColor) {
  const end = "#fff";

  // Here we go from a darker version of the color passed to the color passed to white
  return [
    chroma(hexColor)
      .darken(1.4) // darkens a color
      .hex(),
    hexColor,
    end,
  ];
}

/*
You can pass an array of colors to chroma.scale. Any color that can be read by chroma() will work here, too. If you pass more than two colors,
they will be evenly distributed along the gradient. eg chroma.scale(['yellow', 'blue']); returns a gradient moving from yellow to blue

scale.mode(mode)
As with chroma.mix, the result of the color interpolation will depend on the color mode in which the channels are interpolated. The default
mode is RGB: This is often fine, but sometimes, two-color RGB gradients goes through kind of grayish colors, and Lab interpolation produces
better results: chroma.scale(['yellow', 'navy']).mode('lab'); returns a yellow to navy gradient that looks smoother that the default

You can call scale.colors(n) to quickly grab n equi-distant colors from a color scale. If called with no arguments, scale.colors returns the
original array of colors used to create the scale. chroma.scale(['white', 'blue']).colors(5); returns 5 colors moving from white to blue
*/

// This gives us 10 colours based off of an input colour
function getScale(hexColor, numberOfColors) {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export { generatePalette, getScale };
