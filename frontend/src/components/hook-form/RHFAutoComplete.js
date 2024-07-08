// controlled input component which use reactive form which is modified version of normal text field components
import PropTypes from "prop-types";

// form
// here useFormContext is used to get the form context from the parent component
import { useFormContext, Controller } from "react-hook-form";

// @material-ui/core components
import { Autocomplete, TextField } from "@mui/material";

// prop-types is a library for typechecking of props genrally used for validation
RHFAutoComplete.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.node,
}

export default function RHFAutoComplete({ name, label, helperText, ...other }) {

    const { control, setValue } = useFormContext();

    return (
        <Controller name={name} control={control} render={({ field, fieldState: { error } }) => (
            <Autocomplete {...field} fullWidth
                value={typeof field.value === "number" && field.value === 0 ? "" : field.value}
                onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
                error={!!error}  {...other}
                renderInput={(params) => (
                    <TextField label={label} error={!!error} helperText={error ? error.message : helperText} {...params} />
                )}
            />
        )} />
    )
}