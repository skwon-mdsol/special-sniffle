import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {loadMedidations} from '../actions';
import {medidation} from '../propTypes';

import MedidationDetail from '../components/MedidationDetail';

export class MedidationDetailContainer extends React.Component {
  componentDidMount () {
    // load data if we're hard refreshing on this page
    if (!this.props.medidation) {
      this.props.loadMedidations();
    }
  }

  render () {
    const {medidation} = this.props;
    if (medidation) {
      return <MedidationDetail medidation={medidation} />;
    }
    return <noscript />;
  }
}

MedidationDetailContainer.propTypes = {
  medidation: medidation,
  loadMedidations: PropTypes.func.isRequired
};

export default connect(
  ({medidations}, {match}) => {
    return {medidation: medidations.items.find(m => m.id.toString() === match.params.medidationId)};
  },
  {loadMedidations}
)(MedidationDetailContainer);
