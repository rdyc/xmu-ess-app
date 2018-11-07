import { SelectEmployee } from '@account/components/select';
import { SelectSystem } from '@common/components/select';
import { InputDateTime } from '@layout/components/input/dateTime';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import {
  Card,
  CardContent,
  Grid,
} from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { TravelSettlementItemFormProps } from './TravelSettlementItemForm';

export const TravelSettlementItemFormView: React.SFC<TravelSettlementItemFormProps> = props => {
  const { context } = props;
  
  const render = (
    <Grid container spacing={16}>
      {
        context.fields.map((field, index) => 
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
                  />
                  <Field 
                    type="text"
                    name={`${field}.notes`}
                    label="notes"
                    component={InputText}
                  />
                  <Field 
                    type="number"
                    disabled= {true}
                    name={`${field}.duration`}
                    label="Diem"
                    required={true}
                    component={InputNumber}
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
                   <Field 
                    type="number"
                    name={`${field}.amount`}
                    label="Diem Value"
                    disabled={true}
                    component={InputNumber}
                  />                               
                </div>
              </CardContent>
            </Card>
          </Grid>
        )
      }
      {/* <Grid item xs={12} md={4}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <Button onClick={() => context.fields.push({
              uid: null,
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
              diemValue: 0,
              })}>
              <FormattedMessage id="travel.section.item.action.add" />
            </Button>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
  return render;
};