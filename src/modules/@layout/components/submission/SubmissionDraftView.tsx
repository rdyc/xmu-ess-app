import { DialogConfirmation } from '@layout/components/dialogs';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Button, Card, CardActions, CardContent, CardHeader, ListItemIcon, ListItemText, Menu, MenuItem, TextField } from '@material-ui/core';
// import AssignmentIcon from '@material-ui/icons/AssignmentTurnedIn';
import ArchiveIcon from '@material-ui/icons/Archive';
import DraftsIcon from '@material-ui/icons/Drafts';
import * as React from 'react';
import { DraftType } from './DraftType';

import { SubmissionDraftProps } from './SubmissionDraft';

export const SubmissionDraftView: React.ComponentType<SubmissionDraftProps> = props => (
  <React.Fragment>
    <Card square>
      <CardHeader title={props.title} subheader={props.subheader} />
      
      {
        !props.formikProps.isSubmitting &&
        props.formikProps.status &&
        <CardContent>
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label="Date"
            value={props.formikProps.status.date || 'N/A'}
          />

          {
            !props.formikProps.status.Code ?
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label="Correlation ID"
              value={props.formikProps.status.id || 'N/A'}
            /> :
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label="Code"
              value={props.formikProps.status.Code || 'N/A'}
            /> 
          }

          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            multiline
            label="Status"
            value={props.intl.formatMessage({id: !props.formikProps.status.Code ? props.formikProps.status.message : props.formikProps.status.Message})}
          />
        </CardContent>
      }
      
      <CardActions>
        <Button
          fullWidth
          type="reset"
          color="secondary"
          disabled={!props.formikProps.dirty || props.formikProps.isSubmitting || props.disableButtons}
        >
          {props.buttonLabelProps.reset}
        </Button>

        <Button
          fullWidth
          type="button"
          color="primary"
          aria-owns="save-as"
          aria-haspopup="true"
          disabled={props.formikProps.isSubmitting || props.disableButtons}
          onClick={props.handleSaveOption}
        >
          {props.intl.formatMessage(layoutMessage.action.saveAs)}
        </Button>
        <Menu id="save-as" anchorEl={props.anchor} open={props.saveOptionOpen} onClose={props.handleSaveOption}>
          <MenuItem color="secondary" onClick={() => {
            props.handleSaveType(DraftType.draft);
            props.setOpen();
          }}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText inset primary={props.intl.formatMessage(layoutMessage.action.draft)} />
          </MenuItem>
          <MenuItem color="primary"
            disabled={props.isFinal}
            onClick={() => {
              props.handleSaveType(DraftType.final);
              props.setOpen();          
            }}
          >
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText inset primary={props.intl.formatMessage(layoutMessage.action.final)} />
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>

    {
      !props.formikProps.isSubmitting &&
      <DialogConfirmation
        title={props.saveType === DraftType.draft ? props.confirmationDialogDraftProps.title : props.confirmationDialogFinalProps.title}
        content={props.saveType === DraftType.draft ? props.confirmationDialogDraftProps.message : props.confirmationDialogFinalProps.message}
        labelCancel={props.saveType === DraftType.draft ? props.confirmationDialogDraftProps.labelCancel : props.confirmationDialogFinalProps.labelCancel}
        labelConfirm={props.saveType === DraftType.draft ? props.confirmationDialogDraftProps.labelConfirm : props.confirmationDialogFinalProps.labelConfirm}
        isOpen={props.isOpenDialog}
        fullScreen={props.saveType === DraftType.draft ? props.confirmationDialogDraftProps.fullScreen : props.confirmationDialogFinalProps.fullScreen}
        onClickCancel={props.handleOnCanceled}
        onClickConfirm={props.handleOnConfirmed}
      />
    }
  </React.Fragment>
);