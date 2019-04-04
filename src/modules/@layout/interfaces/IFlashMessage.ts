import { SnackbarOrigin } from '@material-ui/core/Snackbar';

export interface IFlashMessage {
  message: string;
  origin?: SnackbarOrigin;
  duration?: number;
}