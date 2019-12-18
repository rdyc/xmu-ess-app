import { AccountEmployeeAllOption } from '@account/components/options/AccountAllEmployeeOption';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { LoadingCircular } from '@layout/components/loading/LoadingCircular';
import { layoutMessage } from '@layout/locales/messages';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { SubmissionTrigger } from '@webjob/components/recurring/form/trigger/submission/SubmissionTrigger';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { ICalculationFormValue, LeaveCalculationListProps } from './LeaveCalculationList';
import { LeaveCalculationTableView } from './LeaveCalculationTableView';
import { LeaveFilter } from './LeaveFilter';

export const LeaveCalculationListView: React.SFC<LeaveCalculationListProps> = props => {
  const { isLoading, response } = props.leaveCalculationState.all;
  const { response: companyList } = props.lookupCompanyState.list;
  const {
    size,
    page,
    handleChangePage,
    handleChangeSize,
    handleGoToNext,
    handleGoToPrevious
  } = props;

  const render = (
    <React.Fragment>
      <LeaveFilter
        isOpen={props.isFilterOpen}
        isLoading={isLoading}
        onClickSync={props.handleOnLoadApi}
        initialProps={{
          year: props.year,
          companyUid: props.companyUid
        }}
        onClose={props.handleFilterVisibility}
        onApply={props.handleFilterApplied}
      />
      {!response && isLoading && <LoadingCircular />}
      {
        response &&
        <Formik
          enableReinitialize
          initialValues={props.initialValues}
          validationSchema={props.validationSchema}
          onSubmit={props.handleOnSubmit}
          render={(formikBag: FormikProps<ICalculationFormValue>) => (
            <Form>
              <Paper square elevation={1}>
                <Grid container spacing={8} className={props.classes.leaveTop}>
                  <Grid item xs={12} md={6} lg={6} xl={6}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      className={props.classes.calculateButton} 
                      disabled={isLoading || formikBag.isSubmitting}
                      onClick={() => {
                        let companyName: string = '';
                        if (companyList && companyList.data) {
                          const company = companyList.data.find(cmp => cmp.uid === props.companyUid);
                          companyName = company ? company.name : '';
                        }
  
                        props.setInitialValues({
                          companyName,
                          companyUid: props.companyUid,
                          year: props.year,
                        });
                        props.setCalculateOpen();
                      }}
                    >
                      {props.intl.formatMessage(lookupMessage.calculation.field.calculate, {year: props.year})}
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} xl={6}>
                    <Grid item xs={12} md={6} lg={6} xl={6} className={props.classes.leaveEmploye}>
                      {
                        props.companyUid && response.data &&
                        <AccountEmployeeAllOption filter={props.filterEmployee}>
                          <SelectField
                            isSearchable
                            isClearable={props.find !== ''}
                            isDisabled={!props.companyUid || isLoading || formikBag.isSubmitting}
                            escapeClearsValue={true}
                            menuPlacement="auto"
                            menuPosition="fixed"
                            valueString={props.find}
                            textFieldProps={{
                              label: props.intl.formatMessage(
                                lookupMessage.calculation.filter.employee
                              ),
                              placeholder: props.intl.formatMessage(
                                lookupMessage.calculation.filter.employee
                              ),
                            }}
                            onChange={(selected: ISelectFieldOption) => {
                              const value = (selected && selected.value) || '';
  
                              props.handleFindEmployee(value);
                            }}
                          />
                        </AccountEmployeeAllOption>
                      }
                    </Grid>
                  </Grid>
                </Grid>
                {!isLoading && !formikBag.isSubmitting && response && response.data && response.data.length >= 1 && (
                  <LeaveCalculationTableView
                    page={page}
                    size={size}
                    metadata={response.metadata}
                    data={response.data}
                    handleChangePage={handleChangePage}
                    handleChangeSize={handleChangeSize}
                    handleGoToNext={handleGoToNext}
                    handleGoToPrevious={handleGoToPrevious}
                  />
                )}
                {(isLoading || formikBag.isSubmitting) && <LoadingCircular />}
                {!isLoading && response && response.data && response.data.length < 1 && 
                  <Typography variant="h2" style={{textAlign: 'center'}}>
                    No data found
                  </Typography>
                }
              </Paper>

              {/* Submission for calculate */}
              <SubmissionTrigger
                className={props.classes.dialogActions}
                buttonLabelProps={{
                  reset: props.intl.formatMessage(layoutMessage.action.reset),
                  submit: props.intl.formatMessage(layoutMessage.action.submit),
                  processing: props.intl.formatMessage(layoutMessage.text.processing)
                }}
                formikProps={formikBag}
                confirmationDialogProps={{
                  title: props.intl.formatMessage(lookupMessage.calculation.confirm.calculateTitle),
                  message: props.intl.formatMessage(lookupMessage.calculation.confirm.calculateDescription, {company: formikBag.values.companyName, year: formikBag.values.year}),
                  labelCancel: props.intl.formatMessage(layoutMessage.action.discard),
                  labelConfirm: props.intl.formatMessage(layoutMessage.action.continue)
                }} 
                isOpenDialog={props.isCalculateOpen}
                setOpen={props.setCalculateOpen}
              />             
            </Form>
          )}
        />
      }
    </React.Fragment>
  );

  return render;
};