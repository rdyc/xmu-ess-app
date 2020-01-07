import { LeaveType } from '@common/classes/types';
import { ILookupLeaveList } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import {
  Button,
  Chip,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { LeaveDetail } from './LeaveDetail';

interface IOwnProps {
  items: ILookupLeaveList[];
}

interface IOwnState {
  isExpanded: boolean;
  isDetailOpen: boolean;
  data?: ILookupLeaveList;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: () => IOwnState;
  handleDetail: (data?: ILookupLeaveList) => IOwnState;
  handleDetailClosed: () => IOwnState;
}

type AllProps
  = IOwnProps
  & IOwnState
  & IOwnStateHandler
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  isExpanded: false,
  isDetailOpen: false
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  handleToggle: (state: IOwnState) => () => ({
    isExpanded: !state.isExpanded
  }),
  handleDetail: (state: IOwnState) => (data?: ILookupLeaveList) => ({
    data,
    isDetailOpen: !state.isDetailOpen
  }),
  handleDetailClosed: (state: IOwnState) => () => ({
    isDetailOpen: false
  }),
};

const leaveInfo: React.SFC<AllProps> = props => {
  const { items, intl, isExpanded, handleToggle, handleDetail } = props;

  const render = (
    <React.Fragment>

      <Grid container spacing={24} className={props.classes.leaveTop}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <div style={{display: 'flex', width: '100%'}}>  
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <List>
                    <Divider />
                    <ListItem>
                      <ListItemText 
                        style={{textAlign: 'right', padding: '0'}}
                        primary={intl.formatMessage(lookupMessage.leave.field.cutiTahunan)}
                      />
                    </ListItem>
                    <Divider />
                    <Collapse
                      in={isExpanded}
                      className={props.classes.marginFar}
                      timeout="auto"
                      unmountOnExit
                    >
                      {
                        items.map((item) =>
                          item.categoryType === LeaveType.CutiTahunan &&
                          <div key={item.uid} style={{textAlign: 'right'}}>
                            <Chip 
                              variant="outlined"
                              onClick={() => handleDetail(item)}
                              style={{marginBottom: '8px'}}
                              label={
                                  `${item.name} - ${item.allocation} Hari`
                              }
                            />
                          </div>
                        )
                      }
                    </Collapse>
                  </List>
                </Grid>

                <Button variant="outlined" color="default" onClick={handleToggle} style={{maxHeight: '66px'}}>
                  {isExpanded ? <ExpandLess /> : <ExpandMore />}
                </Button>
                {/* <Grid item xs={2} md={2} lg={2} xl={2}>
                  <Button variant="outlined" color="default" onClick={handleToggle} style={{width: '100%', height: '100%', maxHeight: '66px'}}>
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </Button>
                </Grid> */}

                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <List>
                    <Divider />
                    <ListItem>
                      <ListItemText 
                        primary={intl.formatMessage(lookupMessage.leave.field.cutiKhusus)}
                      />
                    </ListItem>
                    <Divider />
                    <Collapse
                      in={isExpanded}
                      className={props.classes.marginFar}
                      timeout="auto"
                      unmountOnExit
                    >
                      {
                        items.map((item) =>
                          item.categoryType === LeaveType.CutiKhusus &&
                          <Typography align="left" key={item.uid}>
                            {`${item.name} - ${item.allocation} Hari`}
                          </Typography>
                        )
                      }
                    </Collapse>
                  </List>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {
        props.data &&
        <LeaveDetail 
          data={props.data}
          isDetailOpen={props.isDetailOpen}
          handleClosed={props.handleDetailClosed}
        />
      }
    </React.Fragment>
  );

  return render;
};

export const LeaveInfo = compose<AllProps, IOwnProps>(
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(leaveInfo);