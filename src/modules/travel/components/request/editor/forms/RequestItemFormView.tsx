import { SelectEmployee } from '@account/components/select';
import { InputText } from '@layout/components/input/text';
import { InputTime } from '@layout/components/input/time';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { RequestItemFormProps } from '@travel/components/request/editor/forms/RequestItemForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

export const RequestItemFormView: React.SFC<RequestItemFormProps> = props => {
  const { context } = props;
  
  const render = (
    <Grid container spacing={16}>
      {
        context.fields.map((field, index) => 
          <Grid key={index} item xs={12} md={6}>
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
                    required={true}
                    companyUids={['CP002']}
                    component={SelectEmployee}
                  />
                  <Field 
                    type="text"
                    name={`${field}.transportType`}
                    label="Transport Type"
                    component={InputText}
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
                    component={InputTime}
                  />
                  <Field 
                    name={`${field}.returnDate`}
                    label="return Date"
                    component={InputTime}
                  />
                  <Field 
                    type="text"
                    name={`${field}.hotel`}
                    label="Hotel Name"
                    component={InputText}
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
                    component={InputText}
                  />
                  <Field 
                    type="text"
                    name={`${field}.amount`}
                    label="Diem Value"
                    disabled={true}
                    component={InputText}
                  />
                  <Field 
                    type="text"
                    name={`${field}.currencyUid`}
                    label="Currency"
                    disabled={true}
                    component={InputText}
                  />
                  <Field 
                    type="number"
                    name={`${field}.diemValue`}
                    label="Per Diem"
                    disabled={true}
                    component={InputText}
                  />                  
                </div>
              </CardContent>
            </Card>
          </Grid>
        )
      }
      <Grid item xs={12} md={6}>
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
            diemValue: 0,
          })}>
          <FormattedMessage id="travel.section.item.action.add" />
        </Button>
      </Grid>
    </Grid>
  );
  return render;
};