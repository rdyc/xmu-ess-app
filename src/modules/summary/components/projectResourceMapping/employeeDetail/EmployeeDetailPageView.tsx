import { AccountEmployeeExperienceList } from '@account/components/list/experience/AccountEmployeeExperienceList';
import { AccountEmployeeTrainingList } from '@account/components/list/training/AccountEmployeeTrainingList';
import { AppBar, Dialog, DialogContent, Grid, IconButton, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { EmployeeDetailPageProps } from './EmployeeDetailPage';
import { EmployeeInformation } from './EmployeeInformation';

export const EmployeeDetailPageView: React.SFC<EmployeeDetailPageProps> = props => {
  const { employee, handleOpenEmployee, isEmployeeOpen, company } = props;

  const render = (
    <React.Fragment>
      {
        employee &&
        <Dialog
          open={isEmployeeOpen}
          onClose={handleOpenEmployee}
          scroll="paper"
          className={props.classes.shift}
          fullScreen
          disableBackdropClick
        >
          <AppBar 
            elevation={0}
            position="fixed" 
            color="default"
            className={props.classes.appBarDialog}
          >
            <Toolbar>
              <IconButton color="inherit" onClick={handleOpenEmployee} aria-label="Close">
                <CloseIcon />
              </IconButton>

              <Typography variant="h6" color="inherit" className={props.classes.flex}>
                {props.intl.formatMessage(summaryMessage.mapping.page.employee, {name: employee.fullName})}
              </Typography>

            </Toolbar>
          </AppBar>

          <Tabs value={props.tabValue} onChange={props.handleChangeTab} style={{
            color: '#fff',
            background: props.theme.palette.type === 'light' ? '#03a9f4' : '#212121'
          }}>
            <Tab label="Profile" />
            <Tab label="Training" />
            <Tab label="Experience" />
          </Tabs>

          <DialogContent style={{padding: 0}}>
            {
              props.tabValue === 0 && (
                <Grid container spacing={8}>
                  <Grid item xs={4} style={{marginLeft: '24px', marginTop: '10px'}}>
                  <EmployeeInformation data={employee} company={company} />
                  </Grid>
                </Grid>
              )
            }
            {props.tabValue === 1 && <AccountEmployeeTrainingList employeeId={employee.uid} />}
            {props.tabValue === 2 && <AccountEmployeeExperienceList employeeId={employee.uid} />}
          </DialogContent>
          
        </Dialog>
      }
    </React.Fragment>
  );

  return render;
};
