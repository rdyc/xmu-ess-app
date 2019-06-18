import { InputDate } from '@layout/components/input/date';
import { SelectPosition } from '@lookup/components/position/select';
import { Button, Card, CardContent, CardHeader, Grid, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { Field, WrappedFieldArrayProps } from 'redux-form';
import { OrganizationStructureItemFormData, StructureFormProps } from './StructureForm';

export const StructureItemFormView: React.SFC<WrappedFieldArrayProps<OrganizationStructureItemFormData> & StructureFormProps> = props => {
  const { intl } = props;
  // const names = ['uid', 'positionUid', 'start', 'end'];
  
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
                  <IconButton onClick={() => props.fields.remove(index)}>
                    <DeleteForeverIcon />
                  </IconButton>
                }
                title={`Structure Item - #${index + 1}`}
              />
              <CardContent>
                <div>
                  <Field 
                    name={`${field}.positionUid`}
                    required={true}
                    label={intl.formatMessage(organizationMessage.structure.field.positionUid)}
                    placeholder={intl.formatMessage(organizationMessage.structure.field.positionUid)}
                    filter={{
                      companyUid: props.companyUidValue
                    }}
                    component={SelectPosition}
                  />
                  <Field 
                    name={`${field}.start`}
                    required={true}
                    label={intl.formatMessage(organizationMessage.structure.field.start)}
                    placeholder={intl.formatMessage(organizationMessage.structure.field.startPlaceholder)}
                    // disabled={}
                    // maxDate={props.inactiveDateValue}
                    component={InputDate}
                  />
                  <Field 
                    name={`${field}.end`}
                    label={intl.formatMessage(organizationMessage.structure.field.end)}
                    placeholder={intl.formatMessage(organizationMessage.structure.field.endPlaceholder)}
                    // disabled={}
                    // maxDate={props.inactiveDateValue}
                    component={InputDate}
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
              positionUid: undefined,
              start: undefined,
              end: undefined
            })}
            >
              {intl.formatMessage(organizationMessage.structure.text.addItem)}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return render;
};