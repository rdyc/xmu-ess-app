import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, TextField } from '@material-ui/core';
import { DeleteForever, GroupAdd } from '@material-ui/icons';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { IPositionGetListFilter } from '@lookup/classes/filters';
import { LookupPositionOption } from '@lookup/components/position/options/LookupPositionOption';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { IOrganizationHierarchyFormValue } from '../OrganizationHierarchyForm';

type HierarchyItemPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IOrganizationHierarchyFormValue>;
  intl: InjectedIntl;
  filterLookupPosition: IPositionGetListFilter;
  filterCommonSystem: ISystemListFilter;
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
                    props.formikBag.values.items.length > 1 &&
                    <IconButton
                      disabled={props.formikBag.isSubmitting} 
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
                    name={`items.${index}.sequence`}
                    render={({ field, form }: FieldProps<IOrganizationHierarchyFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.sequence`);
                      const touch = getIn(form.touched, `items.${index}.sequence`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(organizationMessage.hierarchy.field.sequence)}
                          placeholder={props.intl.formatMessage(organizationMessage.hierarchy.field.sequence)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          InputProps={{
                            inputComponent: NumberFormatter,
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let thisSequence = 0;

                            if (e.target.value === '') {
                              // set current field
                              props.formikBag.setFieldValue(field.name, 0);
                              thisSequence = 0;
                            } else {
                              thisSequence = parseFloat(e.target.value);

                              // set current field
                              props.formikBag.setFieldValue(field.name, thisSequence);
                            }

                            // set sequence field
                            props.formikBag.setFieldValue(`items.${index}.sequence`, thisSequence);
                          }}
                        />
                      );
                    }}
                  />

                  <Field
                    name="positionUid"
                    render={({ field, form }: FieldProps<IOrganizationHierarchyFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.positionUid`);
                      const touch = getIn(form.touched, `items.${index}.positionUid`);

                      return (
                        <LookupPositionOption companyUid={props.formikBag.values.companyUid}>
                          <SelectField
                            isSearchable
                            menuPlacement="auto"
                            menuPosition="fixed"
                            isDisabled={props.formikBag.values.companyUid === '' || props.formikBag.isSubmitting}
                            isClearable={props.formikBag.values.items[index].positionUid !== ''}
                            escapeClearsValue={true}
                            valueString={props.formikBag.values.items[index].positionUid}
                            textFieldProps={{
                              label: props.intl.formatMessage(organizationMessage.hierarchy.field.positionUid),
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
                    name="relationType"
                    render={({ field, form }: FieldProps<IOrganizationHierarchyFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.relationType`);
                      const touch = getIn(form.touched, `items.${index}.relationType`);

                      return (
                        <CommonSystemOption category="relation" filter={props.filterCommonSystem}>
                          <SelectField
                            isSearchable
                            menuPlacement="auto"
                            menuPosition="fixed"
                            isDisabled={props.formikBag.isSubmitting}
                            isClearable={props.formikBag.values.items[index].relationType !== ''}
                            escapeClearsValue={true}
                            valueString={props.formikBag.values.items[index].relationType}
                            textFieldProps={{
                              label: props.intl.formatMessage(organizationMessage.hierarchy.field.relationType),
                              helperText: touch && error,
                              error: touch && Boolean(error)
                            }}
                            onMenuClose={() => props.formikBag.setFieldTouched(`items.${index}.relationType`)}
                            onChange={(selected: ISelectFieldOption) => {
                              props.formikBag.setFieldValue(`items.${index}.relationType`, selected && selected.value || '');
                            }}
                          />
                        </CommonSystemOption>
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
                  sequence: 1,
                  positionUid: '',
                  relationType: '',
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