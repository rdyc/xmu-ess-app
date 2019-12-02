import { IWebJobPage } from '@webjob/classes/types';
import { MonitoringTabs } from '@webjob/classes/types/monitoring/MonitoringTabs';
import { webjobPageChange } from '@webjob/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// const changePage = (detail: IWebJobPage) => dispatchEvent(new CustomEvent('webjob.page.change', { detail }));

interface PropsFromState {
  webJobPageState: {
    page: IWebJobPage;
  };
}

const mapStateToProps = ({ webJobPage }: IWebJobPage) => ({
  webJobPageState: {
    page: webJobPage
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  webJobPage: {
    changePage: (webjobPage: MonitoringTabs) =>
      dispatch(webjobPageChange(webjobPage))
  }
});

interface PropsFromDispatch {
  webJobPage: {
    changePage: typeof webjobPageChange;
  };
}

export interface WithWebJobPage extends PropsFromDispatch, PropsFromState {}

export const withWebJobPage = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);
