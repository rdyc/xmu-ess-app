import { AccountEmployeeFamilyFormProps } from '@account/components/editor/form/family/AccountEmployeeFamilyForm';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystem } from '@common/components/select';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as React from 'react';
import { Field } from 'redux-form';

export const AccountEmployeeFamilyFormView: React.SFC<AccountEmployeeFamilyFormProps> = props => {
  const { context } = props;
  
  const render = (
    <Grid container spacing={16}>
      {
        context.fields.map((field, index) =>
          <Grid key={index} item xs={12} md={4}>
            <Card square>
              <CardHeader
                action={
                  context.fields.length > 1 ?
                  <IconButton onClick={() => context.fields.remove(index)}>
                    <DeleteForeverIcon />
                  </IconButton>
                  : ''
                }
                title={`#${index + 1}`}
              />
              <CardContent>
                <div>
                  <Field
                    type="text"
                    name={`${field}.familyType`}
                    label={props.intl.formatMessage(accountMessage.employee.field.familyType)}
                    required
                    component={SelectSystem}
                    category="family"
                  />
                  <Field
                    type="text"
                    name={`${field}.fullName`}
                    label={props.intl.formatMessage(accountMessage.employee.field.name)}
                    required
                    component={InputText}
                  />
                  <Field
                    type="text"
                    name={`${field}.genderType`}
                    label={props.intl.formatMessage(accountMessage.employee.field.gender)}
                    required
                    component={SelectSystem}
                    category="gender"
                  />
                  <Field
                    type="text"
                    name={`${field}.birthPlace`}
                    label={props.intl.formatMessage(accountMessage.employee.field.birthPlace)}
                    required
                    component={InputText}
                  />
                  <Field
                    type="number"
                    name={`${field}.birthDate`}
                    label={props.intl.formatMessage(accountMessage.employee.field.birthDate)}
                    required
                    component={InputDate}
                    // maxDate={}
                    // minDate={}
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
                employeeUid: undefined,
                familyType: undefined,
                gender: undefined,
                fullName: undefined,
                birthPlace: '',
                birthDate: undefined,
            })}>
              {props.intl.formatMessage(accountMessage.employee.action.add)}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return render;
};