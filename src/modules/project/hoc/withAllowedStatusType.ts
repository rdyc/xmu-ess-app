import { WorkflowStatusType } from '@common/classes/types';
import { connect } from 'react-redux';

export interface WithAllowedStatusType {
  allowedStatusTypes: (currentStatus: string | null | undefined) => string[] | undefined ;
}

const mapStateToProps = () => {
  const statusTypes = (currentStatus: string | null | undefined): string[] | undefined => {
    switch (currentStatus) {
      case WorkflowStatusType.Approved: 
        return [
          WorkflowStatusType.Closed
        ];
        
      case WorkflowStatusType.Closed: 
        return [
          WorkflowStatusType.ReOpened
        ];

      case WorkflowStatusType.ReOpened: 
        return [
          WorkflowStatusType.Closed
        ];
      
      default: return undefined;
    }
  };

  return {
    allowedStatusTypes: statusTypes
  };
};

export const withAllowedStatusType = (component: React.ComponentType) =>
  connect(mapStateToProps)(component);