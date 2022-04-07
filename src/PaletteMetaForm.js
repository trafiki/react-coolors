import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

export default function PaletteMetaForm(props) {
  React.useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const [stage, setStage] = React.useState("form");
  const [newPaletteName, setnewPaletteName] = React.useState("");

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleChange = (e) => {
    setnewPaletteName(e.target.value);
  };

  const savePalette = (emoji) => {
    let newPalette = {
      newPaletteName: newPaletteName,
      emoji: emoji.native,
    };
    props.handleSubmit(newPalette);
    setStage("");
  };

  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={props.hideForm}>
        <DialogTitle id="form-dialog-title">Pick a Palette Emoji</DialogTitle>
        <Picker set="apple" onSelect={savePalette} />
      </Dialog>
      <Dialog
        open={stage === "form"}
        onClose={props.hideForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm
          onSubmit={() => {
            setStage("emoji");
          }}
        >
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new palette. make sure it's unique
            </DialogContentText>

            <TextValidator
              label="Palette Name"
              name="newPaletteName"
              value={newPaletteName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["This field is required", "Name already taken"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.hideForm} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
