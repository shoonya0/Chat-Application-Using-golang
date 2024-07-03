// controlled input component which use reactive form which is modified version of normal text field components
import PropTypes from "prop-types";

// form
// here useFormContext is used to get the form context from the parent component
import { useFormContext, Controller } from "react-hook-form";

// @material-ui/core components
import { TextField } from "@mui/material";

// prop-types is a library for typechecking of props genrally used for validation
RHFTextField.propTypes = {
    name: PropTypes.string,
    helperText: PropTypes.node,
}

export default function RHFTextField({ name, helperText, ...other }) {

    const { control } = useFormContext();

    return (
        <Controller name={name} control={control} render={({ field, fieldState: { error } }) => (
            <TextField {...field} fullWidth
                value={typeof field.value === "number" && field.value === 0 ? "" : field.value}
                error={!!error} helperText={error ? error.message : helperText} {...other}
            />
        )} />
    )
}