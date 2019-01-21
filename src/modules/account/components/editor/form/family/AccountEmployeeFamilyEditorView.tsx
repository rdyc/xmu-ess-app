import { IEmployeeFamily } from '@account/classes/response/employeeFamily';
import { AccountEmployeeFamilyHeaderTable } from '@account/classes/types';
// import { accountMessage } from '@account/locales/messages/accountMessage';
// import { FormMode } from '@generic/types';
// import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import {
  Fade,
  // Menu, MenuItem, 
  IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as React from 'react';
// import { AccountEmployeeFamilyContainerForm, AccountEmployeeFamilyFormData } from './AccountEmployeeFamilyContainerForm';
import { AccountEmployeeFamilyEditorProps } from './AccountEmployeeFamilyEditor';

export const AccountEmployeeFamilyEditorView: React.SFC<AccountEmployeeFamilyEditorProps> = props => {
  const { classes, intl } = props;
  const { response, isLoading } = props.accountEmployeeFamilyState.list;

  const header = Object.keys(AccountEmployeeFamilyHeaderTable).map(key => ({
    id: key,
    name: AccountEmployeeFamilyHeaderTable[key]
  }));

  const renderDialog = (
    <Dialog
      open={isOpenDialog}
      fullScreen={isMobile}
    >
      <DialogTitle disableTypography>
        <Typography variant="title" color="primary">
          {props.intl.formatMessage(dialogTitle())}
        </Typography>

        <Typography variant="subheading">
          {props.intl.formatMessage(dialogSubTitle())}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <SiteContainerForm
          ref={ref}
          formAction={editAction ? editAction : 'update'}
          initialValues={initialValues}
          validate={handleValidate}
          onSubmit={handleSubmit}
          onSubmitSuccess={handleSubmitSuccess}
          onSubmitFail={handleSubmitFail}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => handleDialogClose()} color="secondary">
          {props.intl.formatMessage(layoutMessage.action.discard)}
        </Button>

        {
          editAction !== 'delete' &&
          <Button
            type="button"
            color="secondary"
            onClick={() => ref.current && ref.current.reset()}
          >
            {props.intl.formatMessage(layoutMessage.action.reset)}
          </Button>
        }

        <Button
          type="submit"
          color="secondary"
          onClick={() => ref.current && ref.current.submit()}
        >
          {props.intl.formatMessage(props.submitting ? layoutMessage.text.processing : layoutMessage.action.submit)}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderFamily = (data: IEmployeeFamily[]) => {
    return (y
      <Fade in={!isLoading} timeout={1000} mountOnEnter unmountOnExit>
        <Paper className={classes.table}>
          <Table className={classes.minTable}>
            <TableHead>
              <TableRow>
                {header.map(headerIdx => (
                  <TableCell
                    key={headerIdx.id}
                    numeric={headerIdx.id === 'No' ? true : false}
                    padding="default"
                  >
                    {headerIdx.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.family && item.family.value}</TableCell>
                    <TableCell>{item.fullName}</TableCell>
                    <TableCell>{item.gender && item.gender.value}</TableCell>
                    <TableCell>{item.birthPlace}</TableCell>
                    <TableCell>
                      {item.birthDate
                        ? intl.formatDate(item.birthDate, GlobalFormat.Date)
                        : 'N/A'}
                    </TableCell>
                    <IconButton
                      id={`family-${index}`}
                      color="inherit"
                      aria-label="More"
                      onClick={() => props.handleMenuOpen(item, index)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Fade>
    );
  };

  return (
    <React.Fragment>
      {((response && !response.data) ||
        (response && response.data && response.data.length === 0)) && (
          <Typography>No Data</Typography>
        )}
      {response && response.data && response.data.length >= 1 && renderFamily(response.data)}
    </React.Fragment>
  );

  const render = (
    <Grid
      container
      spacing={16}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item sm={12} md={4}>
        {
          response &&
          <ProjectInformation data={response.data} />
        }
      </Grid>

      <Grid item sm={12} md={4}>
        {renderFamily}
        {renderDialog}
      </Grid>
    </Grid>
  );
  return render;
  // const renderForm = (formData: AccountEmployeeFamilyFormData) => (
  //   <AccountEmployeeFamilyContainerForm
  //     formMode={formMode}
  //     initialValues={formData}
  //     validate={handleValidate}
  //     onSubmit={handleSubmit}
  //     onSubmitSuccess={handleSubmitSuccess}
  //     onSubmitFail={handleSubmitFail}
  //     submitDialogTitle={submitDialogTitle}
  //     submitDialogContentText={submitDialogContentText}
  //     submitDialogCancelText={submitDialogCancelText}
  //     submitDialogConfirmedText={submitDialogConfirmedText}
  //   />
  // );

  // const initialValues: AccountEmployeeFamilyFormData = {
  //   information: {
  //     employeeUid: undefined,
  //     uid: null,
  //     familyType: null,
  //     fullName: null,
  //     genderType: null,
  //     birthPlace: null,
  //     birthDate: null
  //   },
  // };

  // // New
  // if (formMode === FormMode.New) {
  //   return renderForm(initialValues);
  // }

  // // Modify
  // if (formMode === FormMode.Edit) {
  //   if (isLoading && !response) {
  //     return (
  //       <Typography variant="body2">
  //         {props.intl.formatMessage(layoutMessage.text.loading)}
  //       </Typography>
  //     );
  //   }

  //   if (!isLoading && response && response.data) {
  //     // todo: replace values with response data
  //     const data = response.data;
  //     // basic
  //     initialValues.information.employeeUid = data.uid;
  //     initialValues.information.familyType = data.familyType;
  //     initialValues.information.fullName = data.fullName;
  //     initialValues.information.genderType = data.genderType;
  //     initialValues.information.birthPlace = data.birthPlace;
  //     initialValues.information.birthDate = data.birthDate;

  //     return renderForm(initialValues);
  //   }
  // }

  // return null;
};