import { SelectEmployee } from '@account/components/select';
import { SelectSystem } from '@common/components/select';
import { InputDateTime } from '@layout/components/input/dateTime';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, WrappedFieldArrayProps } from 'redux-form';
import { RequestFormProps, TravelItemFormData } from './RequestForm';

const calculateDiem = (start: string , end: string): number => {
  let result: number = 0;
  
  if (start !== '' && end !== '') {
  const startDate = moment(start);
  const endDate = moment(end);
  const diffHours = endDate.diff(startDate, 'hours');
  const diffDays = startDate.isSame(endDate, 'years') ? 
                      endDate.dayOfYear() - startDate.dayOfYear() : 
                      endDate.diff(startDate, 'days');

  if (startDate.isSame(endDate, 'days')) {
    result = diffHours >= 8 ? 1 : 0;
  } else if ( !startDate.isSame(endDate, 'days') && endDate.hours() >= 17) {
    result =  diffDays + 1;
  } else {
    result = diffDays;
  }
}  
  return result;
};

export const RequestItemFormView: React.SFC<WrappedFieldArrayProps<TravelItemFormData> & RequestFormProps> = props => {

  const diem = (props.diemRequest) ? 
                  props.diemRequest.filter(item => item.destinationType === props.destinationtypeValue &&
                    item.projectType === props.projectType)[0] 
                  : undefined;

  const render = (
    <Grid container spacing={16}>
      {
        props.fields.map((field, index) => {
          const item = props.fields.get(index);
          return (
          <Grid key={index} item xs={12} md={4}>
            <Card square>
              <CardHeader 
                action={
                  props.fields.length > 1 &&
                  <IconButton onClick={() => props.fields.remove(index)}>
                    <DeleteForeverIcon />
                  </IconButton>
                }
                title={`Travel Item - #${index + 1}`}
              />
              <CardContent>
                <div>
                  <Field 
                    type="text"
                    name={`${field}.employeeUid`}
                    label={props.intl.formatMessage(travelMessage.request.field.itemEmployeeUid)}
                    required={true}
                    component={SelectEmployee}
                    filter={{
                      companyUid: props.userState.user && props.userState.user.company.uid,
                      useAccess: true,
                      orderBy: 'fullName'
                    }}
                  />
                  <Field 
                    type="text"
                    name={`${field}.transportType`}
                    label={props.intl.formatMessage(travelMessage.request.field.transportType)}
                    required={true}
                    component={SelectSystem}
                    category = "transportation"
                  />
                  <FormControlLabel
                    label={props.intl.formatMessage(travelMessage.request.field.isRoundTrip)}                    
                    control={
                    <Field
                      type="checkbox"
                      name={`${field}.isRoundTrip`}
                      component={
                        ({ input, meta }: any) => (
                          <Checkbox 
                            {...input}
                            value={`${field}.isRoundTrip`}
                            disabled={meta.submitting}
                            onFocus={undefined}
                            onBlur={undefined}
                          />
                        )
                      }
                    />
                  } 
                  />
                  <Field 
                    type="text"
                    name={`${field}.from`}
                    label={props.intl.formatMessage(travelMessage.request.field.from)}
                    placeholder={props.intl.formatMessage(travelMessage.request.field.fromPlaceholder)}
                    required={true}
                    component={InputText}
                  />
                  <Field 
                    type="text"
                    name={`${field}.destination`}
                    label={props.intl.formatMessage(travelMessage.request.field.destination)}
                    placeholder={props.intl.formatMessage(travelMessage.request.field.destinationPlaceholder)}
                    required={true}
                    component={InputText}
                  />
                  <Field 
                    name={`${field}.departureDate`}
                    label={props.intl.formatMessage(travelMessage.request.field.itemStart)}
                    component={InputDateTime}
                    required={true}
                    minDate={props.startDate}
                    maxDate={props.endDate}
                  />
                  <Field 
                    name={`${field}.returnDate`}
                    required
                    label={props.intl.formatMessage(travelMessage.request.field.itemEnd)}
                    component={InputDateTime}
                    minDate={props.startDate}
                    maxDate={props.endDate}
                  />
                  <Field 
                    type="number"
                    name={`${field}.costTransport`}
                    label={props.intl.formatMessage(travelMessage.request.field.transportCost)}
                    component={InputNumber}
                  />
                  <FormControlLabel
                    label={props.intl.formatMessage(travelMessage.request.field.isTransportByCompany)}                    
                    control={
                    <Field
                      type="checkbox"
                      name={`${field}.isTransportByCompany`}
                      component={
                        ({ input, meta }: any) => (
                          <Checkbox 
                            {...input}
                            value={`${field}.isTransportByCompany`}
                            disabled={meta.submitting}
                            onFocus={undefined}
                            onBlur={undefined}
                          />
                        )
                      }
                    />
                  } 
                  />                  
                  <Field 
                    type="text"
                    name={`${field}.hotel`}
                    label={props.intl.formatMessage(travelMessage.request.field.hotel)}
                    placeholder={props.intl.formatMessage(travelMessage.request.field.hotelPlaceholder)}
                    component={InputText}
                  />
                  <Field 
                    type="number"
                    name={`${field}.costHotel`}
                    label={props.intl.formatMessage(travelMessage.request.field.hotelCost)}
                    component={InputNumber}
                  />
                  <FormControlLabel
                    label={props.intl.formatMessage(travelMessage.request.field.isHotelByCompany)}                    
                    control={
                    <Field
                      type="checkbox"
                      name={`${field}.isHotelByCompany`}
                      component={
                        ({ input, meta }: any) => (
                          <Checkbox 
                            {...input}
                            value={`${field}.isHotelByCompany`}
                            disabled={meta.submitting}
                            onFocus={undefined}
                            onBlur={undefined}
                          />
                        )
                      }
                    />
                  } 
                  />                   
                  <Field 
                    type="text"
                    name={`${field}.notes`}
                    label={props.intl.formatMessage(travelMessage.request.field.note)}
                    placeholder={props.intl.formatMessage(travelMessage.request.field.notePlaceholder)}
                    component={InputText}
                  />
                  <TextField
                    margin="dense"
                    disabled={true}
                    fullWidth={true}
                    label={props.intl.formatMessage(travelMessage.request.field.duration)}
                    value={props.intl.formatNumber(calculateDiem(item.departureDate, item.returnDate))}
                  /> 
                  <TextField
                    margin="dense"
                    disabled={true}
                    fullWidth={true}
                    label={props.intl.formatMessage(travelMessage.request.field.diemValue)}
                    value={props.intl.formatNumber(diem ? diem.value : 0)}
                  />  
                  <TextField
                    margin="dense"
                    disabled={true}
                    fullWidth={true}
                    label={props.intl.formatMessage(travelMessage.request.field.currencyUid)}
                    value={diem && diem.currency ? diem.currency.name : ''}
                  />  
                  <TextField
                    margin="dense"
                    disabled={true}
                    fullWidth={true}
                    label={props.intl.formatMessage(travelMessage.request.field.currencyRate)}
                    value={props.intl.formatNumber(diem && diem.currency ? diem.currency.rate : 0)}
                  />
                  {/* <Field 
                    type="text"
                    name={`${field}.amount`}
                    label="Diem Value"
                    disabled={true}
                    component={InputNumber}
                  />   */}
                  <TextField
                    margin="dense"
                    disabled={true}
                    fullWidth={true}
                    label={props.intl.formatMessage(travelMessage.request.field.amount)}
                    value={props.intl.formatNumber(calculateDiem(item.departureDate, item.returnDate) * (diem && diem.currency ? diem.currency.rate : 0) * (diem ? diem.value : 0))}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
          );
        })
      }
      <Grid item xs={12} md={4}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <Button variant="outlined" color="primary" onClick={() => props.fields.push({
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
              currencyUid: diem && diem.currency ? diem.currency.name : '',
              currencyRate: diem && diem.currency ? diem.currency.rate : 0,
              diemValue: diem ? diem.value : 0 ,
              })}>
              <FormattedMessage id="travel.section.item.action.add" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
  
  return render;
};