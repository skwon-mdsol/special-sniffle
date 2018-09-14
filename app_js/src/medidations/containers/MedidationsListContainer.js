import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {loadMedidations} from '../actions';
import MedidationsList from '../components/MedidationsList';
import {medidations} from '../propTypes';

export class MedidationsListContainer extends React.Component {
  constructor (props) {
    super(props);
    this.onPaginate = this.onPaginate.bind(this);
  }

  componentDidMount () {
    if (this.props.medidations.loaded) return;
    this.props.loadMedidations();
  }

  onPaginate ({page, perPage}) {
    this.props.loadMedidations(page, perPage);
  }

  render () {
    return <MedidationsList {...this.props.medidations} onPaginate={this.onPaginate} />;
  }
}

MedidationsListContainer.propTypes = {
  medidations: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    totalResults: PropTypes.number.isRequired,
    items: medidations
  }),
  loadMedidations: PropTypes.func.isRequired
};

export default connect(
  ({medidations}) => ({medidations}),
  {loadMedidations}
)(MedidationsListContainer);
