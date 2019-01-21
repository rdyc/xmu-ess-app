import { FormMode } from '@generic/types';
import * as React from 'react';
import AccountEmployeeEditor from './AccountEmployeeEditor';
import { EditorProps } from './Editor';

export const EditorView: React.SFC<EditorProps> = props => {
  const {formMode} = props;

  const renderNew = (
    <React.Fragment>
      <AccountEmployeeEditor formMode={formMode}/>
    </React.Fragment>
  );

  const renderEdit = (
    <React.Fragment>
      <AccountEmployeeEditor formMode={formMode}/>
    </React.Fragment> 
  );

  return (
    formMode === FormMode.New ? renderNew : renderEdit
  );
};