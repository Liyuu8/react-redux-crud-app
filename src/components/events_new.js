import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { postEvent } from '../actions';

class EventsNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;
    return (
      // <div>{console.log(input)}</div>
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        fullWidth={true}
        {...input}
      />
    );
  }

  async onSubmit(values) {
    await this.props.postEvent(values);
    this.props.history.push('/');
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    const formStyle = {
      padding: 12,
    };
    const buttonStyle = {
      margin: 12,
    };

    return (
      <form style={formStyle} onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field
            label="Title"
            name="title"
            type="text"
            component={this.renderField}
          ></Field>
        </div>
        <div>
          <Field
            label="Body"
            name="body"
            type="text"
            component={this.renderField}
          ></Field>
        </div>

        <RaisedButton
          label="Submit"
          type="submit"
          style={buttonStyle}
          disabled={pristine || submitting || invalid}
        />
        <RaisedButton
          label="Cancel"
          style={buttonStyle}
          containerElement={<Link to="/" />}
        />
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  console.log(values);

  if (!values.title) {
    errors.title = 'Enter a title, please.';
  }
  if (!values.body) {
    errors.body = 'Enter a body, please.';
  }
  return errors;
};

const mapDispatchToProps = { postEvent };

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ validate, form: 'eventNewForm' })(EventsNew));
