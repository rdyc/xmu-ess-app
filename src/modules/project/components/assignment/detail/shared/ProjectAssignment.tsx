import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { IProjectAssignmentDetail } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  formMode: FormMode;
  data: IProjectAssignmentDetail | undefined;
  showProjectHours?: boolean | true;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const projectAssignment: React.SFC<AllProps> = props => {
  const { formMode, data, intl } = props;

  const styled = {
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
      readOnly: true
    }
  };

  const render = (
    <Card square>
      <CardHeader 
        title={intl.formatMessage(projectMessage.assignment.section.projectTitle)}
        subheader={intl.formatMessage(projectMessage.assignment.section.projectSubHeader)}
      />
      <CardContent>
        {
          props.formMode === FormMode.New &&
          props.children
        }

        {
          data &&
          <div>
            {
              formMode !== FormMode.New &&  
              <div>
                <TextField
                  {...styled}
                  margin="dense"
                  label={<FormattedMessage id="project.assignment.field.uid" />}
                  value={data.uid}
                />
                <TextField
                  {...styled}
                  margin="dense"
                  label={<FormattedMessage id="project.field.information.uid" />}
                  value={data.projectUid}
                />
              </div>
            }

            <TextField
              {...styled}
              margin="dense"
              label={<FormattedMessage id="project.field.information.ownerEmployeeUid" />}
              value={data.owner ? data.owner.fullName : 'N/A'}
            />
            <TextField
              {...styled}
              margin="dense"
              label={<FormattedMessage id="project.field.information.customerUid" />}
              value={data.customer ? data.customer.name : 'N/A'}
            />
            <TextField
              {...styled}
              margin="dense"
              label={<FormattedMessage id="project.field.information.projectType" />}
              value={data.project ? data.project.value : 'N/A'}
            />
            <TextField
              {...styled}
              margin="dense"
              label={<FormattedMessage id="project.field.information.name" />}
              value={data.name}
            />
            <TextField
              {...styled}
              margin="dense"
              label={<FormattedMessage id="project.field.information.description" />}
              value={data.description || 'N/A'}
            />
            <TextField
              {...styled}
              margin="dense"
              label={<FormattedMessage id="project.field.information.start" />}
              value={intl.formatDate(data.start, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            />
            <TextField
              {...styled}
              margin="dense"
              label={<FormattedMessage id="project.field.information.end" />}
              value={intl.formatDate(data.end, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            />
            {
              props.showProjectHours &&
              <div>
                <TextField
                  {...styled}
                  margin="dense"
                  label={<FormattedMessage id="project.field.information.hours" />}
                  value={intl.formatNumber(data.maxHours)}
                />
                <TextField
                  {...styled}
                  margin="dense"
                  label={<FormattedMessage id="project.assignment.field.assignedHours" />}
                  value={intl.formatNumber(data.assignedHours)}
                />
                <TextField
                  {...styled}
                  margin="dense"
                  label={<FormattedMessage id="project.assignment.field.unassignedHours" />}
                  value={intl.formatNumber(data.unassignedHours)}
                />
              </div>
            }
          </div>
        }
        
        {
          props.formMode !== FormMode.New &&
          props.children
        }
      </CardContent>
    </Card>
  );

  return render;
};

export const ProjectAssignment = compose<AllProps, OwnProps>(
  injectIntl
)(projectAssignment);