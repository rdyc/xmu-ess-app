import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import * as React from 'react';
import {
  compose,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withStateHandlers,
} from 'recompose';

interface IOwnState {
  options: ISelectFieldOption[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
}

export type SettingOptionProps
  = IOwnState
  & IOwnStateUpdater;

const createProps: mapper<SettingOptionProps, IOwnState> = (): IOwnState => ({
  options: [{ label: '', value: ''}],
});

const stateUpdaters: StateUpdaters<SettingOptionProps, IOwnState, IOwnStateUpdater> = {
  setOptions: () => (values: string[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: '', value: ''}
    ];
        
    values.forEach(item => {
      const labels = item.split('.');
      
      options.push({ 
        value: item, 
        label: labels[labels.length - 1] 
      });
    });

    return {
      options
    };
  }
};

const lifeCycle: ReactLifeCycleFunctions<SettingOptionProps, IOwnState> = {
  componentDidMount() {    
    const data: string[] = [
      'Xmu.Ess.Module.HR.Notif.Job.Definitions.BirthdayNotificationJobDefinition',
      'Xmu.Ess.Module.HR.Notif.Job.Definitions.ExpiringContractNotificationJobDefinition',
      'Xmu.Ess.Module.HR.Notif.Job.Definitions.IncomingBirthdayNotificationJobDefinition'
    ];

    this.props.setOptions(data);
  }
};

const component: React.SFC<SettingOptionProps> = props => {
  const children = props.children as React.ReactElement<SelectFieldProps>;

  if (children) {
    return (
      <React.Fragment>
        {
          React.cloneElement(children, { 
            options: props.options,
            value: props.options.find(option => option.value === children.props.valueString)
          })
        }
      </React.Fragment>
    );
  }

  return <div></div>;
};

export const NotifSettingOption = compose<SettingOptionProps, {}>(
  setDisplayName('NotifSettingOption'),
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifeCycle)
)(component);