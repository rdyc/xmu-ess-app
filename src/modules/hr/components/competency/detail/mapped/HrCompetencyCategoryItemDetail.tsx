import { IHrCompetencyMappedDetail } from '@hr/classes/response';
import { WithHrCompetencyCluster, withHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import {
  Card,
  CardHeader,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, mapper, ReactLifeCycleFunctions, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface IOwnOption {
  data: IHrCompetencyMappedDetail;
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
  & WithHrCompetencyCluster
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
const hrCompetencyCategoryItemDetail: React.SFC<AllProps> = props => {
  const { data, intl, active, isExpanded, handleToggle } = props;
  const { response } = props.hrCompetencyClusterState.list;

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(hrMessage.competency.field.type, {state: 'Categories'})}
        // subheader={intl.formatMessage(hrMessage.request.field.subHeader)}
      />
      <List>
        {
          response &&
          response.data &&
          response.data.map((item) => 
            <React.Fragment key={item.uid}>
              <Divider />
              <ListItem
                button
                selected={item.uid === active && isExpanded}
                onClick={() => handleToggle(item.uid)}
              >
                <ListItemText
                  className={data.categories.find(find => find.category.competencyUid === item.uid) ? '' : props.classes.textStrikethrough}
                  primary={item.name}
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
                {
                  item.categories.map(category => 
                    data.categories.find(find => find.category.uid === category.uid) ?
                      <ListItem
                        key={category.uid}
                        color="inherit"
                        className={props.classes.marginFarLeft}
                      >
                        <ListItemText
                            primary={category.name}
                            primaryTypographyProps={{
                              noWrap: true,
                              color: 'inherit'
                            }}
                        />
                      </ListItem>
                      :
                      <ListItem
                        key={category.uid}
                        color="inherit"
                        className={props.classes.marginFarLeft}
                      >
                        <ListItemText
                            className={props.classes.textStrikethrough}
                            primary={category.name}
                            primaryTypographyProps={{
                              noWrap: true,
                              color: 'inherit'
                            }}
                        />
                      </ListItem>
                  )
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
    const { response } = this.props.hrCompetencyClusterState.list;
    const { loadListRequest } = this.props.hrCompetencyClusterDispatch;

    if (!response) {
      loadListRequest({
        filter: {
          orderBy: 'name',
          direction: 'ascending'
        }
      });
    }
  }
};

export const HrCompetencyCategoryItemDetail = compose<AllProps,  IOwnOption>(
  injectIntl,
  withHrCompetencyCluster,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifecycles),
)(hrCompetencyCategoryItemDetail);