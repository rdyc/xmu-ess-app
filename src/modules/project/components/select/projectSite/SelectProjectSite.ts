import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { IProjectSiteGetRequest } from '@project/classes/queries/site';
import { IProjectSite } from '@project/classes/response';
import { WithProjectSite, withProjectSite } from '@project/hoc/withProjectSite';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, shallowEqual, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { SelectProjectSiteView } from './SelectProjectSiteView';

interface OwnProps extends IProjectSiteGetRequest, WrappedFieldProps, BaseFieldProps { 
  placeholder?: string;
  required?: boolean;
  label?: string; 
  disabled?: boolean;
  onSelected?: (site?: IProjectSite) => void;
}

interface OwnHandlers {
  handleOnLoadApi: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type SelectProjectSiteProps 
  = WithProjectSite
  & WithWidth
  & OwnProps
  & OwnHandlers;
  
const handlerCreators: HandleCreators<SelectProjectSiteProps, OwnHandlers> = {
  handleOnLoadApi: (props: SelectProjectSiteProps) => () => {
    props.projectSiteDispatch.loadRequest({
      companyUid: props.companyUid,
      projectUid: props.projectUid,
    });
  },
  handleOnChange: (props: SelectProjectSiteProps) => (e: React.ChangeEvent<HTMLSelectElement>) => { 
    const { input, onSelected } = props;
    const { response } = props.projectSiteState;

    const value = e.target.value;
    
    input.onChange(value);

    if (response && response.data) {
      const site = response.data.filter(item => item.uid === value)[0];

      if (onSelected) {
        onSelected(site);
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<SelectProjectSiteProps, {}> = {
  componentDidMount() {
    const { request } = this.props.projectSiteState;

    // 1st load only when request are empty
    if (!request) {
      this.props.handleOnLoadApi();
    } else {
      // 2nd load only when request are present
      // comparing filter props
      const shouldUpdate = !shallowEqual(
        {
          companyUid: request.companyUid,
          projectUid: request.projectUid
        }, 
        {
          companyUid: this.props.companyUid,
          projectUid: this.props.projectUid
        }
      );

      // then should update the list?
      if (shouldUpdate) {
        this.props.handleOnLoadApi();
      }
    }
  }
};

export const SelectProjectSite = compose<SelectProjectSiteProps, OwnProps>(
  withProjectSite,
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withWidth()
)(SelectProjectSiteView);