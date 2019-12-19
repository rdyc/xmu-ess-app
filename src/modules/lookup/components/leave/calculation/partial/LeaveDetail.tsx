import { GlobalFormat } from '@layout/types';
import { ILookupLeaveList } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {
  isDetailOpen: boolean;
  data: ILookupLeaveList;
  handleClosed: () => void;
}

type AllProps 
  = IOwnProps 
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const leaveDetail: React.SFC<AllProps> = props => {
  const { intl, isDetailOpen, data, handleClosed } = props;

  const render = (
    <Dialog
      open={isDetailOpen}
      onClose={handleClosed}
      scroll="paper"
      onBackdropClick={handleClosed}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>{data.name}</DialogTitle>
      <List>
        {
          data.dates.length > 1 ?

          data.dates.map(item => 
            <ListItem key={item.uid}>
              <ListItemText primary={intl.formatDate(item.leaveDate, GlobalFormat.Date)} secondary={item.leaveDescription} />
            </ListItem>  
          )
          :
          <ListItem>
            <ListItemText primary={intl.formatMessage(lookupMessage.leave.field.noDate)} />
          </ListItem>
        } 
      </List>
    </Dialog>
  );

  return render;
};

export const LeaveDetail = compose<AllProps, IOwnProps>(
  injectIntl,
  withStyles(styles)
)(leaveDetail);