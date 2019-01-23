import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { CommonCategoryType } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { IQueryCollectionState } from '@generic/interfaces';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { SelectSystemView } from './SelectSystemView';

export interface SelectSystemOption {
  onlyForTypes?: string[] | undefined;
}

interface OwnProps extends SelectSystemOption, WrappedFieldProps, BaseFieldProps { 
  category: CommonCategoryType;
  companyUid?: string | undefined; 
  parentCode?: string | undefined;
  required?: boolean;
  placeholder?: string;
  label: string; 
  disabled: boolean;
}

interface OwnHandlers {
  categoryState: () => IQueryCollectionState<ISystemListRequest, ISystemList>;
}

export type SelectSystemProps 
  = OwnProps 
  & OwnHandlers
  & WithCommonSystem
  & WithWidth;

const lifecycles: ReactLifeCycleFunctions<SelectSystemProps, OwnProps> = {
  componentDidMount() {
    const { category, companyUid, parentCode, commonDispatch } = this.props;
    const { isLoading, response } = this.props.categoryState();

    // skipp fetch while current state is being loaded
    if (isLoading || response) {
      return;
    }
    
    // don't load while control has set as disabled
    if (true) {
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
    }
  },
  componentWillReceiveProps(nextProps: SelectSystemProps) {
    if (nextProps.companyUid !== this.props.companyUid || 
        nextProps.parentCode !== this.props.parentCode) {
      const { commonDispatch } = this.props;
      
      const request: ISystemListRequest = {
        category: nextProps.category,
        filter: {
          companyUid: nextProps.companyUid,
          parentCode: nextProps.parentCode,
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
    }
  },
  componentWillUnmount() {
    const { commonDispatch, category } = this.props;

    switch (category) {
      case 'activity':
        commonDispatch.activityListDispose();
        break;
  
      case 'currency':
        commonDispatch.currencyListDispose();
        break;

      case 'document':
        commonDispatch.documentListDispose();
        break;

      case 'documentPreSales':
        commonDispatch.documentPresalesListDispose();
        break;

      case 'project':
        commonDispatch.projectListDispose();
        break;
        
      case 'site':
        commonDispatch.siteListDispose();
        break;
        
      case 'expense':
        commonDispatch.expenseListDispose();
        break;

      case 'leave':
        commonDispatch.leaveListDispose();
        break;

      case 'status':
        commonDispatch.statusListDispose();
        break;

      case 'destination':
        commonDispatch.destinationListDispose();
        break;
      
      case 'purpose':
        commonDispatch.purposeListDispose();
        break;
      
      case 'transportation':
        commonDispatch.transportationListDispose();
        break;

      case 'limiter':
        commonDispatch.limiterListDispose();
        break;
        
      case 'unit':
        commonDispatch.unitListDispose();
        break;

      case 'grade':
        commonDispatch.gradeListDispose();
        break;

      case 'relation':
        commonDispatch.relationListDispose();
        break;
        
      case 'religion':
        commonDispatch.religionListDispose();
        break;

      case 'gender':
        commonDispatch.genderListDispose();
        break;
        
      case 'blood':
        commonDispatch.bloodListDispose();
        break;

      case 'tax':
        commonDispatch.taxListDispose();
        break;

      case 'employment':
        commonDispatch.employmentListDispose();
        break;

      case 'training':
        commonDispatch.trainingListDispose();
        break;

      case 'certification':
        commonDispatch.certificationListDispose();
        break;

      case 'department':
        commonDispatch.departmentListDispose();
        break;

      case 'degree':
        commonDispatch.degreeListDispose();
        break;

      case 'family':
        commonDispatch.familyListDispose();
        break;

      case 'level':
        commonDispatch.levelListDispose();
        break;

      default:
      break;
    }
  }
};

const handlerCreators: HandleCreators<SelectSystemProps, OwnHandlers> = {
  categoryState: (props: SelectSystemProps) => () => { 
    return fnGetContext(props);
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

export const SelectSystem = compose<SelectSystemProps, OwnProps>(
  withCommonSystem,
  withWidth(),
  withHandlers<SelectSystemProps, OwnHandlers>(handlerCreators),
  lifecycle<SelectSystemProps, {}>(lifecycles),
)(SelectSystemView);
