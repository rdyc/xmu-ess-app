import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Card, CardHeader, Divider, FormControlLabel, IconButton, List, ListItem, ListItemSecondaryAction, Radio, Tooltip, WithStyles, withStyles } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import styles from '@styles';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { ICompetencyResponderFormValue } from './CompetencyResponderForm';
import { IndicatorDetail } from './IndicatorDetail';

interface IOwnProps {
  formMode: FormMode; 
  formikBag: FormikProps<ICompetencyResponderFormValue>;
  intl: InjectedIntl;
}

interface IOwnState {
  isIndicatorOpen: boolean;
}

interface IOwnHandler {
  handleOpenIndicator: () => void;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

type AllProps
  = IOwnProps
  & IOwnHandler
  & IOwnState
  & IOwnStateHandler
  & WithStyles<typeof styles>;
  
const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  isIndicatorOpen: false
});

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleOpenIndicator: (props: AllProps) => () => {
    props.stateUpdate({
      isIndicatorOpen: !props.isIndicatorOpen
    });
  }
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  stateUpdate: (prevState: IOwnState) => (newState: IOwnState) => ({
    ...prevState,
    ...newState
  })
};

const waini: React.ComponentType<AllProps> = props => (
  <React.Fragment>
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Strive for Excellence'})}
      />
      <List>
        <Divider />
        <ListItem>

          <Field 
            name="responder"
            render={({field}: FieldProps<ICompetencyResponderFormValue>) => (
              <FormControlLabel
                control={<Radio 
                  checked={props.formikBag.values.responder === '1'}
                  onChange={() => {
                    props.formikBag.setFieldValue('responder', '1');
                  }}
                />}
                label="1 - Fokus pada tugas yang diberikan"
                // value="1"
              />
            )}
          />
          <ListItemSecondaryAction>
            <Tooltip title="Indicator">
              <IconButton onClick={props.handleOpenIndicator}>
                <Info />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>        
          <Field 
            name="responder"
            render={() => (
              <FormControlLabel
              control={<Radio 
                checked={props.formikBag.values.responder === '2'}
                onChange={() => {
                  props.formikBag.setFieldValue('responder', '2');
                }}
              />}
                label="2 - Meningkatkan Kinerja"
                // value="2"
              />
            )}
          />
          <ListItemSecondaryAction>
            <Tooltip title="Indicator">
              <IconButton onClick={props.handleOpenIndicator}>
                <Info />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>        
          <Field 
            name="responder"
            render={() => (
              <FormControlLabel
                control={<Radio 
                  checked={props.formikBag.values.responder === '3'}
                  onChange={() => {
                    props.formikBag.setFieldValue('responder', '3');
                  }}
                />}
                label="3 - Mampu menetapkan ukuran dan target kerja pribadi "
                // value="3"
              />
            )}
          />
          <ListItemSecondaryAction>
            <Tooltip title="Indicator">
              <IconButton onClick={props.handleOpenIndicator}>
                <Info />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Card>
    <IndicatorDetail 
      isIndicatorOpen={props.isIndicatorOpen}
      handleOpenIndicator={props.handleOpenIndicator}
    />
  </React.Fragment>
);

export const Waini = compose<AllProps, IOwnProps>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(waini);