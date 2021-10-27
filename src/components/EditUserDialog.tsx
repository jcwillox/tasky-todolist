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
import { EditUserSchema } from "../schemas/register";
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
              <Stack spacing={2}>
                <FormikTextField
                  autoFocus
                  name="name"
                  label="New Name"
                  margin="dense"
                  placeholder="John Smith"
                  variant="standard"
                />
                <FormikTextField
                  autoFocus
                  name="username"
                  label="New Username"
                  margin="dense"
                  placeholder="John Smith"
                  variant="standard"
                />
              </Stack>

              <DialogActions>
                <Button onClick={onClose}>Discard</Button>
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
