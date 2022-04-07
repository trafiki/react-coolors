import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import styles from "./styles/ColorBoxStyles";
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";

import "./ColorBox.css";

class ColorBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };

    this.changeCopystate = this.changeCopystate.bind(this);
  }

  changeCopystate() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    const { name, background, paletteId, id, showingFullPalette, classes } =
      this.props;
    const { copied } = this.state;

    return (
      <div style={{ background }} className={classes.ColorBox}>
        <div
          style={{ background }}
          className={classNames(classes.copyOverlay, {
            [classes.showOverlay]: copied,
          })}
        />
        <div
          className={classNames(classes.copyMsg, {
            [classes.showCopyMsg]: copied,
          })}
        >
          <h1>Copied</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <CopyToClipboard text={background} onCopy={this.changeCopystate}>
            <button className={classes.copyButton}>Copy</button>
          </CopyToClipboard>
        </div>{" "}
        {/* e.stopPropagation() stops this link from firing events on parent elements when clicked */}{" "}
        {showingFullPalette && (
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ColorBox);
