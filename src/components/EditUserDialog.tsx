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

type EditUserProps = {
  open: boolean;
  onClose: () => void;
};

const EditUserDialog = ({ open, onClose }: EditUserProps) => {
  const { editUser, user } = useAuth();

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: user!.name,
            username: user!.username
          }}
          validationSchema={EditUserSchema}
          onSubmit={async values => {
            await editUser(values);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormikTextField
                autoFocus
                name="name"
                label="Name"
                margin="dense"
                placeholder="John Smith"
                fullWidth
              />
              <FormikTextField
                name="username"
                label="Username"
                margin="dense"
                placeholder="john.smith"
                fullWidth
              />
              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
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
