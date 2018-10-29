import { FormMode } from '@generic/types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import { TravelitemFieldFormProps } from '@travel/components/request/editor/forms/TravelItemFieldForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

export const TravelItemFieldFormView: React.SFC<TravelitemFieldFormProps> = props => {
  const { formMode } = props;
  const { width, isOpen, onClose } = props;
  const { names } = props.context;

  const isMobile = isWidthDown('sm', width);

  const renderField = (name: string) => {
    const fieldName = name.replace('information.item', '');
    const fieldProps = props.generateFieldProps(name);

    const fields = ['uid'];
    if (formMode === FormMode.New && fields.indexOf(fieldName) !== -1) {
      return null;
    }

    return (
      <Field
        key={fieldName}
        name={fieldName}
        label={<FormattedMessage id={`travel.field.${name}`} />}
        {...fieldProps}
      />
    );    
  };

  const render = (
    <Dialog
      fullScreen={isMobile}
      open={isOpen}
      aria-labelledby="lookup-customer-dialog-title" 
      onClose={onClose}
    >
      <DialogTitle 
        id="lookup-customer-dialog-title"
        disableTypography
      >
        <Typography variant="title" color="primary">
          <FormattedMessage id="lookup.customer.lookupTitle" />
        </Typography>

        <Typography variant="subheading">
          <FormattedMessage id="lookup.customer.lookupDescription" />
        </Typography>
      </DialogTitle>
      <DialogContent
        style={{ 
          padding: 0 
        }}
      >
        {names.map(name => renderField(name))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="secondary">
          <FormattedMessage id="global.action.discard" />
        </Button>
      </DialogActions>
    </Dialog>
    // <Card square>
    //   <CardHeader 
    //     title={<FormattedMessage id="travel.infoTitle"/>}
    //     subheader={<FormattedMessage id="travel.infoSubTitle" />}
    //   />
    //   <CardContent>
    //     {names.map(name => renderField(name))}
    //   </CardContent>
    // </Card>
  );

  return render;
};
