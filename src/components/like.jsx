import React, { Component } from 'react';

class Like extends Component {
	state = {};

	render() {
		let classes = 'fa fa-heart';
		if (!this.props.liked) classes += '-o';
		return (
			<i
				onClick={this.props.onLike}
				style={{ cursor: 'pointer' }}
				class={classes}
				aria-hidden='true'></i>
		);
	}
}

export default Like;
