import React from 'react'
import { Alert, Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from '../../components/hook-form/FormProvider'
import RHFTextField from '../../components/hook-form/RHFTextField'
import RHFAutoComplete from '../../components/hook-form/RHFAutoComplete'

// dummy list
const MEMBERS = ["Person 1", "Person 2", "Person 3", "Person 4"]

// this gives us the slide effect when the dialog is opened
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupForm = ({ handleClose }) => {
  // yup is used to validate the form
  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    members: Yup.array().min(2, "atleast 2 members required")
  });

  const defaultValues = {
    title: "",
    members: []
  };

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const {
    // reset, watch, setError, 
    handleSubmit,
    formState: {
      errors,
      // isSubmitting, isSubmitSuccessful ,isValid
    },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // here comes api call
      console.log("Data ->", data);
    } catch (error) {
      console.log("error ->", error);
    }
  }

  // here we are returning jsx
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

      <Stack spacing={3}>

        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFTextField name="title" label="Title" />
        <RHFAutoComplete name="members" label="Members" multiple freeSolo options={MEMBERS.map((option) => option)} ChipProps={{ size: "medium" }} />
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="end">
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  )

}

const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} TransitionComponent={Transition} keepMounted sx={{ p: 4 }}>
      {/* Title */}
      <DialogTitle sx={{ mb: 3 }}>Create New Group</DialogTitle>
      {/* Content */}
      <DialogContent>
        {/* form */}
        <CreateGroupForm handleClose={handleClose} />

      </DialogContent>
    </Dialog>
  )
}

export default CreateGroup