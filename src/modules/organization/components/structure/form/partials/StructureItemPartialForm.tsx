import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight, DeleteForever, GroupAdd } from '@material-ui/icons';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { IPositionGetListFilter } from '@lookup/classes/filters';
import { LookupPositionOption } from '@lookup/components/position/options/LookupPositionOption';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import { IOrganizationStructureFormValue } from '../OrganizationStructureForm';

type HierarchyItemPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IOrganizationStructureFormValue>;
  intl: InjectedIntl;
  filterLookupPosition: IPositionGetListFilter;
  classes: {
    flexContent: string;
    marginFarRight: string;
  };
};

const HierarchyItemPartialForm: React.ComponentType<HierarchyItemPartialFormProps> = props => (
  <FieldArray
    name="items"
    render={(fields: FieldArrayRenderProps) => (
      <React.Fragment>
        {
          props.formikBag.values.items.length > 0 &&
          props.formikBag.values.items.map((item, index) =>
            <div className={props.classes.flexContent} key={index}>
              <Card square>
                <CardHeader 
                  title={`#${index + 1} - ${item.uid || 'Draft'}`}
                  action={
                    <IconButton 
                      onClick={() => {
                        // remove current
                        fields.remove(index);
                      }}
                    >
                      <DeleteForever />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Field
                    name="positionUid"
                    render={({ form }: FieldProps<IOrganizationStructureFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.positionUid`);
                      const touch = getIn(form.touched, `items.${index}.positionUid`);

                      return (
                        <LookupPositionOption filter={props.filterLookupPosition}>
                          <SelectField
                            isSearchable
                            menuPlacement="auto"
                            menuPosition="fixed"
                            isDisabled={props.formikBag.values.companyUid === '' || props.formikBag.isSubmitting}
                            isClearable={props.formikBag.values.items[index].positionUid !== ''}
                            escapeClearsValue={true}
                            valueString={props.formikBag.values.items[index].positionUid}
                            textFieldProps={{
                              label: props.intl.formatMessage(organizationMessage.structure.field.positionUid),
                              required: true,
                              helperText: touch && error,
                              error: touch && Boolean(error)
                            }}
                            onMenuClose={() => props.formikBag.setFieldTouched(`items.${index}.positionUid`)}
                            onChange={(selected: ISelectFieldOption) => {
                              props.formikBag.setFieldValue(`items.${index}.positionUid`, selected && selected.value || '');
                            }}
                          />
                        </LookupPositionOption>
                      );
                    }}
                  />

                  <Field
                    name="start"
                    render={({ field, form }: FieldProps<IOrganizationStructureFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.start`);
                      const touch = getIn(form.touched, `items.${index}.start`);

                      return (
                        <DatePicker
                          {...field}
                          fullWidth
                          margin="normal"
                          disabled={form.isSubmitting}
                          showTodayButton
                          required
                          label={props.intl.formatMessage(organizationMessage.structure.fieldFor(field.name, 'fieldName'))}
                          placeholder={props.intl.formatMessage(organizationMessage.structure.fieldFor(field.name, 'fieldPlaceholder'))}
                          value={props.formikBag.values.items[index].start}
                          leftArrowIcon={<ChevronLeft />}
                          rightArrowIcon={<ChevronRight />}
                          format="MMMM DD, YYYY"
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          onChange={(moment: Moment) => 
                            moment ? props.formikBag.setFieldValue(`items.${index}.start`, moment.format('YYYY-MM-DD'))
                            : props.formikBag.setFieldValue(`items.${index}.start`, '')}
                          invalidLabel=""
                        />
                      );
                    }}
                  />

                  <Field
                    name="end"
                    render={({ field, form }: FieldProps<IOrganizationStructureFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.end`);
                      const touch = getIn(form.touched, `items.${index}.end`);

                      return (
                        <DatePicker
                          {...field}
                          fullWidth
                          margin="normal"
                          disabled={form.isSubmitting}
                          showTodayButton
                          label={props.intl.formatMessage(organizationMessage.structure.fieldFor(field.name, 'fieldName'))}
                          placeholder={props.intl.formatMessage(organizationMessage.structure.fieldFor(field.name, 'fieldPlaceholder'))}
                          value={props.formikBag.values.items[index].end}
                          leftArrowIcon={<ChevronLeft />}
                          rightArrowIcon={<ChevronRight />}
                          format="MMMM DD, YYYY"
                          minDate={props.formikBag.values.items[index].start}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          onChange={(moment: Moment) => 
                            moment ? props.formikBag.setFieldValue(`items.${index}.end`, moment.format('YYYY-MM-DD'))
                            : props.formikBag.setFieldValue(`items.${index}.end`, '')}
                          invalidLabel=""
                        />
                      );
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          )
        }

        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader 
              title={props.intl.formatMessage(organizationMessage.hierarchy.section.itemTitle)}
              subheader={
                props.formikBag.submitCount > 0 &&
                typeof props.formikBag.errors.items === 'string' &&
                props.formikBag.errors.items
              }
              subheaderTypographyProps={{
                color: 'error',
                variant: 'body1'
              }}
            />
            <CardActions>
              <Button
                fullWidth
                color="primary" 
                disabled={props.formikBag.isSubmitting}
                onClick={() => fields.push({
                  uid: '',
                  positionUid: '',
                  start: '',
                  end: '',
                })}
              >
                <GroupAdd className={props.classes.marginFarRight}/>

                {props.intl.formatMessage(layoutMessage.action.add)}
              </Button>
            </CardActions>
          </Card>
          
        </div>
      </React.Fragment>
    )}
  />
);

export default HierarchyItemPartialForm;