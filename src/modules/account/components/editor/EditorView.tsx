import { FormMode } from '@generic/types';
import * as React from 'react';
import AccountEmployeeEditor from './AccountEmployeeEditor';
import { EditorProps } from './Editor';
// import { AccountEmployeeFamilyList } from './form/family/AccountEmployeeFamilyList';
import { AccountEmployeeFamilyEditor } from './form/family/AccountEmployeeFamilyEditor';

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