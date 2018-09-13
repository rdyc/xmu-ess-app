import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import styled from '../../utils/styled';
import Page from '../../components/layout/Page';
import Container from '../../components/layout/Container';
import DataTable from '../../components/layout/DataTable';
import LoadingOverlay from '../../components/data/LoadingOverlay';
import LoadingOverlayInner from '../../components/data/LoadingOverlayInner';
import LoadingSpinner from '../../components/data/LoadingSpinner';

import { ApplicationState, ConnectedReduxProps } from '../../store';
import { Hero } from '../../store/heroes/types';
import { fetchRequest } from '../../store/heroes/actions';

const TableWrapper = styled('div')`
  position: relative;
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  min-height: 200px;
`;

const HeroLoading = styled('tr')`
  td {
    height: 48px;
    text-align: center;
  }
`;

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean;
  data: Hero[];
  errors: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

class HeroesIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    this.props.fetchRequest();
  }

  public render() {
    const { loading } = this.props;

    return (
      <Page>
        <Container>
          <TableWrapper>
            {loading && (
              <LoadingOverlay>
                <LoadingOverlayInner>
                  <LoadingSpinner />
                </LoadingOverlayInner>
              </LoadingOverlay>
            )}
            <p>
              <small>*in last 30 days</small>
            </p>
            {this.renderData()}
          </TableWrapper>
        </Container>
      </Page>
    );
  }

  private renderData() {
    const { loading, data } = this.props;

    return (
      <DataTable columns={['PID', 'Name', 'Customer']} widths={['auto', '', '']}>
        {loading &&
          data.length === 0 && (
            <HeroLoading>
              <td colSpan={3}>Loading...</td>
            </HeroLoading>
          )}
        {data.map(hero => (
          <tr key={hero.uid}>
            <td>{hero.uid}</td>
            <td>
              {hero.name} <br/>{hero.description}
            </td>
            <td>{hero.customer.name} - {hero.customer.company.name}</td>
          </tr>
        ))}
      </DataTable>
    );
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ heroes }: ApplicationState) => ({
  loading: heroes.loading,
  errors: heroes.errors,
  data: heroes.data
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest())
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroesIndexPage);