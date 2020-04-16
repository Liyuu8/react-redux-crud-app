import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { getEvent, deleteEvent, putEvent } from '../actions';

class EventsShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.getEvent(id);
    }
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

  async onDeleteClick() {
    // this.propsの内容を確認
    console.log(this.props.match);

    const { id } = this.props.match.params;
    await this.props.deleteEvent(id);
    this.props.history.push('/');
  }

  async onSubmit(values) {
    await this.props.putEvent(values);
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
        <RaisedButton
          label="Delete"
          style={buttonStyle}
          containerElement={<Link to="/" />}
          onClick={this.onDeleteClick}
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

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id];
  return { initialValues: event, event };
};
const mapDispatchToProps = { deleteEvent, getEvent, putEvent };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(
    EventsShow
  )
);
