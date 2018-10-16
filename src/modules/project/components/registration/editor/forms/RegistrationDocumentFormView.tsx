import { Card, CardContent, CardHeader, Checkbox, FormControlLabel } from '@material-ui/core';
import { DocumentFormProps } from '@project/components/registration/editor/forms/RegistrationDocumentForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const DocumentFormView: React.SFC<DocumentFormProps> = props => {
  const { category, handleChange } = props;
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
                    <Checkbox 
                      value={item.type}
                      // checked={isChecked(item.type)}
                      onChange={() => handleChange(item)}
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