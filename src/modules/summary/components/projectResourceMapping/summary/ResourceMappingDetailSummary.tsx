import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  AppBar,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from '@styles';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

import { IResourceMappingChartSummary } from '../ResourceMapping';
import { SummaryInformation } from './SummaryInformation';

interface OwnProps {
  isDetailSumOpen: boolean;
  data?: IResourceMappingChartSummary;
  handleOpenDetailSum: () => void;
}

type AllProps 
  = OwnProps 
  & WithUser 
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const resourceMappingDetailSummary: React.SFC<AllProps> = props => {
  const { isDetailSumOpen, data, handleOpenDetailSum } = props;
  console.log(data);
  const render = (
    <div>
      {data &&
        <Dialog
          fullScreen
          disableBackdropClick
          open={isDetailSumOpen}
          className={props.classes.shift}
          onClose={handleOpenDetailSum}
        >
          <AppBar 
            elevation={0}
            position="fixed" 
            color="default"
            className={props.classes.appBarDialog}
          >
            <Toolbar>
              <IconButton color="inherit" onClick={handleOpenDetailSum} aria-label="Close">
                <CloseIcon />
              </IconButton>

              <Typography variant="h6" color="inherit" className={props.classes.flex}>
                {props.intl.formatMessage(summaryMessage.mapping.page.detail)}
              </Typography>

            </Toolbar>
          </AppBar>
          
          <DialogTitle>
            {data.employee.fullName}
          </DialogTitle>
          
          <DialogContent>
            <Grid container spacing={8}>
              {
                data &&
                data.projects.map(project => 
                  <SummaryInformation key={project.uid} data={project} />
                )
              }
            </Grid>
          </DialogContent>
        </Dialog>
      }
    </div>
  );

  return render;
};

export const ResourceMappingDetailSummary = compose<AllProps, OwnProps>(
  injectIntl,
  withUser,
  withStyles(styles)
)(resourceMappingDetailSummary);
