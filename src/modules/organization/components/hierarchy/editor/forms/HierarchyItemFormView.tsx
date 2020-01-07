import { SelectSystem } from '@common/components/select';
import { InputNumber } from '@layout/components/input/number';
import { SelectPosition } from '@lookup/components/position/select';
import { Button, Card, CardContent, CardHeader, Grid, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { Field, WrappedFieldArrayProps } from 'redux-form';
import { HierarchyFormProps, OrganizationHierarchyItemFormData } from './HierarchyForm';

export const HierarchyItemFormView: React.SFC<WrappedFieldArrayProps<OrganizationHierarchyItemFormData> & HierarchyFormProps> = props => {
  const { intl } = props;
  // const names = ['sequence', 'positionUid', 'relationType'];
  
  // const renderField = (name: string, field: string) => {
  //   const fieldName = name.replace('items.', '');
  //   const fieldProps = props.generateFieldProps(fieldName);

  //   // don't show uid for new form
  //   const fields = ['uid'];
  //   if (fields.indexOf(fieldName) !== -1) {
  //     return null;
  //   }

  //   return (
  //     <Field
  //       key={fieldName}
  //       name={`${field}.${fieldName}`}
  //       {...fieldProps}
  //     />
  //   );
  // };
  // const positionFilter: any = {
  //   companyUid: props.companyUidValue,
  // };

  const render = (
    <Grid container spacing={8}>
    {
      props.fields.map((field, index) => {
        // const item = props.fields.get(index);
        return (
          <Grid key={index} item xs={12}>
            <Card square>
              <CardHeader 
                action={
                  props.fields.length > 1 &&
                  <IconButton onClick={() => props.fields.remove(index)}>
                    <DeleteForeverIcon />
                  </IconButton>
                }
                title={`Hierarchy Item - #${index + 1}`}
              />
              <CardContent>
                {/* {names.map(name => renderField(name, field))} */}
                <div>
                  <Field 
                    type="number"
                    name={`${field}.sequence`}
                    required={true}
                    label={intl.formatMessage(organizationMessage.hierarchy.field.sequence)}
                    placeholder={intl.formatMessage(organizationMessage.hierarchy.field.sequencePlaceholder)}
                    component={InputNumber}
                  />
                  <Field 
                    // type="text"
                    name={`${field}.positionUid`}
                    required={true}
                    disabled={props.companyUidValue === undefined || props.companyUidValue === null}
                    label={intl.formatMessage(organizationMessage.hierarchy.field.positionUid)}
                    placeholder={intl.formatMessage(organizationMessage.hierarchy.field.positionUid)}
                    filter={{
                      companyUid: props.companyUidValue
                    }}
                    component={SelectPosition}
                  />
                  <Field 
                    // type="number"
                    name={`${field}.relationType`}
                    label={intl.formatMessage(organizationMessage.hierarchy.field.relationType)}
                    placeholder={intl.formatMessage(organizationMessage.hierarchy.field.relationTypePlaceholder)}
                    category="relation"
                    component={SelectSystem}
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
              sequence: 1,
              positionUid: undefined,
              relationType: undefined
            })}
            >
              {intl.formatMessage(organizationMessage.hierarchy.text.addItem)}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return render;
};