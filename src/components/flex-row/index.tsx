import React from 'react';
import './style.scss';
import FlexRowProps from './type';

const FlexRow = ({ stretch = false, children }: FlexRowProps) => {
	return (
		<div className={['row', stretch && 'row--stretch'].join(' ')}>
			{ children }
		</div>
	);
}

export default FlexRow;
