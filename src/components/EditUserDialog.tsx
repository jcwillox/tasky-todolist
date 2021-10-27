import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
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
  console.log(user?.name);
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: "",
            username: ""
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
                  label="New Name"
                  margin="dense"
                  placeholder="John Smith"
                  variant="standard"
                />
                <FormikTextField
                  autoFocus
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
