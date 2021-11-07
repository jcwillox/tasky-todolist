import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { Form, Formik } from "formik";
import { useAuth } from "./AuthContext";
import FormikPasswordField from "./FormikPasswordField";
import { LoadingButton } from "@mui/lab";
import { ChangePasswordConfirmSchema } from "../schemas";
import { DialogProps } from "../utils/popup-state";
import { ApiError } from "../utils/fetch";
import { useAsyncError } from "../hooks/use-async";

const ChangePasswordDialog = (props: DialogProps) => {
  const [showErr, setShowErr] = useState(false);
  const wrapAsync = useAsyncError();
  const { changePassword } = useAuth();
  return (
    <Dialog fullWidth {...props}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            confirmPassword: ""
          }}
          validationSchema={ChangePasswordConfirmSchema}
          onSubmit={async values => {
            await wrapAsync(
              changePassword(values)
                .then(props.onClose)
                .catch(err => {
                  if (err instanceof ApiError && err.res.status === 401) {
                    setShowErr(true);
                  } else {
                    throw err;
                  }
                })
            );
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {showErr && (
                <Alert severity="error" sx={{ mb: 0.5 }}>
                  Incorrect current password
                </Alert>
              )}
              <FormikPasswordField
                autoFocus
                name="password"
                label="Current Password"
                margin="dense"
                placeholder="Current Password"
                autoComplete="current-password"
                onBlur={undefined}
                fullWidth
              />
              <FormikPasswordField
                name="newPassword"
                label="New Password"
                margin="dense"
                placeholder="New Password"
                autoComplete="new-password"
                fullWidth
              />
              <FormikPasswordField
                name="confirmPassword"
                label="Confirm Password"
                margin="dense"
                placeholder="Confirm Password"
                autoComplete="new-password"
                fullWidth
              />
              <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {(isSubmitting && "") || "Change Password"}
                </LoadingButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
