import React, { Component } from 'react';

class PinnedNote extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <textarea value={this.props.value} onChange={this.props.onChange} />
        );
    }
}

export default PinnedNote;