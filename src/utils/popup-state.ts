import { bindMenu, usePopupState } from "material-ui-popup-state/hooks";
import { PopupState } from "material-ui-popup-state/core";
import { DialogProps as MuiDialogProps } from "@mui/material";

/**
 * Creates props for a `Dialog` component.
 *
 * @param {object} popupState the argument passed to the child function of
 * `PopupState`
 */
export const bindDialog = (
  popupState: PopupState
): Omit<ReturnType<typeof bindMenu>, "anchorEl"> => {
  const state = bindMenu(popupState);
  delete state.anchorEl;
  return state;
};

export const usePopoverState = (id: string) => {
  return usePopupState({ variant: "popover", popupId: id });
};

export interface DialogProps extends MuiDialogProps {
  onClose: () => void;
}
