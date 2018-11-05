import { Card, CardContent, CardHeader, Checkbox, FormControlLabel } from '@material-ui/core';
import { ProjectDocumentFormProps } from '@project/components/registration/editor/forms/ProjectRegistrationDocumentForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

export const ProjectRegistrationDocumentFormView: React.SFC<ProjectDocumentFormProps> = props => {
  const { category } = props;
  const { isLoading, response } = category === 'project' ? 
    props.commonDocumentListState : 
    props.commonDocumentPresalesListState;

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id={`project.document.${category}Title`}/>}
        subheader={<FormattedMessage id={`project.document.${category}SubTitle`}/>}
      />
      <CardContent>
        {
          !isLoading &&
          response &&
          response.data &&
          response.data.map((item, index) => {
            return (
              <div key={index}>
                <FormControlLabel
                  label={item.name}
                  control={
                    <Field
                      type="checkbox"
                      name={`${category}[${index}].${item.type}`}
                      component={
                        ({ input, meta }: any) => (
                          <Checkbox 
                            {...input}
                            value={item.type}
                            disabled={meta.submitting}
                            onFocus={undefined}
                            onBlur={undefined}
                          />
                        )
                      }
                    />
                  } 
                />
              </div>
            );
          })
        }
      </CardContent>
    </Card>
  );

  return render;
};