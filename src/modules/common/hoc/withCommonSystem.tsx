import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest, ISystemPostRequest, ISystemPutRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList, ISystemType } from '@common/classes/response';
import {
  activityGetListDispose,
  activityGetListRequest,
  bloodGetListDispose,
  bloodGetListRequest,
  certificationGetListDispose,
  certificationGetListRequest,
  competencyGetListDispose,
  competencyGetListRequest,
  currencyGetListDispose,
  currencyGetListRequest,
  degreeGetListDispose,
  degreeGetListRequest,
  departmentGetListDispose,
  departmentGetListRequest,
  destinationGetListDispose,
  destinationGetListRequest,
  documentGetListDispose,
  documentGetListRequest,
  documentPresalesGetListDispose,
  documentPresalesGetListRequest,
  employmentGetListDispose,
  employmentGetListRequest,
  expenseGetListDispose,
  expenseGetListRequest,
  familyGetListDispose,
  familyGetListRequest,
  financeGetListDispose,
  financeGetListRequest,
  genderGetListDispose,
  genderGetListRequest,
  gradeGetListDispose,
  gradeGetListRequest,
  leaveGetListDispose,
  leaveGetListRequest,
  levelGetListDispose,
  levelGetListRequest,
  paymentGetListDispose,
  paymentGetListRequest,
  professionGetListDispose,
  professionGetListRequest,
  projectGetListDispose,
  projectGetListRequest,
  purposeGetListDispose,
  purposeGetListRequest,
  relationGetListDispose,
  relationGetListRequest,
  religionGetListDispose,
  religionGetListRequest,
  siteGetListDispose,
  siteGetListRequest,
  statusGetListDispose,
  statusGetListRequest,
  systemGetAllDispose,
  systemGetAllRequest,
  systemGetByIdDispose,
  systemGetByIdRequest,
  systemGetTypeDispose,
  systemGetTypeRequest,
  systemPostDispose,
  systemPostRequest,
  systemPutDispose,
  systemPutRequest,
  taxGetListDispose,
  taxGetListRequest,
  trainingGetListDispose,
  trainingGetListRequest,
  transportationGetListDispose,
  transportationGetListRequest,
  unitGetListDispose,
  unitGetListRequest,
} from '@common/store/actions';
import { limiterGetListDispose, limiterGetListRequest } from '@common/store/actions/limiterActions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  // system
  commonSystemState: {
    all: IQueryCollectionState<ISystemAllRequest, ISystem>;
    list: IQueryCollectionState<ISystemListRequest, ISystemList>;
    detail: IQuerySingleState<ISystemByIdRequest, ISystemDetail>;
    type: IQueryCollectionState<{}, ISystemType>;
  };

  // all

  // list
  commonUnitListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonActivityListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonCurrencyListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDocumentListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDocumentPresalesListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonProjectListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonSiteListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonLeaveListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonExpenseListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonStatusListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDestinationListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonPurposeListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonTransportationListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonLimiterListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonGradeListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonRelationListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonReligionListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonGenderListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonBloodListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonTaxListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonEmploymentListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonPaymentListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonFinanceListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonTrainingListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonCertificationListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonFamilyListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDegreeListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonDepartmentListState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commonLevelListState: IQueryCollectionState<ISystemListRequest, ISystemList>;

  // detail
}

interface PropsFromDispatch {
  commonDispatch: {
    // all
    systemAllRequest: typeof systemGetAllRequest;
    systemAllDispose: typeof systemGetAllDispose;

    // list
    unitListRequest: typeof unitGetListRequest;
    activityListRequest: typeof activityGetListRequest;
    currencyListRequest: typeof currencyGetListRequest;
    documentListRequest: typeof documentGetListRequest;
    documentPresalesListRequest: typeof documentPresalesGetListRequest;
    expenseListRequest: typeof expenseGetListRequest;
    projectListRequest: typeof projectGetListRequest;
    siteListRequest: typeof siteGetListRequest;
    leaveListRequest: typeof leaveGetListRequest;
    statusListRequest: typeof statusGetListRequest;
    destinationListRequest: typeof destinationGetListRequest;
    purposeListRequest: typeof purposeGetListRequest;
    transportationListRequest: typeof transportationGetListRequest;
    limiterListRequest: typeof limiterGetListRequest;
    gradeListRequest: typeof gradeGetListRequest;
    relationListRequest: typeof relationGetListRequest;
    religionListRequest: typeof religionGetListRequest;
    genderListRequest: typeof genderGetListRequest;
    bloodListRequest: typeof bloodGetListRequest;
    taxListRequest: typeof taxGetListRequest;
    employmentListRequest: typeof employmentGetListRequest;
    paymentListRequest: typeof paymentGetListRequest;
    financeListRequest: typeof financeGetListRequest;
    trainingListRequest: typeof trainingGetListRequest;
    certificationListRequest: typeof certificationGetListRequest;
    departmentListRequest: typeof departmentGetListRequest;
    degreeListRequest: typeof degreeGetListRequest;
    levelListRequest: typeof levelGetListRequest;
    familyListRequest: typeof familyGetListRequest;

    unitListDispose: typeof unitGetListDispose;
    activityListDispose: typeof activityGetListDispose;
    currencyListDispose: typeof currencyGetListDispose;
    documentListDispose: typeof documentGetListDispose;
    documentPresalesListDispose: typeof documentPresalesGetListDispose;
    expenseListDispose: typeof expenseGetListDispose;
    projectListDispose: typeof projectGetListDispose;
    siteListDispose: typeof siteGetListDispose;
    leaveListDispose: typeof leaveGetListDispose;
    statusListDispose: typeof statusGetListDispose;
    destinationListDispose: typeof destinationGetListDispose;
    purposeListDispose: typeof purposeGetListDispose;
    transportationListDispose: typeof transportationGetListDispose;
    limiterListDispose: typeof limiterGetListDispose;
    gradeListDispose: typeof gradeGetListDispose;
    relationListDispose: typeof relationGetListDispose;
    religionListDispose: typeof religionGetListDispose;
    genderListDispose: typeof genderGetListDispose;
    bloodListDispose: typeof bloodGetListDispose;
    taxListDispose: typeof taxGetListDispose;
    employmentListDispose: typeof employmentGetListDispose;
    paymentListDispose: typeof paymentGetListDispose;
    financeListDispose: typeof financeGetListDispose;
    trainingListDispose: typeof trainingGetListDispose;
    certificationListDispose: typeof certificationGetListDispose;
    departmentListDispose: typeof departmentGetListDispose;
    degreeListDispose: typeof degreeGetListDispose;
    levelListDispose: typeof levelGetListDispose;
    familyListDispose: typeof familyGetListDispose;
    
    // detail
    systemDetailRequest: typeof systemGetByIdRequest;
    systemDetailDispose: typeof systemGetByIdDispose;

    // command
    systemCreateRequest: typeof systemPostRequest;
    systemCreateDispose: typeof systemPostDispose;
    systemUpdateRequest: typeof systemPutRequest;
    systemUpdateDispose: typeof systemPutDispose;

    // other
    systemTypeRequest: typeof systemGetTypeRequest;
    systemTypeDispose: typeof systemGetTypeDispose;
  };
}

export interface WithCommonSystem extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ 
  commonActivityList, 
  commonCurrencyList, 
  commonDocumentList, 
  commonDocumentPresalesList, 
  commonProjectList,
  commonExpenseList,
  commonSiteList,
  commonLeaveList,
  commonStatusList,
  commonDestinationList,
  commonPurposeList,
  commonTransportationList,
  commonLimiterList,
  commonSystemAll,
  commonSystemList,
  commonSystemDetail,
  commonSystemType,
  commonUnitList,
  commonGradeList,
  commonRelationList,
  commonReligionList,
  commonGenderList,
  commonBloodList,
  commonTaxList,
  commonEmploymentList,
  commonPaymentList,
  commonFinanceList,
  commonTrainingList,
  commonDepartmentList,
  commonDegreeList,
  commonFamilyList,
  commonCertificationList,
  commonLevelList,
  commonCompetencyList,
  commonProfessionList

}: IAppState) => ({
  // system
  commonSystemState: {
    all: commonSystemAll,
    list: commonSystemList,
    detail: commonSystemDetail,
    type: commonSystemType,
  },

  // all
  
  // list
  commonUnitListState: commonUnitList,
  commonActivityListState: commonActivityList,
  commonCurrencyListState: commonCurrencyList,
  commonDocumentListState: commonDocumentList,
  commonDocumentPresalesListState: commonDocumentPresalesList,
  commonProjectListState: commonProjectList,
  commonExpenseListState: commonExpenseList,
  commonSiteListState: commonSiteList,
  commonLeaveListState: commonLeaveList,
  commonStatusListState: commonStatusList,
  commonDestinationListState: commonDestinationList,
  commonPurposeListState: commonPurposeList,
  commonTransportationListState: commonTransportationList,
  commonLimiterListState: commonLimiterList,
  commonGradeListState: commonGradeList,
  commonRelationListState: commonRelationList,
  commonReligionListState: commonReligionList,
  commonGenderListState: commonGenderList,
  commonBloodListState: commonBloodList,
  commonTaxListState: commonTaxList,
  commonEmploymentListState: commonEmploymentList,
  commonPaymentListState: commonPaymentList,
  commonFinanceListState: commonFinanceList,
  commonTrainingListState: commonTrainingList,
  commonCertificationListState: commonCertificationList,
  commonDegreeListState: commonDegreeList,
  commonFamilyListState: commonFamilyList,
  commonDepartmentListState: commonDepartmentList,
  commonLevelListState: commonLevelList,
  commonCompetencyListState: commonCompetencyList,
  commonProfessionListState: commonProfessionList,

  // detail
 
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  commonDispatch: {
    // all
    systemAllRequest: (request: ISystemAllRequest) => dispatch(systemGetAllRequest(request)),
    systemAllDispose: () => dispatch(systemGetAllDispose()),

    // list
    unitListRequest: (request: ISystemListRequest) => dispatch(unitGetListRequest(request)),
    activityListRequest: (request: ISystemListRequest) => dispatch(activityGetListRequest(request)),
    currencyListRequest: (request: ISystemListRequest) => dispatch(currencyGetListRequest(request)),
    documentListRequest: (request: ISystemListRequest) => dispatch(documentGetListRequest(request)),
    documentPresalesListRequest: (request: ISystemListRequest) => dispatch(documentPresalesGetListRequest(request)),
    projectListRequest: (request: ISystemListRequest) => dispatch(projectGetListRequest(request)),
    expenseListRequest: (request: ISystemListRequest) => dispatch(expenseGetListRequest(request)),
    siteListRequest: (request: ISystemListRequest) => dispatch(siteGetListRequest(request)),
    leaveListRequest: (request: ISystemListRequest) => dispatch(leaveGetListRequest(request)),
    statusListRequest: (request: ISystemListRequest) => dispatch(statusGetListRequest(request)),
    destinationListRequest: (request: ISystemListRequest) => dispatch(destinationGetListRequest(request)),
    purposeListRequest: (request: ISystemListRequest) => dispatch(purposeGetListRequest(request)),
    transportationListRequest: (request: ISystemListRequest) => dispatch(transportationGetListRequest(request)),
    limiterListRequest: (request: ISystemListRequest) => dispatch(limiterGetListRequest(request)),
    gradeListRequest: (request: ISystemListRequest) => dispatch(gradeGetListRequest(request)),
    relationListRequest: (request: ISystemListRequest) => dispatch(relationGetListRequest(request)),
    religionListRequest: (request: ISystemListRequest) => dispatch(religionGetListRequest(request)),
    genderListRequest: (request: ISystemListRequest) => dispatch(genderGetListRequest(request)),
    bloodListRequest: (request: ISystemListRequest) => dispatch(bloodGetListRequest(request)),
    taxListRequest: (request: ISystemListRequest) => dispatch(taxGetListRequest(request)),
    employmentListRequest: (request: ISystemListRequest) => dispatch(employmentGetListRequest(request)),
    paymentListRequest: (request: ISystemListRequest) => dispatch(paymentGetListRequest(request)),
    financeListRequest: (request: ISystemListRequest) => dispatch(financeGetListRequest(request)),
    trainingListRequest: (request: ISystemListRequest) => dispatch(trainingGetListRequest(request)),
    departmentListRequest: (request: ISystemListRequest) => dispatch(departmentGetListRequest(request)),
    degreeListRequest: (request: ISystemListRequest) => dispatch(degreeGetListRequest(request)),
    familyListRequest: (request: ISystemListRequest) => dispatch(familyGetListRequest(request)),
    certificationListRequest: (request: ISystemListRequest) => dispatch(certificationGetListRequest(request)),
    levelListRequest: (request: ISystemListRequest) => dispatch(levelGetListRequest(request)),
    competencyListRequest: (request: ISystemListRequest) => dispatch(competencyGetListRequest(request)),
    professionListRequest: (request: ISystemListRequest) => dispatch(professionGetListRequest(request)),

    unitListDispose: () => dispatch(unitGetListDispose()),
    activityListDispose: () => dispatch(activityGetListDispose()),
    currencyListDispose: () => dispatch(currencyGetListDispose()),
    documentListDispose: () => dispatch(documentGetListDispose()),
    documentPresalesListDispose: () => dispatch(documentPresalesGetListDispose()),
    projectListDispose: () => dispatch(projectGetListDispose()),
    expenseListDispose: () => dispatch(expenseGetListDispose()),
    siteListDispose: () => dispatch(siteGetListDispose()),
    leaveListDispose: () => dispatch(leaveGetListDispose()),
    statusListDispose: () => dispatch(statusGetListDispose()),
    destinationListDispose: () => dispatch(destinationGetListDispose()),
    purposeListDispose: () => dispatch(purposeGetListDispose()),
    transportationListDispose: () => dispatch(transportationGetListDispose()),
    limiterListDispose: () => dispatch(limiterGetListDispose()),
    gradeListDispose: () => dispatch(gradeGetListDispose()),
    relationListDispose: () => dispatch(relationGetListDispose()),
    religionListDispose: () => dispatch(religionGetListDispose()),
    genderListDispose: () => dispatch(genderGetListDispose()),
    bloodListDispose: () => dispatch(bloodGetListDispose()),
    taxListDispose: () => dispatch(taxGetListDispose()),
    employmentListDispose: () => dispatch(employmentGetListDispose()),
    paymentListDispose: () => dispatch(paymentGetListDispose()),
    financeListDispose: () => dispatch(financeGetListDispose()),
    trainingListDispose: () => dispatch(trainingGetListDispose()),
    departmentListDispose: () => dispatch(departmentGetListDispose()),
    degreeListDispose: () => dispatch(degreeGetListDispose()),
    familyListDispose: () => dispatch(familyGetListDispose()),
    certificationListDispose: () => dispatch(certificationGetListDispose()),
    levelListDispose: () => dispatch(levelGetListDispose()),
    competencyListDispose: () => dispatch(competencyGetListDispose()),
    professionListDispose: () => dispatch(professionGetListDispose()),

    // detail
    systemDetailRequest: (request: ISystemByIdRequest) => dispatch(systemGetByIdRequest(request)),
    systemDetailDispose: () => dispatch(systemGetByIdDispose()),

    // command
    systemCreateRequest: (request: ISystemPostRequest) => dispatch(systemPostRequest(request)),
    systemCreateDispose: () => dispatch(systemPostDispose()),
    systemUpdateRequest: (request: ISystemPutRequest) => dispatch(systemPutRequest(request)),
    systemUpdateDispose: () => dispatch(systemPutDispose()),

    // type
    systemTypeRequest: () => dispatch(systemGetTypeRequest()),
    systemTypeDispose: () => dispatch(systemGetTypeDispose()),
  }
});

export const withCommonSystem = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);