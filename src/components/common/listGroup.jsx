import React, { Component } from 'react';

class ListGroup extends Component {
	state = {};
	render() {
		const {
			items,
			textProperty,
			valueProperty,
			onItemSelect,
			selectedItem,
		} = this.props;
		return (
			<ul className='list-group' style={{ cursor: 'pointer' }}>
				{items.map((item) => (
					<li
						key={item[valueProperty]}
						onClick={() => onItemSelect(item)}
						className={
							item === selectedItem
								? 'list-group-item active'
								: 'list-group-item'
						}>
						{item[textProperty]}
					</li>
				))}
			</ul>
		);
	}
}

ListGroup.defaultProps = {
	textProperty: 'name',
	valueProperty: '_id',
};
export default ListGroup;
