import { hrCompetencyCategoryReducers } from './competency/category';
import { hrCompetencyClusterReducers } from './competency/cluster';
import { hrCompetencyIndicatorReducers } from './competency/indicator';
import { hrCompetencyLevelReducers } from './competency/level';
import { hrCompetencyMappedReducers } from './competency/mapped';

const hrCompetencyReducers = {
  ...hrCompetencyCategoryReducers,
  ...hrCompetencyClusterReducers,
  ...hrCompetencyIndicatorReducers,
  ...hrCompetencyLevelReducers,
  ...hrCompetencyMappedReducers,
};

export default hrCompetencyReducers;