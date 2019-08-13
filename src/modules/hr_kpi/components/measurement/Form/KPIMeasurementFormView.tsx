import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardContent, CardHeader, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
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
            <div
            className={classNames(props.classes.reportContentScrollable)}
            >
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
                    index={index}
                    parentFormMode={props.parentFormMode}
                    handleSetEditMode={props.handleSetEditMode}
                    handleRemoveFormValueList={props.handleRemoveFormValueList}
                    handleSetIsItemEditing={props.handleSetIsItemEditing}
                    classes={props.classes}
                  />
                </TableBody>
              </Table>
            </div>
          </Form>
        )}
      />
    )
  );

  return (
  <React.Fragment>
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(kpiMessage.measurement.section.infoTitle)}
        // subheader={}
      />
      <CardContent>
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
          <div
            className={classNames(props.classes.reportContentScrollable)}
          >
            <Table
              className={classNames(props.classes.reportTable)}
              padding="dense"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classNames(props.classes.cellWidthMd)}>
                    {props.intl.formatMessage(kpiMessage.measurement.field.description)}
                  </TableCell>
                  <TableCell className={classNames(props.classes.cellWidthMd)}>
                    {props.intl.formatMessage(kpiMessage.measurement.field.measurementType)}
                  </TableCell>
                  <TableCell className={classNames(props.classes.cellWidthXS)}>
                    {props.intl.formatMessage(kpiMessage.measurement.field.weight)}
                  </TableCell>
                  <TableCell className={classNames(props.classes.cellWidthSm)}>
                    {props.intl.formatMessage(layoutMessage.action.modify)}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </div>
        {
          !props.kpiMeasurementState.list.isLoading &&
          MeasurementList(props.measurementValueList)
        }
        {
          !props.isItemEditing &&
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
        }
      </CardContent>
    </Card>
  </React.Fragment>
  );
};
