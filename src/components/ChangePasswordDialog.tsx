import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from "@mui/material";
import { Form, Formik } from "formik";
import { useAuth } from "./AuthContext";
import FormikPasswordField from "./FormikPasswordField";
import { LoadingButton } from "@mui/lab";
import { ChangePasswordConfirmSchema } from "../schemas/register";

type ChangePasswordProps = {
  open: boolean;
  onClose: () => void;
};

const ChangePasswordDialog = ({ open, onClose }: ChangePasswordProps) => {
  const { changePassword } = useAuth();
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
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
            await changePassword(values);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                <FormikPasswordField
                  autoFocus
                  name="password"
                  label="Current Password"
                  margin="dense"
                  placeholder="Current Password"
                  fullWidth
                  variant="standard"
                  autoComplete="current-password"
                />
                <FormikPasswordField
                  name="newPassword"
                  label="New Password"
                  margin="dense"
                  placeholder="New Password"
                  fullWidth
                  variant="standard"
                  autoComplete="new-password"
                />
                <FormikPasswordField
                  name="confirmPassword"
                  label="Confirm Password"
                  margin="dense"
                  placeholder="Confirm Password"
                  fullWidth
                  variant="standard"
                  autoComplete="new-password"
                />
              </Stack>

              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
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
