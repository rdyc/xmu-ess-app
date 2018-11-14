import * as React from 'react';
import { Link } from 'react-router-dom';

import { CollectionPageProps } from './CollectionPage';

export const CollectionPageView: React.SFC<CollectionPageProps> = props => (
  <div>
    {
      props.isLoading &&
      <div>Loading...</div>
    }

    {
      !props.isLoading &&
      props.response &&
      props.response.metadata &&
      props.response.metadata.paginate &&
      props.response.metadata.paginate.previous &&
      <button onClick={() => props.setPagePrevious()}>
        ({props.response.metadata.paginate.current - 1}) Pervious
      </button>
    }

    {
      !props.isLoading &&
      props.response &&
      props.response.data &&
      props.response.data.map((item, index) => {
        const bind = props.config.onBind(item, index);

        return (
          <div key={bind.key}>
            { 
              props.config.hasSelection &&
              <input 
                type="checkbox" 
                value={item.uid}
                checked={props.selected.indexOf(item.uid) !== -1}
                onChange={props.handleOnChangeSelection}
              /> 
            }
            
            <span>{bind.primary} {bind.secondary}</span>

            {
              props.config.hasRedirection &&
              <Link to={props.config.onRedirect(item)}>
                View
              </Link>
            }
          </div>
        );
      })
    } 

    {
      !props.isLoading &&
      props.response &&
      props.response.metadata &&
      props.response.metadata.paginate &&
      props.response.metadata.paginate.next &&
      <button onClick={() => props.setPageNext()}>
        ({props.response.metadata.paginate.total - props.response.metadata.paginate.current}) More
      </button>
    }
  </div>
);