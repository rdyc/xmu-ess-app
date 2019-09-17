import { hrCompetencyAssessmentReducers } from './competency/assessment';
import { hrCompetencyCategoryReducers } from './competency/category';
import { hrCompetencyClusterReducers } from './competency/cluster';
import { hrCompetencyEmployeeReducers } from './competency/employee';
import { hrCompetencyIndicatorReducers } from './competency/indicator';
import { hrCompetencyLevelReducers } from './competency/level';
import { hrCompetencyMappedReducers } from './competency/mapped';
import { hrCompetencyResultReducers } from './competency/result';

const hrCompetencyReducers = {
  ...hrCompetencyCategoryReducers,
  ...hrCompetencyClusterReducers,
  ...hrCompetencyIndicatorReducers,
  ...hrCompetencyLevelReducers,
  ...hrCompetencyMappedReducers,
  ...hrCompetencyAssessmentReducers,
  ...hrCompetencyEmployeeReducers,
  ...hrCompetencyResultReducers
};

export default hrCompetencyReducers;