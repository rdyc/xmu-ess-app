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
      props.selected.length > 0 &&
      <div>
        <hr/>
        <span>With {props.selected.length} selection(s) </span>
        <Link
          to={{
            search: '',
            hash: '',
            pathname: '/some/url',
            state: { items: props.selected }
          }}
        >
          Process
        </Link>
      </div>
    }

    <hr/>
    <h4>Selected</h4>
    <pre>{JSON.stringify(props.selected, null, 2)}</pre>
  </div>
);