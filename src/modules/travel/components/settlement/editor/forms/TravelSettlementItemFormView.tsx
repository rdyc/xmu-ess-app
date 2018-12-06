import { SelectEmployee } from '@account/components/select';
import { SelectSystem } from '@common/components/select';
import { InputDateTime } from '@layout/components/input/dateTime';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@material-ui/core';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as moment from 'moment';
import * as React from 'react';
import { Field } from 'redux-form';
import { TravelSettlementItemFormProps } from './TravelSettlementItemForm';

const calculateDiem = (start: string , end: string): number => {
  let result: number = 0;
  
  if (start !== '' && end !== '') {
  const startDate = moment(start);
  const endDate = moment(end);
  const diffHours = endDate.diff(startDate, 'hours');
  const diffDays = endDate.dayOfYear() - startDate.dayOfYear();

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

export const TravelSettlementItemFormView: React.SFC<TravelSettlementItemFormProps> = props => {
  const { context } = props;
  
  const render = (
    <Grid container spacing={16}>
      {
        context.fields.map((field, index) => {
          const item = context.fields.get(index);
          // const amount: number = calculateDiem(item.departureDate, item.returnDate) * item.diemValue * item.currencyRate;
          // item.amount = amount;
          return (
          <Grid key={index} item xs={12} md={4}>
            <Card square>
              <CardContent>
                <div>
                  <Field 
                    type="text"
                    disabled = "true"
                    name={`${field}.employeeUid`}
                    label={props.intl.formatMessage(travelMessage.request.field.itemEmployeeUid)}
                    placeholder="Employee"
                    required={true}
                    companyUids={props.userState.user && [props.userState.user.company.uid]}
                    component={SelectEmployee}
                  />
                  <Field 
                    type="text"
                    name={`${field}.transportType`}
                    label={props.intl.formatMessage(travelMessage.request.field.transportType)}
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
                    component={InputText}
                  />
                  <Field 
                    type="text"
                    name={`${field}.destination`}
                    label={props.intl.formatMessage(travelMessage.request.field.destination)}
                    component={InputText}
                  />
                  <Field 
                    name={`${field}.departureDate`}
                    label={props.intl.formatMessage(travelMessage.request.field.itemStart)}
                    component={InputDateTime}
                    minDate={props.minDate}
                    maxDate={props.maxDate}
                  />
                  <Field 
                    name={`${field}.returnDate`}
                    label={props.intl.formatMessage(travelMessage.request.field.itemEnd)}
                    component={InputDateTime}
                    minDate={props.minDate}
                    maxDate={props.maxDate}
                  />
                  <Field 
                    type="number"
                    name={`${field}.costTransport`}
                    label={props.intl.formatMessage(travelMessage.request.field.transportCost)}
                    required={true}
                    component={InputNumber}
                    // onChange= {props.onCostChange}
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
                    component={InputText}
                  />
                  <Field 
                    type="number"
                    name={`${field}.costHotel`}
                    label={props.intl.formatMessage(travelMessage.request.field.hotelCost)}
                    required={true}
                    component={InputNumber}
                    // onChange= {props.onCostChange}
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
                    component={InputText}
                  />
                  <TextField
                    margin="dense"
                    disabled={true}
                    label={props.intl.formatMessage(travelMessage.request.field.duration)}
                    value={props.intl.formatNumber(calculateDiem(item.departureDate, item.returnDate))}
                  />  
                  <Field 
                    type="number"
                    name={`${field}.diemValue`}
                    label={props.intl.formatMessage(travelMessage.request.field.diemValue)}
                    disabled={true}
                    component={InputNumber}
                  />     
                  <Field 
                    type="text"
                    name={`${field}.currencyUid`}
                    label={props.intl.formatMessage(travelMessage.request.field.currencyUid)}
                    disabled={true}
                    component={InputText}
                  />
                  <Field 
                    type="text"
                    name={`${field}.currencyRate`}
                    label={props.intl.formatMessage(travelMessage.request.field.currencyRate)}
                    disabled={true}
                    component={InputText}
                  />
                  <TextField
                    margin="dense"
                    disabled={true}
                    fullWidth={true}
                    label={props.intl.formatMessage(travelMessage.request.field.amount)}
                    value={props.intl.formatNumber(calculateDiem(item.departureDate, item.returnDate) * (item.currencyRate) * (item.diemValue))}
                  />                               
                </div>
              </CardContent>
            </Card>
          </Grid>
          );
        })
      }
    </Grid>
  );
  return render;
};