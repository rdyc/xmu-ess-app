import { Button, Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { InjectedFormProps } from 'redux-form';

const submitForm: React.SFC<InjectedFormProps> = props => (
  <Card square>
    <CardHeader 
      title={<FormattedMessage id="global.form.submit.title"/>}
      subheader={<FormattedMessage id="global.form.submit.subHeader" />}
    />
    <CardContent>

    </CardContent>
    <CardActions>
      <Button 
        type="button"
        color="default"
        disabled={props.submitting}
        onClick={props.reset}
      >
        <FormattedMessage id={'global.action.reset' } />
      </Button>
      <Button 
        type="submit"
        color="secondary"
        disabled={!props.valid || props.submitting}
      >
        <FormattedMessage id={props.submitting ? 'global.processing' : 'global.action.submit' } />
      </Button>
    </CardActions>
  </Card>
);

export const SubmitForm = submitForm;