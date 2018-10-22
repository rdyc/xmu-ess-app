import { SubmissionProps } from '@layout/components/submission/Submission';
import { Button, Card, CardActions, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const SubmissionView: React.SFC<SubmissionProps> = props => (
  <Card square>
    <CardHeader 
      title={<FormattedMessage id={props.title || 'global.form.submit.title'}/>}
      subheader={<FormattedMessage id={props.subHeader || 'global.form.submit.subHeader'} />}
    />
    <CardActions>
      <Button 
        type="button"
        color="default"
        disabled={props.submitting}
        onClick={props.reset}
      >
        <FormattedMessage id={props.labelReset || 'global.action.reset' } />
      </Button>
      <Button 
        type="submit"
        color="secondary"
        disabled={!props.valid || props.submitting}
      >
        <FormattedMessage id={props.submitting ? 
          props.labelProcessing || 'global.processing' 
          : 
          props.labelSubmit || 'global.action.submit' } 
        />
      </Button>
    </CardActions>
  </Card>
);