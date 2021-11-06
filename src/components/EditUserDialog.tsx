import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { Form, Formik } from "formik";
import { useAuth } from "./AuthContext";
import { EditUserSchema } from "../schemas";
import FormikTextField from "./FormikTextField";
import { LoadingButton } from "@mui/lab";
import { DialogProps } from "../utils/popup-state";
import { ApiValidationError } from "../utils/fetch";
import { useAsyncError } from "../hooks/use-async";

const EditUserDialog = (props: DialogProps) => {
  const wrapAsync = useAsyncError();
  const { editUser, user } = useAuth();
  return (
    <Dialog fullWidth {...props}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: user!.name,
            username: user!.username
          }}
          validationSchema={EditUserSchema}
          onSubmit={async (values, { setFieldError }) => {
            // included only changed values
            for (const key in user) {
              if (values[key] === user[key]) {
                delete values[key];
              }
            }
            await wrapAsync(
              editUser(values)
                .then(props.onClose)
                .catch(err => {
                  if (err instanceof ApiValidationError) {
                    err.errors.forEach(item => {
                      setFieldError(item.path, item.message);
                    });
                  } else {
                    throw err;
                  }
                })
            );
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormikTextField
                autoFocus
                name="name"
                margin="dense"
                placeholder="John Smith"
                fullWidth
              />
              <FormikTextField
                name="username"
                margin="dense"
                placeholder="john.smith"
                fullWidth
              />
              <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {(isSubmitting && "") || "Edit"}
                </LoadingButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
