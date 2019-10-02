import { IBasePagingFilter } from '@generic/interfaces';
import { IHrCornerCategoryDeletePayload } from '@hr/classes/request';
import { IHrCornerCategory } from '@hr/classes/response';
import { WithHrCornerCategory, withHrCornerCategory } from '@hr/hoc/withHrCornerCategory';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LookupUserAction } from '@lookup/classes/types';
import { Delete } from '@lookup/components/shared/Delete';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { DeleteForever, Edit } from '@material-ui/icons';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { HrCornerCategoryInformation } from './HrCornerCategoryInformation';

interface IOwnProps {
  isDetailOpen: boolean;
  data?: IHrCornerCategory;
  onClose: (isDetailOpen: boolean) => void;
  handleOpenForm: () => void;
  handleCategory: (category: IHrCornerCategory) => void;
  handleOnLoadList: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
}

interface IOwnState {
  action?: LookupUserAction;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnHandler {
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleSubmit: () => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
  handleOpenDelete: () => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
  setDelete: StateHandler<IOwnState>;
  setDialogClose: StateHandler<IOwnState>;
}

type AllProps 
  = IOwnProps 
  & IOwnState
  & IOwnHandler
  & IOwnStateUpdaters
  & WithUser 
  & WithLayout
  & WithStyles<typeof styles>
  & WithHrCornerCategory
  & InjectedIntlProps;

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => {
  return {
    dialogOpen: false,
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  };
};

const stateUpdaters: StateUpdaters<AllProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setDelete: (prevState: IOwnState, props: AllProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.shared.confirm.deleteTitle, {state: 'Corner category'}),
    dialogContent: props.intl.formatMessage(hrMessage.shared.confirm.deleteDescription, {state: 'corner category'}),
  }),
  setDialogClose: (props: AllProps) => (): Partial<IOwnState> => ({
    dialogOpen: false
  })
};

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
  handleOnCloseDialog: (props: AllProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOpenDelete: (props: AllProps) => () => {
    props.setDelete();
  },
  handleOnConfirm: (props: AllProps) => () => {
    //
  },
  handleSubmit: (props: AllProps) => () => {
    const { action, data } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.hrCornerCategoryDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    if (data) {
      // props checking
      const payload = {
        uid: data.uid
      };
  
      if (action === LookupUserAction.Delete) {

        return new Promise((resolve, reject) => {
          deleteRequest({
            resolve,
            reject,
            data: payload as IHrCornerCategoryDeletePayload
          });
        });
      }
    }

    return null;
  },
  handleSubmitSuccess: (props: AllProps) => (response: boolean) => {
    if (props.action === LookupUserAction.Delete && props.data) {
  
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(hrMessage.shared.message.deleteSuccess, { uid : props.data.name, state: 'Corner category', type: 'name' })
      });
      props.handleOnLoadList(undefined, true, true);
      props.hrCornerCategoryDispatch.loadListRequest({
        filter: {
          orderBy: 'name',
          direction: 'ascending',
        }
      });
      
      props.onClose(false);
    }
  },
  handleSubmitFail: (props: AllProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      if (props.action === LookupUserAction.Delete) {
        props.layoutDispatch.alertAdd({
          time: new Date(),
          message: props.intl.formatMessage(hrMessage.shared.message.deleteFailure),
          details: isObject(submitError) ? submitError.message : submitError
        });
      }
    }
  }
};

const hrCornerCategoryDetailView: React.SFC<AllProps> = props => {
  const { isDetailOpen, data, onClose, handleOpenForm, handleCategory } = props;

  const render = (
    <div>
      {data &&
        <Dialog
          open={isDetailOpen}
          onClose={() => onClose(false)}
          scroll="paper"
          onBackdropClick={() => onClose(false)}
        >
          <DialogContent>
            <HrCornerCategoryInformation data={data} />
          </DialogContent>
          <DialogActions>
            <Button fullWidth color="secondary"
              onClick={() => {
                props.handleOpenDelete();
              }}
            >
              <DeleteForever className={props.classes.marginFarRight} />
              {props.intl.formatMessage(layoutMessage.action.delete)}
            </Button>
            <Button fullWidth color="primary"
              onClick={() => {
                onClose(false);
                handleOpenForm();
                handleCategory(data);
              }}
            >
              <Edit className={props.classes.marginFarRight} />
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          </DialogActions>
        </Dialog>
      }
      <Delete 
        action={props.action}
        isOpenDialog={props.dialogOpen}
        title={props.dialogTitle}
        content={props.dialogContent}
        labelCancel={props.dialogCancelLabel}
        labelConfirm={props.dialogConfirmLabel}
        handleDialogOpen={props.handleOnOpenDialog}
        handleDialogClose={props.handleOnCloseDialog}
        handleDialogConfirmed={props.handleOnConfirm}
        onSubmit={props.handleSubmit} 
        onSubmitSuccess={props.handleSubmitSuccess}
        onSubmitFail={props.handleSubmitFail}
      />
    </div>
  );

  return render;
};

export const HrCornerCategoryDetailView = compose<AllProps, IOwnProps>(
  injectIntl,
  withUser,
  withLayout,
  withHrCornerCategory,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles)
)(hrCornerCategoryDetailView);
