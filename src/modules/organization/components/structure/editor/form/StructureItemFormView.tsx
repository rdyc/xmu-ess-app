import { Button, Card, CardContent, CardHeader, Grid, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { Field } from 'redux-form';
import { StructureItemFormProps } from './StructureItemForm';

export const StructureItemFormView: React.SFC<StructureItemFormProps> = props => {
  const { intl, context } = props;
  const names = ['sequence', 'positionUid', 'relationType'];
  
  const renderField = (name: string, field: string) => {
    const fieldName = name.replace('items.', '');
    const fieldProps = props.generateFieldProps(fieldName);

    // don't show uid for new form
    const fields = ['uid'];
    if (fields.indexOf(fieldName) !== -1) {
      return null;
    }

    return (
      <Field
        key={fieldName}
        name={`${field}.${fieldName}`}
        {...fieldProps}
      />
    );
  };

  const render = (
    <Grid container spacing={8}>
    {
      context.fields.map((field, index) => {
        const item = context.fields.get(index);
        return (
          <Grid key={index} item xs={12}>
            <Card square>
              <CardHeader 
                action={
                  <IconButton onClick={() => context.fields.remove(index)}>
                    <DeleteForeverIcon />
                  </IconButton>
                }
                title={item.uid && `#${item.sequence} - ${item.uid}` || intl.formatMessage(organizationMessage.structure.text.draft)}
              />
              <CardContent>
                {names.map(name => renderField(name, field))}
              </CardContent>
            </Card>
          </Grid>
        );
      })
    }
      <Grid item xs={12} md={4}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <Button onClick={() => context.fields.push({
              uid: undefined,
              sequence: 1,
              positionUid: undefined,
              relationType: undefined
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