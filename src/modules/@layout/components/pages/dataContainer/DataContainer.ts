import { IBaseMetadata } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  mapper,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { DataContainerView } from './DataContainerView';

const sizes: ICollectionValue[] = [
  { value: 5, name: '5' },
  { value: 10, name: '10' },
  { value: 15, name: '15' },
  { value: 20, name: '20' },
  { value: 25, name: '25' }
];

const order: ICollectionValue[] = [
  { value: 'ascending', name: 'Ascending' },
  { value: 'descending', name: 'Descending' }
];

interface OwnOption {
  isLoading: boolean;
  state: {
    field?: string;
    direction?: string;
    page: number;
    size: number;
  };
  className: string;
  metadata: IBaseMetadata | undefined;
  fields: ICollectionValue[];
  onClickSync: (event: React.MouseEvent<HTMLElement>) => void;
  onClickNext: (event: React.MouseEvent<HTMLElement>) => void;
  onClickPrevious: (event: React.MouseEvent<HTMLElement>) => void;

  onChangeField: (field: string) => void;
  onChangeOrder: (direction: string) => void;
  onChangeSize: (size: number) => void;
}

interface OwnState {
  menuAnchor?: string;
  menuItems?: ICollectionValue[];
  menuOrderItems: ICollectionValue[];
  menuItemActive?: any;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setMenu: StateHandler<OwnState>;
  setMenuClear: StateHandler<OwnState>;
  setMenuActive: StateHandler<OwnState>;
}

interface OwnHandler {
  handleOnClickMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleOnClickMenuItem: (item: ICollectionValue) => void;
}

export type DataContainerProps
  = OwnOption
  & OwnState
  & OwnStateUpdater
  & InjectedIntlProps;

const createProps: mapper<OwnOption, OwnState> = (props: OwnOption): OwnState => ({
  menuOrderItems: [
    ...props.fields,
    { name: 'Last Changes', value: undefined }
  ]
});
  
const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setMenu: (prevState: OwnState) => (anchorId: string, items: ICollectionValue[]) => ({
    menuItems: items,
    menuAnchor: anchorId
  }),
  setMenuClear: (prevState: OwnState) => () => ({
    menuAnchor: undefined
  }),
  setMenuActive: (prevState: OwnState) => (value?: string) => ({
    menuItemActive: value
  }),
};

const handlerCreators: HandleCreators<DataContainerProps, OwnHandler> = {
  handleOnClickMenu: (props: DataContainerProps) => (event: React.MouseEvent<HTMLElement>) => {
    // get current element id
    const anchor = event.currentTarget.id;

    // populate menu items
    let items: ICollectionValue[] | undefined;
    
    switch (anchor) {
      case 'option-field':
        items = props.menuOrderItems;
        props.setMenuActive(props.state.field);
        break;

      case 'option-order':
        items = order;
        props.setMenuActive(props.state.direction);
        break;

      case 'option-size':
        items = sizes;
        props.setMenuActive(props.state.size);
        break;
      
      default:
        props.setMenuActive(undefined);
        break;
    }

    // set state anchor id and items
    props.setMenu(anchor, items);
  },
  handleOnClickMenuItem: (props: DataContainerProps) => (item: ICollectionValue) => {
    // clear current menu
    props.setMenuClear();
    
    // exec callback by anchor
    switch (props.menuAnchor) {
      case 'option-field':
        props.onChangeField(item.value);
        break;

      case 'option-order':
        props.onChangeOrder(item.value);
        break;
    
      case 'option-size':
        props.onChangeSize(item.value);
        break;

      default:
        break;
    }
  }
};

export const DataContainer = compose<DataContainerProps, OwnOption>(
  setDisplayName('DataContainer'),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(DataContainerView);