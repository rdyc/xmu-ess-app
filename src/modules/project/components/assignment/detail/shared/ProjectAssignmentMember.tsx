import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import { IProjectAssignmentDetailItem } from '@project/classes/response';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface OwnProps {
  data: IProjectAssignmentDetailItem[] | null | undefined;
}

interface OwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface OwnStateHandler extends StateHandlerMap<OwnState> {
  handleToggle: (type: string) => OwnState;
}

type AllProps 
  = OwnProps
  & OwnState
  & OwnStateHandler
  & InjectedIntlProps;

const projectAssignmentMember: React.SFC<AllProps> = props => {
  const { data, intl, active, isExpanded, handleToggle } = props;

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
        title={<FormattedMessage id="project.assignment.section.member.title"/>}
        subheader={<FormattedMessage id="project.assignment.section.member.subHeader" />}
      />
      <CardContent>
        <List>
          { 
            data &&
            data.length === 0 &&
            <ListItem>
              <ListItemText
                primary={<FormattedMessage id="project.assignment.message.members.empty" />}
                primaryTypographyProps={{align: 'center'}} 
              />
            </ListItem>
          }
          {
            data &&
            data.map(item => 
              item.employee &&
              <div key={item.uid}>
                <ListItem 
                  disableGutters
                  button 
                  onClick={() => handleToggle(item.uid)}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={item.employee.fullName} 
                    >
                      <PersonIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.employee.fullName} 
                    secondary={item.employee.email}
                  />
                  <ListItemSecondaryAction>
                    {active === item.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </ListItemSecondaryAction>
                </ListItem>
                <Collapse
                  in={active === item.uid && isExpanded}
                  timeout="auto"
                  unmountOnExit
                >
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="project.assignment.field.item.status" />}
                    value={item.status ? item.status.value : item.statusType}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="project.assignment.field.item.role" />}
                    value={item.role || '-'}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="project.assignment.field.item.jobDesc" />}
                    value={item.jobDescription || '-'}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="project.assignment.field.item.mandays" />}
                    value={intl.formatNumber(item.mandays)}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="project.assignment.field.item.hours" />}
                    value={intl.formatNumber(item.hours)}
                  />
                  <Divider />
                </Collapse>
              </div>
            )
          }
        </List>

        {props.children}
      </CardContent>
    </Card>
  );

  return render;
};

const createProps: mapper<AllProps, OwnState> = (props: AllProps): OwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateHandler> = {
  handleToggle: (state: OwnState) => (type: string) => ({
    active: type,
    isExpanded: state.active === type ? !state.isExpanded : true
  })
};

export const ProjectAssignmentMember = compose<AllProps, OwnProps>(
  injectIntl,
  withStateHandlers<OwnState, OwnStateHandler>(createProps, stateUpdaters)
)(projectAssignmentMember);