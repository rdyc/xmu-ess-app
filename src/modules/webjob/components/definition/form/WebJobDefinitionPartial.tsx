import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IWebJobDefinitoinFormValue } from './WebJobDefinitionForm';

type WebJobDefinitionPartialProps = {
  formikBag: FormikProps<IWebJobDefinitoinFormValue>;
  intl: InjectedIntl;
};

const WebJobDefinitionPartial: React.ComponentType<WebJobDefinitionPartialProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(webJobMessage.shared.section.infoTitle, {state: 'Definition'})}
    />
    <CardContent>
      <Field
        name="file"
        render={({ field, form }: FieldProps<IWebJobDefinitoinFormValue>) => (
          <div>
            <Typography>
              {props.intl.formatMessage(webJobMessage.definition.field.package)}
            </Typography>
            <input 
              id={field.name} 
              name={field.name} 
              type={field.name} 
              // accept=".zip, .rar ,.7zip"
              onChange={(event) => {
                const files = event.target.files && event.target.files;

                props.formikBag.setFieldValue(field.name, files);

                props.formikBag.setFieldValue('fileName', files && files[0].name);
                props.formikBag.setFieldValue('fileType', files && files[0].type);
                props.formikBag.setFieldValue('fileSize', files && files[0].size);
              }} 
              className="form-control" 
            />
          </div>
        )}
      />
    </CardContent>
  </Card>
);

export default WebJobDefinitionPartial;