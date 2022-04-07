import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import { withStyles } from "@material-ui/styles";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";

class Pallete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 500,
      colorMode: "hex",
    };

    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level }); // Same as doing this.setState({ level:: level });
  }

  changeFormat(colorMode) {
    this.setState({ colorMode });
  }

  render() {
    const { colors, id } = this.props.palette;
    const { classes } = this.props;
    const { level, colorMode } = this.state;
    const ColorBoxes = colors[level].map((color, idx) => (
      <ColorBox
        background={color[colorMode]}
        name={color.name}
        key={color.id}
        paletteId={id}
        id={color.id}
        showingFullPalette
      />
    ));

    return (
      <div className={classes.Palette}>
        {/* Navbar goes here */}
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        <div className={classes.PaletteColors}>
          {/* Bunch of color boxes */}
          {ColorBoxes}
        </div>
        {/* footer eventually */}
        <PaletteFooter palette={this.props.palette} />
      </div>
    );
  }
}

export default withStyles(styles)(Pallete);
