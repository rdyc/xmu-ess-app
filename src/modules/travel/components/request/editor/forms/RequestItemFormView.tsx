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
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { RequestItemFormProps } from '@travel/components/request/editor/forms/RequestItemForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

export const RequestItemFormView: React.SFC<RequestItemFormProps> = props => {
  const { context, destinationTypeValue } = props;
  const diemResponse = props.lookupDiemState.all.response;

  const diem = (diemResponse && diemResponse.data) ? 
                    diemResponse.data.filter(item => item.destinationType === destinationTypeValue &&
                       item.projectType === 'SPT01')[0] 
                    : undefined;
                    
  const render = (
    <Grid container spacing={16}>
      {
        context.fields.map((field, index) => 
          <Grid key={index} item xs={12} md={4}>
            <Card square>
              <CardHeader 
                action={
                  <IconButton onClick={() => context.fields.remove(index)}>
                    <DeleteForeverIcon />
                  </IconButton>
                }
                title={`#${index + 1}`}
              />
              <CardContent>
                <div>
                  <Field 
                    type="text"
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
                  <FormControlLabel
                    label="Is RoundTrip?"                    
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
                    label="Transport Cost"
                    component={InputNumber}
                  />
                  <FormControlLabel
                    label="comp Purchase?"                    
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
                    label="Hotel Name"
                    component={InputText}
                  />
                  <Field 
                    type="number"
                    name={`${field}.costHotel`}
                    label="Hotel Cost"
                    component={InputNumber}
                  />
                  <FormControlLabel
                    label="comp Purchase?"                    
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
                    label="notes"
                    component={InputText}
                  />
                  <Field 
                    type="number"
                    name={`${field}.duration`}
                    label="Diem"
                    disabled={true}
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
      <Grid item xs={12} md={4}>
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