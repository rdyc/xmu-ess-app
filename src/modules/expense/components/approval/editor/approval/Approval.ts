// import { IExpenseApprovalPostPayload } from '@expense/classes/request/approval';
// import { ApprovalView } from '@expense/components/approval/detail/approval/ApprovalView';
// import { WithExpenseApproval } from '@expense/hoc/withExpenseApproval';
// import { WithUser } from '@layout/hoc/withUser';
// import { 
//   compose, 
//   HandleCreators,
//   withHandlers
//  } from 'recompose';

// interface OwnProps {
//   expenseUid: string;
// }

// interface ApprovalData {
//   Remark: string | null | undefined;
//   isApproved: boolean | undefined;
// }

// interface OwnHandlers {  
//   handleSubmit: (payload: ApprovalData) => void;
// }

// export type ApprovalProps
//   = OwnProps
//   & WithExpenseApproval
//   & ApprovalData
//   & OwnHandlers
//   & WithUser;

// const handlerCreators: HandleCreators<ApprovalProps, OwnHandlers> = {
//   handleSubmit: (props: ApprovalProps) => (approvalData: ApprovalData) => {
//     const { expenseUid } = props;
//     const { user } = props.userState;
//     const { createRequest } = props.expenseApprovalDispatch;

//     if (!user) {
//       return Promise.reject('user was not found');
//     }

//     const payload = approvalData;

//     return new Promise((resolve, reject) => {
//       createRequest({
//           resolve,
//           reject,
//           expenseUid,
//           companyUid: user.company.uid,
//           positionUid: user.position.uid,
//           data: payload as IExpenseApprovalPostPayload
//       });
//     });
//   }
// };

// export const Approval = compose<ApprovalProps, OwnProps>(
//   withHandlers<ApprovalProps, OwnHandlers>(handlerCreators)
// )(ApprovalView);