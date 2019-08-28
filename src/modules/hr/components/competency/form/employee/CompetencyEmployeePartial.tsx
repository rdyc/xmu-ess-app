import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ICompetencyEmployeeFormValue } from './CompetencyEmployeeForm';

type CompetencyEmployeePartialProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ICompetencyEmployeeFormValue>;
  intl: InjectedIntl;
};

const CompetencyEmployeePartial: React.ComponentType<CompetencyEmployeePartialProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Responden'})}
    />
    <CardContent>
      <Field 
        name="responder"
        render={({ field}: FieldProps<ICompetencyEmployeeFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Responden'})}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
            value={'Aditya Meysin'}
          />
        )}
      />
      
    </CardContent>
  </Card>
);

export default CompetencyEmployeePartial;