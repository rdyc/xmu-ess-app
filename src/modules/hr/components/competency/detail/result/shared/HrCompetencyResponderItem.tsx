import { IHrCompetencyEmployeeDetailList } from '@hr/classes/response';
import { WithHrCompetencyMapped, withHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Card,
  CardHeader,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, mapper, ReactLifeCycleFunctions, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface IOwnOption {
  positionUid: string;
  data: IHrCompetencyEmployeeDetailList[];
}

interface IOwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (uid: string) => IOwnState;
}

type AllProps
  = IOwnState
  & IOwnOption
  & IOwnStateHandler
  & InjectedIntlProps
  & WithHrCompetencyMapped
  & WithStyles<typeof styles>;

const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  handleToggle: (state: IOwnState) => (uid: string) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

const hrCompetencyResponderItem: React.SFC<AllProps> = props => {
  const { intl, active, isExpanded, handleToggle, data } = props;
  const { response: mappedResponse } = props.hrCompetencyMappedState.list;

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Responder'})}
      />
      <List>
        {
          data &&
          data.map(item => 
            !item.isHR &&
            <React.Fragment key={item.uid}>
              <Divider />
              <ListItem
                button
                selected={item.uid === active && isExpanded}
                onClick={() => handleToggle(item.uid)}
              >
                <ListItemText
                  primary={item.employee && item.employee.fullName}
                />
                <ListItemSecondaryAction>
                  {active === item.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
                </ListItemSecondaryAction>
              </ ListItem>
              <Collapse
                in={active === item.uid && isExpanded}
                className={props.classes.marginFarLeft}
                timeout="auto"
                unmountOnExit
              >
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(hrMessage.competency.field.type, {state: 'Status'})}
                  value={!item.isExpired ? item.status && item.status.value : intl.formatMessage(hrMessage.competency.field.type, {state: 'Expired'})}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(hrMessage.competency.field.type, {state: 'Score'})}
                  value={item.score || 'N/A'}
                />
                <Divider style={{marginRight: '24px'}} />
                {
                  mappedResponse &&
                  mappedResponse.data &&
                  mappedResponse.data[0] &&
                  mappedResponse.data[0].categories.map(category => {
                    const findData = item.items.find(find => find.categoryUid === category.category.uid);
                    if (item.items.length > 0 && findData) {
                      return (
                        <TextField
                          {...GlobalStyle.TextField.ReadOnly}
                          multiline
                          margin="dense"
                          value={`${category.category.name} - Level ${findData.level && findData.level.level}`}
                        />
                      );
                      
                    } 

                    return (
                      <TextField
                        {...GlobalStyle.TextField.ReadOnly}
                        multiline
                        className={props.classes.textStrikethrough}
                        margin="dense"
                        value={category.category.name}
                      />
                    );
                  })
                }
              </Collapse>
            </React.Fragment>  
          )
        }
      </List>
    </Card>
  );

  return render;
};

const lifecycles: ReactLifeCycleFunctions<AllProps, IOwnState> = {
  componentDidMount() {
    const { positionUid } = this.props;    
    const { response: mappedResponse, isLoading: mappedLoading, request: mappedRequest } = this.props.hrCompetencyMappedState.list;
    const { loadListRequest } = this.props.hrCompetencyMappedDispatch;

    if (!mappedLoading && (!mappedResponse || mappedRequest && mappedRequest.filter && mappedRequest.filter.positionUid !== positionUid)) {
      loadListRequest({
        filter: {
          positionUid
        }
      });
    }
  }
};

export const HrCompetencyResponderItem = compose<AllProps,  IOwnOption>(
  injectIntl,
  withHrCompetencyMapped,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifecycles),
)(hrCompetencyResponderItem);