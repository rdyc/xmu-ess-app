import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { Field, FieldArray, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import { ITravelSettlementFormValue } from '../TravelSettlementForm';

type TravelItemPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ITravelSettlementFormValue>;
  intl: InjectedIntl;
  filterCommonSystem: ISystemListFilter;
  classes: {
    flexContent: string;
    marginFarRight: string;
  };
};

const TravelItemPartialForm: React.ComponentType<TravelItemPartialFormProps> = props => (
  <FieldArray
    name="items"
    render={() => (
      <React.Fragment>
        {
          props.formikBag.values.items.length > 0 &&
          props.formikBag.values.items.map((item, index) =>
            <div className={props.classes.flexContent} key={index}>
              <Card square>
                <CardHeader 
                  title={`#${index + 1} - ${item.uid || 'Draft'}`}
                />
                <CardContent>
                  <Field 
                    name={`items.${index}.fullName`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.fullName`);
                      const touch = getIn(form.touched, `items.${index}.fullName`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(travelMessage.request.field.fullName)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.fullName)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name="transportType"
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.transportType`);
                      const touch = getIn(form.touched, `items.${index}.transportType`);

                      return (
                        <React.Fragment>
                          <CommonSystemOption category="transportation" filter={props.filterCommonSystem}>
                            <SelectField
                              isSearchable
                              isDisabled={props.formikBag.isSubmitting}
                              isClearable={field.value !== ''}
                              escapeClearsValue={true}
                              valueString={field.value}
                              textFieldProps={{
                                label: props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName')),
                                required: true,
                                helperText: touch && error,
                                error: touch && Boolean(error)
                              }}
                              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
                            />
                          </CommonSystemOption>
                        </React.Fragment>
                      );
                    }}
                  />
                  
                  <Field
                    key={index}
                    name={`items.${index}.isRoundTrip`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => (
                      <FormControlLabel
                        label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
                        control={
                          <Checkbox 
                            {...field} 
                            value={field.value}
                            checked={props.formikBag.values.items[index].isRoundTrip}
                          />
                        }
                        style={{width: '100%'}}
                      />
                    )}
                  />

                  <Field 
                    name={`items.${index}.from`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.from`);
                      const touch = getIn(form.touched, `items.${index}.from`);

                      return (
                        <TextField 
                          {...field}
                          fullWidth
                          required
                          margin="normal"
                          autoComplete="off"
                          disabled={form.isSubmitting}
                          label={props.intl.formatMessage(travelMessage.request.field.from)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.from)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field 
                    name={`items.${index}.destination`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.destination`);
                      const touch = getIn(form.touched, `items.${index}.destination`);

                      return (
                        <TextField 
                          {...field}
                          fullWidth
                          required
                          margin="normal"
                          autoComplete="off"
                          disabled={form.isSubmitting}
                          label={props.intl.formatMessage(travelMessage.request.field.destination)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.destination)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field 
                    name={`items.${index}.departureDate`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.departureDate`);
                      const touch = getIn(form.touched, `items.${index}.departureDate`);

                      return (
                        <DatePicker
                          {...field}
                          fullWidth
                          required={true}
                          margin="normal"
                          disabled={form.isSubmitting}
                          showTodayButton
                          label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
                          placeholder={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
                          leftArrowIcon={<ChevronLeft />}
                          rightArrowIcon={<ChevronRight />}
                          format="MMMM DD, YYYY"
                          disablePast
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          onChange={(moment: Moment) => props.formikBag.setFieldValue(`items.${index}.departureDate`, moment.format('YYYY-MM-DD'))}
                          invalidLabel=""
                        />
                      );
                    }}
                  />

                  <Field 
                    name={`items.${index}.returnDate`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.returnDate`);
                      const touch = getIn(form.touched, `items.${index}.returnDate`);

                      return (
                        <DatePicker
                          {...field}
                          fullWidth
                          required={true}
                          margin="normal"
                          disabled={form.isSubmitting}
                          showTodayButton
                          label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
                          placeholder={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldPlaceholder'))}
                          leftArrowIcon={<ChevronLeft />}
                          rightArrowIcon={<ChevronRight />}
                          format="MMMM DD, YYYY"
                          disablePast
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          onChange={(moment: Moment) => props.formikBag.setFieldValue(`items.${index}.returnDate`, moment.format('YYYY-MM-DD'))}
                          invalidLabel=""
                        />
                      );
                    }}
                  />
                  
                  <Field
                    name={`items.${index}.costTransport`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.costTransport`);
                      const touch = getIn(form.touched, `items.${index}.costTransport`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(travelMessage.request.field.transportCost)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.transportCost)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          InputProps={{
                            inputComponent: NumberFormatter,
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let value = 0;

                            if (e.target.value === '') {
                              // set current field
                              props.formikBag.setFieldValue(field.name, 0);
                            } else {
                              value = parseFloat(e.target.value);

                              // set current field
                              props.formikBag.setFieldValue(field.name, value);
                            }

                            // set cost field
                            props.formikBag.setFieldValue(`items.${index}.costTransport`, value);
                          }}
                        />
                      );
                    }}
                  />
                  
                  <Field
                    key={index}
                    name={`items.${index}.isTransportByCompany`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => (
                      <FormControlLabel
                        label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
                        control={
                          <Checkbox 
                            {...field} 
                            value={field.value}
                            checked={props.formikBag.values.items[index].isTransportByCompany}
                          />
                        }
                        style={{width: '100%'}}
                      />
                    )}
                  />

                  <Field 
                    name={`items.${index}.hotel`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.hotel`);
                      const touch = getIn(form.touched, `items.${index}.hotel`);

                      return (
                        <TextField 
                          {...field}
                          fullWidth
                          required
                          margin="normal"
                          autoComplete="off"
                          disabled={form.isSubmitting}
                          label={props.intl.formatMessage(travelMessage.request.field.hotel)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.hotel)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                  
                  <Field
                    name={`items.${index}.costHotel`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.costHotel`);
                      const touch = getIn(form.touched, `items.${index}.costHotel`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(travelMessage.request.field.hotelCost)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.hotelCost)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          InputProps={{
                            inputComponent: NumberFormatter,
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let value = 0;

                            if (e.target.value === '') {
                              // set current field
                              props.formikBag.setFieldValue(field.name, 0);
                            } else {
                              value = parseFloat(e.target.value);

                              // set current field
                              props.formikBag.setFieldValue(field.name, value);
                            }

                            // set cost field
                            props.formikBag.setFieldValue(`items.${index}.costHotel`, value);
                          }}
                        />
                      );
                    }}
                  />
                  
                  <Field
                    key={index}
                    name={`items.${index}.isHotelByCompany`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => (
                      <FormControlLabel
                        label={props.intl.formatMessage(travelMessage.request.fieldFor(field.name, 'fieldName'))}
                        control={
                          <Checkbox 
                            {...field} 
                            value={field.value}
                            checked={props.formikBag.values.items[index].isHotelByCompany}
                          />
                        }
                        style={{width: '100%'}}
                      />
                    )}
                  />

                  <Field 
                    name={`items.${index}.notes`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.notes`);
                      const touch = getIn(form.touched, `items.${index}.notes`);

                      return (
                        <TextField 
                          {...field}
                          fullWidth
                          required
                          margin="normal"
                          autoComplete="off"
                          disabled={form.isSubmitting}
                          label={props.intl.formatMessage(travelMessage.request.field.note)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.note)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                  
                  <Field 
                    name={`items.${index}.duration`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.duration`);
                      const touch = getIn(form.touched, `items.${index}.duration`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(travelMessage.request.field.duration)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.duration)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                  
                  <Field 
                    name={`items.${index}.amount`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.amount`);
                      const touch = getIn(form.touched, `items.${index}.amount`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(travelMessage.request.field.amount)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.amount)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                  
                  <Field 
                    name={`items.${index}.currencyUid`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.currencyUid`);
                      const touch = getIn(form.touched, `items.${index}.currencyUid`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(travelMessage.request.field.currencyUid)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.currencyUid)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                  
                  <Field 
                    name={`items.${index}.currencyRate`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.currencyRate`);
                      const touch = getIn(form.touched, `items.${index}.currencyRate`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(travelMessage.request.field.currencyRate)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.currencyRate)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                  
                  <Field 
                    name={`items.${index}.diemValue`}
                    render={({ field, form }: FieldProps<ITravelSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.diemValue`);
                      const touch = getIn(form.touched, `items.${index}.diemValue`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(travelMessage.request.field.diemValue)}
                          placeholder={props.intl.formatMessage(travelMessage.request.field.diemValue)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          )
        }
      </React.Fragment>
    )}
  />
);

export default TravelItemPartialForm;