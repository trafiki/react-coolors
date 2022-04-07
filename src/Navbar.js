import React, { Component } from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NavbarStyles';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorMode: "hex",
      open: false
    }

    this.handleModeChange = this.handleModeChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleModeChange(e) {
    this.setState({ colorMode: e.target.value, open: true })
    this.props.handleChange(e.target.value);
  }

  closeSnackbar() {
    this.setState({ open: false });
  }

  render() {
    const { level, changeLevel, classes } = this.props;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to='/'>reactcolorpicker</Link>
        </div>
        {this.props.level && (
          <div className="slider-container">
            <span>Level: {level}</span>
            <div className={classes.slider}>
              {/*NOTE: onAfterChange passes in the value automatically to whatver method we provide */}
              <Slider
                defaultValue={level}
                max={900}
                min={100}
                step={100}
                onAfterChange={changeLevel}
                />
            </div>
          </div>
        )}

        <div className={classes.selectContainer}>
          <Select
            onChange = {this.handleModeChange}
            value = {this.state.colorMode}
            >
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>

        <Snackbar
          anchorOrigin={{vertical: "bottom", horizontal: "left"}}
          open={this.state.open}
          autoHideDuration= {3000}
          onClose={this.closeSnackbar}
          message={<span id="message-id">Format changed to {this.state.colorMode.toUpperCase()}</span>}
          contentProps = {{ //NOTE: This is for accesibility
            "aria-describedby": "message-id"
          }}
          action={[
            <IconButton onClick={this.closeSnackbar} color="inherit" key='close' aria-label='close'>
              <CloseIcon />
            </IconButton>
          ]}
          />
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);