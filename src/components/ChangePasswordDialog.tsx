import {
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
