import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorPickerFormStyles";

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentColor: "#3F51B5",
      newName: "",
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return this.props.colors.every(
        ({ color }) => color !== this.state.currentColor
      );
    });
  }

  render() {
    const { paletteFull, addNewColor, classes } = this.props;

    const handleColorChange = (newColor) => {
      this.setState({ currentColor: newColor.hex });
    };

    const handleNameChange = (e) => {
      this.setState({ newName: e.target.value });
    };

    const handleSubmit = () => {
      const newColor = {
        name: this.state.newName,
        color: this.state.currentColor,
      };
      addNewColor(newColor);
      this.setState({ newName: "" });
    };

    return (
      <div>
        <ChromePicker
          color={this.state.currentColor}
          onChangeComplete={handleColorChange}
          className={classes.picker}
        />

        <ValidatorForm
          onSubmit={handleSubmit}
          ref="form"
          className={classes.validatorForm}
          instantValidate={false}
        >
          <TextValidator
            name="newName"
            value={this.state.newName}
            className={classes.colorNameInput}
            variant="filled"
            margin="normal"
            placeholder="Color Name"
            onChange={handleNameChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "this field is required",
              "Color name already taken",
              "Color already in the palette",
            ]}
          />
          <Button
            disabled={paletteFull}
            type="submit"
            variant="contained"
            color="primary"
            style={{
              backgroundColor: paletteFull ? "grey" : this.state.currentColor,
            }}
            className={classes.addColor}
          >
            {paletteFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
