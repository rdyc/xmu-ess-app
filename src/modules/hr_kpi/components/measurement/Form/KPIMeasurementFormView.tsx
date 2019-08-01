import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardContent, CardHeader, CircularProgress, ListItem, Tooltip, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { IKPIMeasurementFormValue, IKPIMeasurementFormValueList, KPIMeasurementFormProps } from './KPIMeasurementForm';
import KPIMeasurementItemPartialForm from './partial/KPIMeasurementItemPartialForm';

export const KPIMeasurementFormView: React.SFC<KPIMeasurementFormProps> = props => {
  const MeasurementList = (measurements: IKPIMeasurementFormValueList[]) => (
    measurements.map((item, index) => 
      <Tooltip title={props.intl.formatMessage(kpiMessage.measurement.field.tooltip)} key={index}>
        <ListItem disableGutters>
          <Formik
            enableReinitialize
            initialValues={props.measurementValueList[index].measurementFormValue}
            validationSchema={props.validationSchema}
            onSubmit={(values, formikActions) => props.handleOnSubmit(values, formikActions, index, item.isNew)}
            render={(formikBag: FormikProps<IKPIMeasurementFormValue>) => (
              <Form>
                <KPIMeasurementItemPartialForm
                  formikBag={formikBag}
                  intl={props.intl}
                  filterCommonSystem={props.filterCommonSystem}
                  isEditing={item.isEditing}
                  index={index}
                  handleSetEditMode={props.handleSetEditMode}
                />
              </Form>
            )}
          />
        </ListItem>
      </Tooltip>
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
        {
          !props.kpiMeasurementState.list.isLoading &&
          MeasurementList(props.measurementValueList)
        }
        <Button 
            fullWidth
            color="primary"
            onClick={() => props.handleCreateFormValueList()}
          >
            <Add className={props.classes.marginFarRight} />
            {props.intl.formatMessage(layoutMessage.action.add)}
          </Button>
      </CardContent>
    </Card>
  </React.Fragment>
  );
};
