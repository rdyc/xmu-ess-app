import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ICompetencyResponderFormValue } from './CompetencyResponderForm';

type CompetencyResponderPartialProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ICompetencyResponderFormValue>;
  intl: InjectedIntl;
};

const CompetencyResponderPartial: React.ComponentType<CompetencyResponderPartialProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Responden'})}
    />
    <CardContent>
      <Field 
        name="responder"
        render={({ field}: FieldProps<ICompetencyResponderFormValue>) => (
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

export default CompetencyResponderPartial;