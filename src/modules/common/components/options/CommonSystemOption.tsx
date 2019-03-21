import { ISystemListRequest } from '@common/classes/queries';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import * as React from 'react';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

const fnGetContext = (props: CommonSystemOptionProps) => {
  const { category } = props;

  switch (category) {
    case 'activity': return props.commonActivityListState;
    case 'currency': return props.commonCurrencyListState;
    case 'document': return props.commonDocumentListState;
    case 'documentPreSales': return props.commonDocumentPresalesListState;
    case 'project': return props.commonProjectListState;
    case 'site': return props.commonSiteListState;
    case 'expense': return props.commonExpenseListState;
    case 'leave': return props.commonLeaveListState;
    case 'status': return props.commonStatusListState;
    case 'destination': return props.commonDestinationListState;
    case 'purpose': return props.commonPurposeListState;
    case 'transportation': return props.commonTransportationListState;
    case 'limiter': return props.commonLimiterListState;
    case 'unit': return props.commonUnitListState;
    case 'grade': return props.commonGradeListState;
    case 'relation': return props.commonRelationListState;
    case 'religion': return props.commonReligionListState;
    case 'gender': return props.commonGenderListState;
    case 'blood': return props.commonBloodListState;
    case 'tax': return props.commonTaxListState;
    case 'employment': return props.commonEmploymentListState;
    case 'training': return props.commonTrainingListState;
    case 'certification': return props.commonCertificationListState;
    case 'degree': return props.commonDegreeListState;
    case 'department': return props.commonDepartmentListState;
    case 'family': return props.commonFamilyListState;
    case 'level': return props.commonLevelListState;

    default: return props.commonActivityListState;
  }
};

interface IOwnOption extends ISystemListRequest {

}

interface IOwnState {
  isLoading: boolean;
  options: ISelectFieldOption[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setLoading: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
}

export type CommonSystemOptionProps
  = WithCommonSystem
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<CommonSystemOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    options: values
  })
};

const handlerCreators: HandleCreators<CommonSystemOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: CommonSystemOptionProps) => () => {
    const { isExpired, isLoading } = fnGetContext(props);
    const { commonDispatch } = props;

    const request: ISystemListRequest = {
      category: props.category,
      filter: props.filter
    };

    if (isExpired || !isLoading) {
      switch (props.category) {
        case 'activity':
          commonDispatch.activityListRequest(request);
          break;

        case 'currency':
          commonDispatch.currencyListRequest(request);
          break;
        case 'document':
          commonDispatch.documentListRequest(request);
          break;

        case 'documentPreSales':
          commonDispatch.documentPresalesListRequest(request);
          break;

        case 'project':
          commonDispatch.projectListRequest(request);
          break;
          
        case 'site':
          commonDispatch.siteListRequest(request);
          break;
          
        case 'expense':
          commonDispatch.expenseListRequest(request);
          break;

        case 'leave':
          commonDispatch.leaveListRequest(request);
          break;

        case 'status':
          commonDispatch.statusListRequest(request);
          break;

        case 'destination':
          commonDispatch.destinationListRequest(request);
          break;
        
        case 'purpose':
          commonDispatch.purposeListRequest(request);
          break;
        
        case 'transportation':
          commonDispatch.transportationListRequest(request);
          break;

        case 'limiter':
          commonDispatch.limiterListRequest(request);
          break;
          
        case 'unit':
          commonDispatch.unitListRequest(request);
          break;

        case 'grade':
          commonDispatch.gradeListRequest(request);
          break;

        case 'relation':
          commonDispatch.relationListRequest(request);
          break;
          
        case 'religion':
          commonDispatch.religionListRequest(request);
          break;

        case 'gender':
          commonDispatch.genderListRequest(request);
          break;
          
        case 'blood':
          commonDispatch.bloodListRequest(request);
          break;

        case 'tax':
          commonDispatch.taxListRequest(request);
          break;

        case 'employment':
          commonDispatch.employmentListRequest(request);
          break;

        case 'training':
          commonDispatch.trainingListRequest(request);
          break;

        case 'certification':
          commonDispatch.certificationListRequest(request);
          break;

        case 'department':
          commonDispatch.departmentListRequest(request);
          break;

        case 'degree':
          commonDispatch.degreeListRequest(request);
          break;

        case 'family':
          commonDispatch.familyListRequest(request);
          break;

        case 'level':
          commonDispatch.levelListRequest(request);
          break;
          
        default:
          break;
      }
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<CommonSystemOptionProps, IOwnState> = {
  componentDidMount() {
    this.props.handleOnLoadApi();
  },
  componentDidUpdate(prevProps: CommonSystemOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = fnGetContext(this.props);
    const { isLoading: prevIsLoading, response: prevResponse } = fnGetContext(prevProps);

    if (thisIsLoading !== prevIsLoading) {
      this.props.setLoading(thisIsLoading);
    }

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        const options: ISelectFieldOption[] = [{ label: '', value: ''}];
        
        thisResponse.data.forEach(item => options.push({ 
          value: item.type, 
          label: item.name 
        }));

        this.props.setOptions(options);
      }
    }
  }
};

const component: React.SFC<CommonSystemOptionProps> = props => {
  const children = props.children as React.ReactElement<SelectFieldProps>;

  if (children) {
    return (
      <React.Fragment>
        {
          React.cloneElement(children, { 
            isLoading: props.isLoading,
            options: props.options,
            value: props.options.find(option => option.value === children.props.valueString)
          })
        }
      </React.Fragment>
    );
  }

  return <div></div>;
};

export const CommonSystemOption = compose<CommonSystemOptionProps, IOwnOption>(
  setDisplayName('CommonSystemOptionProps'),
  withCommonSystem,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);