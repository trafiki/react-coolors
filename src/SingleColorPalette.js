import React, { Component } from "react";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import { withStyles } from "@material-ui/styles";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorMode: "hex",
    };

    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.changeFormat = this.changeFormat.bind(this);
  }

  // Return all shades of given color
  gatherShades(palette, colorToFilter) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilter)
      );
    }

    return shades.slice(1);
  }

  changeFormat(colorMode) {
    this.setState({ colorMode });
  }

  render() {
    const { classes } = this.props;

    /* NOTE: We can use the Palette.css classes here without importing becuase, we always go through the Palette.js component before getting
    here(SingleColorPalette.js) and the browser would have already saved Palette.css when it loaded Palette.js so the class name is not alien
    to the browser anymore */

    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[this.state.colorMode]}
        showingFullPalette={false}
      />
    ));

    return (
      <div className={`SingleColorPalette ${classes.Palette}`}>
        <Navbar handleChange={this.changeFormat} />
        <div className={classes.PaletteColors}>
          {colorBoxes}
          <div className={`${classes.goBack} colorBox`}>
            <Link to={`/palette/${this.props.palette.id}`}>Go back</Link>
          </div>
        </div>
        <PaletteFooter palette={this.props.palette} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
