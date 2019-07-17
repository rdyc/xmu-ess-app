import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel } from '@material-ui/core';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IExperienceFormValue } from '../ExperienceForm';

type ExperienceCompetencyPartialFormProps = {
  formMode: FormMode;
  formikBag: FormikProps<IExperienceFormValue>;
  intl: InjectedIntl;
};

const ExperienceCompetencyPartialForm: React.ComponentType<ExperienceCompetencyPartialFormProps> = props => (
  <React.Fragment>
    <Card square>
      <CardHeader title={props.intl.formatMessage(accountMessage.shared.section.competency)}/>
      <CardContent>
        <FieldArray 
          name="competencies"
          render={(fields: FieldArrayRenderProps) => (
            <React.Fragment>
              {
                props.formikBag.values.competencies &&
                props.formikBag.values.competencies.map((item, index) => 
                  <Field 
                    key={index}
                    name={`competencies.${index}.isChecked`}
                    render={({field, form}: FieldProps<IExperienceFormValue>) => (
                      <FormControlLabel 
                        label={item.label}
                        control={
                          <Checkbox 
                            {...field}
                            value={item.value}
                            checked={item.isChecked}
                          />
                        }
                        style={{width: '100%'}}
                      />
                    )}
                  />
                )
              }
            </React.Fragment>
          )}
        />
      </CardContent>
    </Card>
  </React.Fragment>
);

export default ExperienceCompetencyPartialForm;