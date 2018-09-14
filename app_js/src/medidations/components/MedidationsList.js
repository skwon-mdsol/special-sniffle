import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {FormattedMessage} from 'react-intl';
import Paginate from 'lego/lib/Paginate';

import {medidations} from '../propTypes';

export default class MedidationsList extends React.PureComponent {
  render () {
    return <div>
      <table className='table' id='medidations-list'>
        <thead>
          <tr>
            <th>
              <FormattedMessage id='medidations.list.name' defaultMessage='Name' />
            </th>
            <th>
              <FormattedMessage id='medidations.list.title' defaultMessage='Title' />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.items.map(m => (
            <tr key={m.id} >
              <td><Link to={`/medidations/${m.id}`}>{m.name}</Link></td>
              <td>{m.title.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginate totalItems={this.props.totalResults} currentPage={1} perPage={10} translations={{
        of: <FormattedMessage id='paginate.of' defaultMessage='of' />,
        totalResults: <FormattedMessage id='paginate.totalResults' defaultMessage='Total Results' />,
        perPage: <FormattedMessage id='paginate.perPage' defaultMessage='per page' />
      }}
        onPaginate={this.props.onPaginate} />
    </div>;
  }
}

MedidationsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  items: medidations.isRequired,
  onPaginate: PropTypes.func.isRequired
};
