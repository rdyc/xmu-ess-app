import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { layoutMessage } from '@layout/locales/messages';
import {
  AppBar,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Radio,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions, setDisplayName } from 'recompose';

interface IOwnOptions {
  isOpen: boolean;
  hideBackdrop?: boolean;
  title: string;
  items: ICollectionValue[];
  value: string; 
  onSelected: (data?: ICollectionValue) => void;
  onClose: () => void;
}

type AllProps 
  = IOwnOptions 
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const DialogValueView: React.SFC<AllProps> = props => (
  <Dialog
    fullScreen
    disableBackdropClick
    hideBackdrop={props.hideBackdrop}
    className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
    open={props.isOpen}
    scroll="paper"
    onClose={props.onClose}
  >
    <AppBar position="fixed" className={props.classes.appBarDialog}>
      <Toolbar>
        <IconButton color="inherit" onClick={props.onClose} aria-label="Close">
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h6" color="inherit" className={props.classes.flex}>
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>

    <DialogContent className={props.classes.paddingDisabled}>
      <List>
        <ListItem button onClick={() => props.onSelected()}>
          <Radio color="primary" checked={!props.value} />
          <ListItemText primary={props.intl.formatMessage(layoutMessage.text.none)} />
        </ListItem>
        <Divider/>

        {
          props.items.map((item, index) => 
            <React.Fragment key={index}>
              <ListItem button onClick={() => props.onSelected(item)}>
                <Radio color="primary" checked={props.value && props.value === item.value || false} />
                <ListItemText primary={item.name} />
              </ListItem>
              <Divider/>
            </React.Fragment>
          )
        }
      </List>
    </DialogContent>
  </Dialog>
);

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() { 
    const initial = this.props.items.find(item => item.value === this.props.value);

    this.props.onSelected(initial);
  }
};

export const DialogValue = compose<AllProps, IOwnOptions>(
  setDisplayName('DialogValue'),
  withLayout,
  injectIntl,
  withStyles(styles),
  lifecycle(lifecycles)
)(DialogValueView);