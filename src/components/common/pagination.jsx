import React, { Component } from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';

class Pagination extends Component {
	state = {};
	render() {
		const { itemsCount, pageSize, onPageChange, currPage } = this.props;
		const pagesCount = Math.ceil(itemsCount / pageSize);
		if (pagesCount === 1) return null;
		const pages = _.range(1, pagesCount + 1);

		return (
			<nav aria-label='Page navigation example'>
				<ul className='pagination'>
					{pages.map((p) => (
						<li
							key={p}
							className={p === currPage ? 'page-item active' : 'page-item'}>
							<a onClick={() => onPageChange(p)} className='page-link'>
								{p}
							</a>
						</li>
					))}
				</ul>
			</nav>
		);
	}
}

Pagination.propTypes = {
	itemsCount: propTypes.number.isRequired,
	pageSize: propTypes.number.isRequired,
	onPageChange: propTypes.func.isRequired,
	currPage: propTypes.number.isRequired,
};

export default Pagination;
