import React from 'react';
import FlexRowProps from './type';
import './style.scss';


const Container = ({ children }: FlexRowProps) => {
	return (
		<div className={'container'}>
			{ children }
		</div>
	);
}

export default Container;
