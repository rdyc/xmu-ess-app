import { LeaveApprovalProps } from '@leave/components/approval/editor/LeaveApprovalEditor';
import { Button, Card, CardActions, CardContent, CardHeader, TextField } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const LeaveApprovalEditorView: React.SFC<LeaveApprovalProps> = props => (
  <Card square>
    <CardHeader 
      title={<FormattedMessage id="global.form.approval.title"/>}
      subheader={<FormattedMessage id="global.form.approval.subHeader" />}
    />
    <CardContent>
      <TextField
        fullWidth
        id="remark"
        key="remark"
        name="remark"
        label="Remark"
      />
    </CardContent>
    <CardActions>
      <Button 
        type="submit"
        color="default"
      >
        <FormattedMessage id="global.action.reject" />
      </Button>
      <Button 
        type="submit"
        color="secondary"
      >
        <FormattedMessage id="global.action.approve" />
      </Button>
    </CardActions>
  </Card>
);