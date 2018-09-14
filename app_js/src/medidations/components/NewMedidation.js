import React from 'react';
import {reduxForm, Field} from 'redux-form';

import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import {FormattedMessage} from 'react-intl';

import {TextField, SelectField} from '../../util/formFields';

class NewMedidation extends React.PureComponent {
  render () {
    return <Panel>
      <form onSubmit={this.props.form.handleSubmit} >
        <Field name='name' component={TextField}
          label={<FormattedMessage id='new-medidation.name' defaultMessage='Name' />}
        />
        <Field name='title' component={SelectField}
          label={<FormattedMessage id='new-medidation.title' defaultMessage='Title' />}
          options={this.props.titles.map(t => (
            <option key={t.id} value={t.id}>{t.value}</option>
          ))}
        />
        <Button type='submit'><FormattedMessage id='new-medidation.submit' defaultMessage='Submit' /></Button>
      </form>
    </Panel>;
  }
}

NewMedidation.propTypes = {
};

export default reduxForm({
  form: 'new-medidation',
  propNamespace: 'form',
  validate: (values) => {
    let errors = {};
    if (!values.name || values.name.trim() === '') {
      errors.name = <FormattedMessage id='new-medidation.errors.name.blank' defaultMessage='Name is required' />;
    } else if (values.name.length > 255) {
      errors.name = <FormattedMessage id='new-medidation.errors.name.tooLong' defaultMessage='Name is too long' />;
    }

    if (!values.title) {
      errors.title = <FormattedMessage id='new-medidation.errors.title.blank' defaultMessage='You must select a title' />;
    }

    return errors;
  }
})(NewMedidation);
