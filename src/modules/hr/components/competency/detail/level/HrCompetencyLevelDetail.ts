// import { AppRole } from '@constants/AppRole';
// import { IHrCompetencyLevelUserAction } from '@hr/classes/types';
// import { WithHrCompetencyLevel, withHrCompetencyLevel } from '@hr/hoc/withHrCompetencyLevel';
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

// import { HrCompetencyLevelDetailView } from './HrCompetencyLevelDetailView';

// interface IOwnRouteParams {
//   levelUid: string;
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
//   action?: IHrCompetencyLevelUserAction;
// }

// interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
//   setOptions: StateHandler<IOwnState>;
//   setShouldLoad: StateHandler<IOwnState>;
// }

// export type HrCompetencyLevelDetailProps
//   = WithOidc
//   & WithUser
//   & WithHrCompetencyLevel
//   & RouteComponentProps<IOwnRouteParams>
//   & InjectedIntlProps
//   & IOwnState
//   & IOwnStateUpdaters
//   & IOwnHandler;

// const createProps: mapper<HrCompetencyLevelDetailProps, IOwnState> = (props: HrCompetencyLevelDetailProps): IOwnState => { 
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

// const stateUpdaters: StateUpdaters<HrCompetencyLevelDetailProps, IOwnState, IOwnStateUpdaters> = {
//   setShouldLoad: (state: IOwnState, props: HrCompetencyLevelDetailProps) => (): Partial<IOwnState> => ({
//     shouldLoad: !state.shouldLoad
//   }),
//   setOptions: (prevState: IOwnState, props: HrCompetencyLevelDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
//     menuOptions: options
//   })
// };

// const handlerCreators: HandleCreators<HrCompetencyLevelDetailProps, IOwnHandler> = {
//   handleOnLoadApi: (props: HrCompetencyLevelDetailProps) => () => { 
//     const { user } = props.userState;
//     const clusterUid = props.match.params.clusterUid;
//     const categoryUid = props.match.params.categoryUid;
//     const levelUid = props.match.params.levelUid;
//     const { isLoading } = props.hrCompetencyLevelState.detail;

//     if (user && clusterUid && categoryUid && levelUid && !isLoading) {
//       props.hrCompetencyLevelDispatch.loadDetailRequest({
//         clusterUid,
//         categoryUid,
//         levelUid
//       });
//     }
//   },
//   handleOnSelectedMenu: (props: HrCompetencyLevelDetailProps) => (item: IPopupMenuOption) => {
//     switch (item.id) {
//       case IHrCompetencyLevelUserAction.Refresh:
//         props.setShouldLoad();
//         break;

//       default:
//         break;
//     }
//   }
// };

// const lifecycles: ReactLifeCycleFunctions<HrCompetencyLevelDetailProps, IOwnState> = {
//   componentDidUpdate(prevProps: HrCompetencyLevelDetailProps) {
//     // handle updated reload state
//     if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
//       this.props.setShouldLoad();
//       this.props.handleOnLoadApi();
//     }
    
//     // handle updated route params
//     if (this.props.match.params.levelUid !== prevProps.match.params.levelUid) {
//       this.props.handleOnLoadApi();
//     }

//       // handle updated response state
//     if (this.props.hrCompetencyLevelState.detail.response !== prevProps.hrCompetencyLevelState.detail.response) {
//       const { isLoading } = this.props.hrCompetencyLevelState.detail;

//       const options: IPopupMenuOption[] = [
//         {
//           id: IHrCompetencyLevelUserAction.Refresh,
//           name: this.props.intl.formatMessage(layoutMessage.action.refresh),
//           enabled: !isLoading,
//           visible: true,
//         }
//       ];

//       this.props.setOptions(options);
//     }
//   }
// }; 

// export const HrCompetencyLevelDetail = compose(
//   withRouter,
//   withOidc,
//   withUser,
//   withHrCompetencyLevel,
//   injectIntl,
//   withStateHandlers(createProps, stateUpdaters),
//   withHandlers(handlerCreators),
//   lifecycle(lifecycles),
//   setDisplayName('HrCompetencyLevelDetail')
// )(HrCompetencyLevelDetailView);