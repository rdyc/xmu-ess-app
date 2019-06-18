import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import * as React from 'react';
import { RequestForm, TravelRequestFormData } from './forms/RequestForm';
import { RequestEditorProps } from './RequestEditor';

export const RequestEditorView: React.SFC<RequestEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, 
    handleSubmitFail, intl, generateDiemData, submitDialogTitle, 
    submitDialogContentText, submitDialogConfirmedText, submitDialogCancelText } = props;
  const { isLoading, response } = props.travelRequestState.detail;
  const { user } = props.userState;
  const renderForm = (formData: TravelRequestFormData) => (
    <RequestForm
      formMode={formMode}
      diemRequest={generateDiemData()}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
      submitDialogTitle={submitDialogTitle}
      submitDialogContentText={submitDialogContentText}
      submitDialogCancelText={submitDialogCancelText}
      submitDialogConfirmedText={submitDialogConfirmedText}
    />
  );

  const initialValues: TravelRequestFormData = {
    information: {
      uid: undefined,
      fullName: user && user.fullName,
      position: user && user.position.name,
      destinationType: undefined,
      start: undefined,
      end: undefined,
      customerUid: undefined,
      projectUid: undefined,
      projectType: undefined,
      siteUid: undefined,
      activityType: undefined,
      objective: undefined,
      target: undefined,
      comment: undefined,
      total: 0,
    },
    items: [
      {
        uid: undefined,
        employeeUid: '',
        fullName: '',
        transportType: '',
        isRoundTrip: false,
        from: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        costTransport: 0,
        isTransportByCompany: false,
        hotel: '',
        costHotel: 0,
        isHotelByCompany: false,
        notes: '',
        duration: 0,
        amount: 0,            
        currencyUid: '',
        currencyRate: 0,
        diemValue: 0 ,
      }
    ]
    // item: {
    // }
  };

  const dateFormatEditor = (date: string): string => {
    let result = date;
  
    if (date) {
      result = intl.formatDate(date, {
        second: 'numeric',
        minute: 'numeric',
        hour: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        timeZone: 'GMT',
      });
    }
    
    return result;
  };

  // new
  if (formMode === FormMode.New) {
    return renderForm(initialValues);
  }

  // modify
  if (formMode === FormMode.Edit) {
    if (isLoading) {
      return (
        <div className={props.classes.preloader}>
          <div className={props.classes.preloaderContent}>
            <CircularProgress 
              style={{margin: 'auto'}} 
              color="secondary"
            />

            <Typography
              className={props.classes.marginFarTop}
            >
              {props.intl.formatMessage(layoutMessage.text.waiting)}
            </Typography>
          </div>    
        </div>
      );
    }

    if (!isLoading && response && response.data) {
      // todo: replace values with response data
      const data = response.data;

      initialValues.information.uid = data.uid;
      initialValues.information.fullName = data.employee ? data.employee.fullName : 'N/A';
      initialValues.information.position = data.position ? data.position.name : 'N/A';
      initialValues.information.destinationType = data.destinationType;
      initialValues.information.start = data.start;
      initialValues.information.end = data.end;
      initialValues.information.customerUid = data.customerUid;
      initialValues.information.projectUid = data.projectUid;
      initialValues.information.projectType = data.project ? data.project.projectType : undefined;
      initialValues.information.siteUid = data.siteUid;
      initialValues.information.activityType = data.activityType;
      initialValues.information.objective = data.objective;
      initialValues.information.target = data.target;
      initialValues.information.comment = data.comment;
      initialValues.information.total = data.total;

      if (data.items) {
        initialValues.items = [];
        data.items.forEach(item =>       
          initialValues.items.push({
            uid: item.uid,
            employeeUid: item.employeeUid,
            fullName: item.employee ? item.employee.fullName : 'N/A',
            transportType: item.transportType,
            isRoundTrip: item.isRoundTrip,
            from: item.from,
            destination: item.destination,
            departureDate: dateFormatEditor(item.departureDate),
            returnDate: dateFormatEditor(item.returnDate),
            costTransport: item.costTransport || 0,
            isTransportByCompany: item.isTransportByCompany,
            hotel: item.hotel,
            costHotel: item.costHotel || 0,
            isHotelByCompany: item.isHotelByCompany,
            notes: item.notes,
            duration: item.duration || 0,
            amount: item.amount || 0,
            currencyUid: item.currency ? item.currency.name : '',
            currencyRate: item.currency ? item.currency.rate : 0,
            diemValue: item.diemValue || 0
          })
        );
      }
      return renderForm(initialValues);
    }    
  }
  return null;
};