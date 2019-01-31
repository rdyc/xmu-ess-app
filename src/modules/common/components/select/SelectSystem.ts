import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { CommonCategoryType } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { IQueryCollectionState } from '@generic/interfaces';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, shallowEqual, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { SelectSystemView } from './SelectSystemView';

export interface SelectSystemOption {
  onlyForTypes?: string[] | undefined;
}

interface IOwnOption extends SelectSystemOption, WrappedFieldProps, BaseFieldProps { 
  category: CommonCategoryType;
  companyUid?: string | undefined; 
  parentCode?: string | undefined;
  required?: boolean;
  placeholder?: string;
  label: string; 
  disabled: boolean;
}

interface IOwnHandlers {
  categoryState: () => IQueryCollectionState<ISystemListRequest, ISystemList>;
  handleOnLoadApi: () => void;
}

export type SelectSystemProps 
  = IOwnOption
  & IOwnHandlers
  & WithCommonSystem
  & WithWidth;

const handlerCreators: HandleCreators<SelectSystemProps, IOwnHandlers> = {
  categoryState: (props: SelectSystemProps) => () => { 
    return fnGetContext(props);
  },
  handleOnLoadApi: (props: SelectSystemProps) => () => {
    const { category, companyUid, parentCode, commonDispatch } = props;

    const request: ISystemListRequest = {
      category,
      filter: {
        companyUid,
        parentCode,
        orderBy: 'code',
        direction: 'ascending'
      }
    };

    switch (request.category) {
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
  },
};

const lifecycles: ReactLifeCycleFunctions<SelectSystemProps, IOwnOption> = {
  componentDidMount() {
    const { request } = this.props.categoryState();

    // 1st load only when request are empty
    if (!request) {
      this.props.handleOnLoadApi();
    } else {
      // 2nd load only when request filter are present
      if (request.filter) {
        // comparing some props
        const shouldUpdate = !shallowEqual(
          {
            category: request.category,
            companyUid: request.filter.companyUid,
            parentCode: request.filter.parentCode,
          },
          {
            category: this.props.category,
            companyUid: this.props.companyUid,
            parentCode: this.props.parentCode,
          },
        );
  
        // then should update the list?
        if (shouldUpdate) {
          this.props.handleOnLoadApi();
        }
      }
    }
  }
};

const fnGetContext = (props: SelectSystemProps) => {
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

export const SelectSystem = compose<SelectSystemProps, IOwnOption>(
  withCommonSystem,
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withWidth()
)(SelectSystemView);
