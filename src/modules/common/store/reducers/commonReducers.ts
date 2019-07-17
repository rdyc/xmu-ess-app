import activityReducers from '@common/store/reducers/activity/activityReducers';
import currencyReducers from '@common/store/reducers/currency/currencyReducers';
import destinationReducers from '@common/store/reducers/destination/destinationReducers';
import documentReducers from '@common/store/reducers/document/documentReducers';
import documentPresalesReducers from '@common/store/reducers/documentPresales/documentPresalesReducers';
import expenseReducers from '@common/store/reducers/expense/expenseReducers';
import leaveReducers from '@common/store/reducers/leave/leaveReducers';
import siteReducers from '@common/store/reducers/site/siteReducers';
import systemReducers from '@common/store/reducers/system/systemReducers';
import bloodReducers from './blood/bloodReducers';
import certificationReducers from './certification/certificationReducers';
import competencyReducers from './competency/competencyReducers';
import degreeReducers from './degree/degreeReducers';
import departmentReducers from './department/departmentReducers';
import employmentReducers from './employment/employmentReducers';
import familyReducers from './family/familyReducers';
import financeReducers from './finance/financeReducer';
import genderReducers from './gender/genderReducers';
import gradeReducers from './grade/gradeReducer';
import levelReducers from './level/levelReducers';
import limiterReducers from './limiter/limiterReducers';
import paymentReducers from './payment/paymentReducer';
import professionReducers from './profession/professionReducers';
import { commonProjectReducers } from './project';
import purposeReducers from './purpose/purposeReducers';
import relationReducers from './relation/relationReducer';
import religionReducers from './religion/religionReducers';
import statusReducers from './status/statusReducers';
import taxReducers from './tax/taxReducers';
import trainingReducers from './training/trainingReducers';
import transportationReducers from './transportation/transportationReducers';
import unitReducers from './unit/unitReducers';

const commonReducers = {
  ...activityReducers,
  ...systemReducers,
  ...currencyReducers,
  ...documentReducers,
  ...documentPresalesReducers,
  ...commonProjectReducers,
  ...siteReducers,
  ...expenseReducers,
  ...leaveReducers,
  ...statusReducers,
  ...destinationReducers,
  ...purposeReducers,
  ...transportationReducers,
  ...limiterReducers,
  ...unitReducers,
  ...gradeReducers,
  ...relationReducers,
  ...bloodReducers,
  ...employmentReducers,
  ...genderReducers,
  ...religionReducers,
  ...taxReducers,
  ...paymentReducers,
  ...financeReducers,
  ...certificationReducers,
  ...degreeReducers,
  ...departmentReducers,
  ...familyReducers,
  ...levelReducers,
  ...trainingReducers,
  ...competencyReducers,
  ...professionReducers
};

export default commonReducers;