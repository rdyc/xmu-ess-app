import { IBaseMetadata, IQueryCollectionState } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { WithStyles, withStyles } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import styles from '@styles';
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

import { CollectionPageDataContainerView } from './CollectionPageDataContainerView';

export interface IDataControl {
  id: string;
  title: string;
  icon: React.ComponentType<SvgIconProps>;
  showBadgeWhen: () => boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

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

interface IOwnOption {
  state: IQueryCollectionState<any, any>;
  pagination: {
    field?: string;
    direction?: string;
    page: number;
    size: number;
  };
  metadata: IBaseMetadata | undefined;
  fields: ICollectionValue[];
  onClickSync: (event: React.MouseEvent<HTMLElement>) => void;
  onClickRetry: (event: React.MouseEvent<HTMLElement>) => void;
  onClickNext: (event: React.MouseEvent<HTMLElement>) => void;
  onClickPrevious: (event: React.MouseEvent<HTMLElement>) => void;

  onChangeField: (field: string) => void;
  onChangeOrder: (direction: string) => void;
  onChangeSize: (size: number) => void;

  additionalControls?: IDataControl[]; 
}

interface IOwnState {
  menuAnchor?: string;
  menuItems?: ICollectionValue[];
  menuOrderItems: ICollectionValue[];
  menuItemActive?: any;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setMenu: StateHandler<IOwnState>;
  setMenuClear: StateHandler<IOwnState>;
  setMenuActive: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnClickMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleOnClickMenuItem: (item: ICollectionValue) => void;
}

export type CollectionPageDataContainerProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & InjectedIntlProps
  & WithStyles<typeof styles>;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  menuOrderItems: [
    ...props.fields,
    { name: 'Last Changes', value: undefined }
  ]
});
  
const stateUpdaters: StateUpdaters<IOwnOption, IOwnState, IOwnStateUpdater> = {
  setMenu: (prevState: IOwnState) => (anchorId: string, items: ICollectionValue[]) => ({
    menuItems: items,
    menuAnchor: anchorId
  }),
  setMenuClear: (prevState: IOwnState) => () => ({
    menuAnchor: undefined
  }),
  setMenuActive: (prevState: IOwnState) => (value?: string) => ({
    menuItemActive: value
  }),
};

const handlerCreators: HandleCreators<CollectionPageDataContainerProps, IOwnHandler> = {
  handleOnClickMenu: (props: CollectionPageDataContainerProps) => (event: React.MouseEvent<HTMLElement>) => {
    // get current element id
    const anchor = event.currentTarget.id;

    // populate menu items
    let items: ICollectionValue[] | undefined;
    
    switch (anchor) {
      case 'option-field':
        items = props.menuOrderItems;
        props.setMenuActive(props.pagination.field);
        break;

      case 'option-order':
        items = order;
        props.setMenuActive(props.pagination.direction);
        break;

      case 'option-size':
        items = sizes;
        props.setMenuActive(props.pagination.size);
        break;
      
      default:
        props.setMenuActive(undefined);
        break;
    }

    // set state anchor id and items
    props.setMenu(anchor, items);
  },
  handleOnClickMenuItem: (props: CollectionPageDataContainerProps) => (item: ICollectionValue) => {
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

export const CollectionPageDataContainer = compose<CollectionPageDataContainerProps, IOwnOption>(
  setDisplayName('CollectionPageDataContainer'),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles)
)(CollectionPageDataContainerView);