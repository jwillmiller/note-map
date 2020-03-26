import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {noteStyle} from './NoteStyles.js';

export default class Note extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  render() {
    return (
       <div style={noteStyle}>
          {this.props.text}
       </div>
    );
  }
}