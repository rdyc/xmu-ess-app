// import { AppRole } from '@constants/AppRole';
// import { IHrCompetencyIndicatorUserAction } from '@hr/classes/types';
// import { WithHrCompetencyIndicator, withHrCompetencyIndicator } from '@hr/hoc/withHrCompetencyIndicator';
// import { IPopupMenuOption } from '@layout/components/PopupMenu';
// import { WithOidc, withOidc } from '@layout/hoc/withOidc';
// import { WithUser, withUser } from '@layout/hoc/withUser';
// import { layoutMessage } from '@layout/locales/messages';
// import { InjectedIntlProps, injectIntl } from 'react-intl';
// import { RouteComponentProps, withRouter } from 'react-router';
// import {
//   compose,
//   HandleCreators,
//   lifecycle,
//   mapper,
//   ReactLifeCycleFunctions,
//   setDisplayName,
//   StateHandler,
//   StateHandlerMap,
//   StateUpdaters,
//   withHandlers,
//   withStateHandlers,
// } from 'recompose';

// import { HrCompetencyIndicatorDetailView } from './HrCompetencyIndicatorDetailView';

// interface IOwnRouteParams {
//   levelUid: string;
//   indicatorUid: string;
//   categoryUid: string;
//   clusterUid: string;
// }

// interface IOwnHandler {
//   handleOnLoadApi: () => void;
//   handleOnSelectedMenu: (item: IPopupMenuOption) => void;
// }

// interface IOwnState {
//   menuOptions?: IPopupMenuOption[];
//   shouldLoad: boolean;
//   isAdmin: boolean;
//   action?: IHrCompetencyIndicatorUserAction;
// }

// interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
//   setOptions: StateHandler<IOwnState>;
//   setShouldLoad: StateHandler<IOwnState>;
// }

// export type HrCompetencyIndicatorDetailProps
//   = WithOidc
//   & WithUser
//   & WithHrCompetencyIndicator
//   & RouteComponentProps<IOwnRouteParams>
//   & InjectedIntlProps
//   & IOwnState
//   & IOwnStateUpdaters
//   & IOwnHandler;

// const createProps: mapper<HrCompetencyIndicatorDetailProps, IOwnState> = (props: HrCompetencyIndicatorDetailProps): IOwnState => { 
//     // checking admin status
//     const { user } = props.oidcState;
//     let isAdmin: boolean = false;
  
//     if (user) {
//       const role: string | string[] | undefined = user.profile.role;
  
//       if (role) {
//         if (Array.isArray(role)) {
//           isAdmin = role.indexOf(AppRole.Admin) !== -1;
//         } else {
//           isAdmin = role === AppRole.Admin;
//         }
//       }
//     }
    
//     return { 
//       isAdmin,
//       shouldLoad: false
//   };
// };

// const stateUpdaters: StateUpdaters<HrCompetencyIndicatorDetailProps, IOwnState, IOwnStateUpdaters> = {
//   setShouldLoad: (state: IOwnState, props: HrCompetencyIndicatorDetailProps) => (): Partial<IOwnState> => ({
//     shouldLoad: !state.shouldLoad
//   }),
//   setOptions: (prevState: IOwnState, props: HrCompetencyIndicatorDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
//     menuOptions: options
//   })
// };

// const handlerCreators: HandleCreators<HrCompetencyIndicatorDetailProps, IOwnHandler> = {
//   handleOnLoadApi: (props: HrCompetencyIndicatorDetailProps) => () => { 
//     const { user } = props.userState;
//     const clusterUid = props.match.params.clusterUid;
//     const categoryUid = props.match.params.categoryUid;
//     const levelUid = props.match.params.levelUid;
//     const indicatorUid = props.match.params.indicatorUid;
//     const { isLoading } = props.hrCompetencyIndicatorState.detail;

//     if (user && clusterUid && categoryUid && levelUid && indicatorUid && !isLoading) {
//       props.hrCompetencyIndicatorDispatch.loadDetailRequest({
//         clusterUid,
//         categoryUid,
//         levelUid,
//         indicatorUid
//       });
//     }
//   },
//   handleOnSelectedMenu: (props: HrCompetencyIndicatorDetailProps) => (item: IPopupMenuOption) => {
//     switch (item.id) {
//       case IHrCompetencyIndicatorUserAction.Refresh:
//         props.setShouldLoad();
//         break;

//       default:
//         break;
//     }
//   }
// };

// const lifecycles: ReactLifeCycleFunctions<HrCompetencyIndicatorDetailProps, IOwnState> = {
//   componentDidUpdate(prevProps: HrCompetencyIndicatorDetailProps) {
//     // handle updated reload state
//     if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
//       this.props.setShouldLoad();
//       this.props.handleOnLoadApi();
//     }
    
//     // handle updated route params
//     if (this.props.match.params.indicatorUid !== prevProps.match.params.indicatorUid) {
//       this.props.handleOnLoadApi();
//     }

//       // handle updated response state
//     if (this.props.hrCompetencyIndicatorState.detail.response !== prevProps.hrCompetencyIndicatorState.detail.response) {
//       const { isLoading } = this.props.hrCompetencyIndicatorState.detail;

//       const options: IPopupMenuOption[] = [
//         {
//           id: IHrCompetencyIndicatorUserAction.Refresh,
//           name: this.props.intl.formatMessage(layoutMessage.action.refresh),
//           enabled: !isLoading,
//           visible: true,
//         }
//       ];

//       this.props.setOptions(options);
//     }
//   }
// }; 

// export const HrCompetencyIndicatorDetail = compose(
//   withRouter,
//   withOidc,
//   withUser,
//   withHrCompetencyIndicator,
//   injectIntl,
//   withStateHandlers(createProps, stateUpdaters),
//   withHandlers(handlerCreators),
//   lifecycle(lifecycles),
//   setDisplayName('HrCompetencyIndicatorDetail')
// )(HrCompetencyIndicatorDetailView);