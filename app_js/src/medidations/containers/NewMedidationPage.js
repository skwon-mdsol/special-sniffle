import React from 'react';
import {connect} from 'react-redux';
import {addMedidation} from '../actions';

import NewMedidation from '../components/NewMedidation';

function uniqTitles (medidations) {
  let titles = [];
  for (const m of medidations) {
    if (!titles.find(t => t.id === m.title.id)) {
      titles.push(m.title);
    }
  }
  return titles;
}

class NewMedidationPage extends React.Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit ({name, title: titleId}) {
    this.props.addMedidation({name, titleId});
  }

  render () {
    return <NewMedidation onSubmit={this.handleSubmit} titles={uniqTitles(this.props.medidations.items)} />;
  }
}

NewMedidationPage.propTypes = {
};

export default connect(
  ({medidations}) => ({medidations}),
  {addMedidation}
)(NewMedidationPage);
