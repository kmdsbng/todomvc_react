/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app = app || {};

(function () {
  'use strict';

  var ESCAPE_KEY = 27;
  var ENTER_KEY = 13;

  app.TodoItem = React.createClass({
    getInitialState: function() {
      return {editText: this.props.todo.title};
    },
    handleEdit: function() {
      this.props.onEdit();
      this.setState({editText: this.props.todo.title});
    },
    handleSubmit: function(e) {
      var val = this.state.editText.trim();
      if (val) {
        this.props.onSave(val);
        this.setState({editText: val});
      } else {
        this.props.onDestroy();
      }

    },
    handleChange: function(e) {
      this.setState({editText: e.target.value});
    },
    handleKeyDown: function(e) {
      if (e.which === ESCAPE_KEY) {
        this.setState({ediText: this.props.todo.title});
        this.props.onCancel(e);
      } else if (e.which === ENTER_KEY) {
        this.handleSubmit(e);
      }
    },
    render: function() {
      return (
        <li className={React.addons.classSet({
          completed: this.props.todo.completed,
          editing: this.props.editing
        })}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={this.props.todo.completed}
              onClick={this.props.onToggle}
            />
            <label onDoubleClick={this.handleEdit}>
              {this.props.todo.title}
            </label>
            <button className="destroy"
              onClick={this.props.onDestroy}
            />
          </div>
          <input
            ref="editField"
            className="edit"
            value={this.state.editText}
            onBlur={this.handleSubmit}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </li>
      );
    }
  });
})();

