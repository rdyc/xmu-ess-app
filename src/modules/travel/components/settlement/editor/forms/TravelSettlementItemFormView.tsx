import { SelectEmployee } from '@account/components/select';
import { SelectSystem } from '@common/components/select';
import { InputDateTime } from '@layout/components/input/dateTime';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import {
  Card,
  CardContent,
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
  const diffDays = endDate.diff(startDate, 'days');

  if (startDate.isSame(endDate)) {
    result = diffHours >= 8 ? 1 : 0;
  } else if ( !startDate.isSame(endDate) && endDate.isSameOrAfter(17, 'hours')) {
    result = diffDays;
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
          return (
          <Grid key={index} item xs={12} md={4}>
            <Card square>
              <CardContent>
                <div>
                  <Field 
                    type="text"
                    disabled = "true"
                    name={`${field}.employeeUid`}
                    label="employee"
                    placeholder="Employee"
                    required={true}
                    companyUids={props.userState.user && [props.userState.user.company.uid]}
                    component={SelectEmployee}
                  />
                  <Field 
                    type="text"
                    name={`${field}.transportType`}
                    label="Transport Type"
                    component={SelectSystem}
                    category = "transportation"
                  />
                  <Field 
                    type="text"
                    name={`${field}.from`}
                    label="from"
                    component={InputText}
                  />
                  <Field 
                    type="text"
                    name={`${field}.destination`}
                    label="destination"
                    component={InputText}
                  />
                  <Field 
                    name={`${field}.departureDate`}
                    label="Departure Date"
                    component={InputDateTime}
                  />
                  <Field 
                    name={`${field}.returnDate`}
                    label="return Date"
                    component={InputDateTime}
                  />
                  <Field 
                    type="number"
                    name={`${field}.costTransport`}
                    label="Cost Transport"
                    required={true}
                    component={InputNumber}
                    onChange= {props.onCostChange}
                  />
                  <Field 
                    type="text"
                    name={`${field}.hotel`}
                    label="Hotel Name"
                    component={InputText}
                  />
                  <Field 
                    type="number"
                    name={`${field}.costHotel`}
                    label="Cost Hotel"
                    required={true}
                    component={InputNumber}
                    onChange= {props.onCostChange}
                  />
                  <Field 
                    type="text"
                    name={`${field}.notes`}
                    label="notes"
                    component={InputText}
                  />
                  {/* <Field 
                    type="number"
                    disabled= {true}
                    name={`${field}.duration`}
                    label="Diem"
                    required={true}
                    component={InputNumber}
                  /> */}
                  <TextField
                    margin="dense"
                    disabled={true}
                    label={props.intl.formatMessage(travelMessage.request.field.duration)}
                    value={props.intl.formatNumber(calculateDiem(item.departureDate, item.returnDate))}
                  />  
                  <Field 
                    type="number"
                    name={`${field}.diemValue`}
                    label="Per Diem"
                    disabled={true}
                    component={InputNumber}
                  />     
                  <Field 
                    type="text"
                    name={`${field}.currencyUid`}
                    label="Currency"
                    disabled={true}
                    component={InputText}
                  />
                  <Field 
                    type="text"
                    name={`${field}.currencyRate`}
                    label="Currency Rate"
                    disabled={true}
                    component={InputText}
                  />
                  {/* <Field 
                    type="number"
                    name={`${field}.amount`}
                    label="Diem Value"
                    disabled={true}
                    component={InputNumber}
                  /> */}
                  <TextField
                    margin="dense"
                    disabled={true}
                    label={props.intl.formatMessage(travelMessage.request.field.amount)}
                    value={props.intl.formatNumber(calculateDiem(item.departureDate, item.returnDate) * item.diemValue * item.currencyRate)}
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