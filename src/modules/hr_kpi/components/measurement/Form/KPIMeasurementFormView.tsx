import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardHeader, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import * as classNames from 'classnames';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { IKPIMeasurementFormValue, IKPIMeasurementFormValueList, KPIMeasurementFormProps } from './KPIMeasurementForm';
import KPIMeasurementItemPartialForm from './partial/KPIMeasurementItemPartialForm';

export const KPIMeasurementFormView: React.SFC<KPIMeasurementFormProps> = props => {
  const MeasurementList = (measurements: IKPIMeasurementFormValueList[]) => (
    measurements.map((item, index) => 
      <Formik
        key={index}
        enableReinitialize
        initialValues={props.measurementValueList[index].measurementFormValue}
        validationSchema={props.validationSchema}
        onSubmit={(values, formikActions) => props.handleOnSubmit(values, formikActions, index, item.isNew)}
        render={(formikBag: FormikProps<IKPIMeasurementFormValue>) => (
          <Form>
              <Table
                className={classNames(props.classes.reportTable)}
                padding="dense"
              >
                <TableBody>
                  <KPIMeasurementItemPartialForm
                    formikBag={formikBag}
                    intl={props.intl}
                    filterCommonSystem={props.filterCommonSystem}
                    isEditing={item.isEditing}
                    isItemEditing={props.isItemEditing}
                    isDialogOpen={item.isDialogOpen}
                    index={index}
                    parentFormMode={props.parentFormMode}
                    parentCategoryGroup={props.categoryGroup}
                    handleSetEditMode={props.handleSetEditMode}
                    handleSetDialogOpen={props.handleSetDialogOpen}
                    handleRemoveFormValueList={props.handleRemoveFormValueList}
                    handleOnSubmitDelete={props.handleOnSubmitDelete}
                    handleSetIsItemEditing={props.handleSetIsItemEditing}
                    classes={props.classes}
                  />
                </TableBody>
              </Table>
          </Form>
        )}
      />
    )
  );

  return (
  <React.Fragment>
    <Card square style={{ marginBottom: '100px' }}>
      <CardHeader 
        title={props.intl.formatMessage(kpiMessage.measurement.section.infoTitle)}
        // subheader={}
      />
        {
          props.kpiMeasurementState.list.isLoading &&
          <div className={props.classes.preloader}>
            <div className={props.classes.preloaderContent}>
              <CircularProgress 
                style={{margin: 'auto'}} 
                color="secondary"
              />

              <Typography
                {...props.waitingTextProps}
                className={props.classes.marginFarTop}
              >
                {props.waitingText}
              </Typography>
            </div>    
          </div>
        }
            <Table
              className={classNames(props.classes.reportTable)}
              padding="dense"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classNames(props.classes.cellWidthXXXL)}>
                    {props.intl.formatMessage(kpiMessage.measurement.field.description)}
                  </TableCell>
                  <TableCell className={classNames(props.classes.cellWidthLg)}>
                    {props.intl.formatMessage(kpiMessage.measurement.field.measurementType)}
                  </TableCell>
                  <TableCell className={classNames(props.classes.cellWidthMdV2)}>
                    {props.intl.formatMessage(kpiMessage.measurement.field.weight)}
                  </TableCell>
                  <TableCell className={classNames(props.classes.cellWidthMdV2)}>
                    {props.intl.formatMessage(layoutMessage.action.modify)}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
        {
          !props.kpiMeasurementState.list.isLoading &&
          MeasurementList(props.measurementValueList)
        }
        {
          !props.isItemEditing &&
          <CardActions>
            <Button 
              fullWidth
              color="primary"
              onClick={() => {
                props.handleCreateFormValueList();
                props.handleSetIsItemEditing();
              }}
            >
              <Add className={props.classes.marginFarRight} />
              {props.intl.formatMessage(layoutMessage.action.add)}
            </Button>
          </CardActions>
        }
    </Card>
  </React.Fragment>
  );
};
