import React, { Component } from 'react';
class TableHeader extends Component {
	raiseSort = (path) => {
		const sortColumn = { ...this.props.sortColumn };
		if (sortColumn.path === path)
			sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
		else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}
		this.props.onSort(sortColumn);
	};

	renderSortIcon = (column) => {
		const { sortColumn } = this.props;
		if (column.path !== sortColumn.path) return;
		return sortColumn.order === 'asc' ? (
			<i className='fa fa-sort-asc'></i>
		) : (
			<i className='fa fa-sort-desc'></i>
		);
	};
	render() {
		return (
			<thead className='thead-dark'>
				<tr style={{ cursor: 'pointer' }}>
					{this.props.columns.map((column) => (
						<th
							key={column.path || column.key}
							onClick={() => this.raiseSort(column.path)}
							scope='col'>
							{column.label} {this.renderSortIcon(column)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;
