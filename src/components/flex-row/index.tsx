import React from 'react'
import './style.scss'
import type FlexRowProps from './type'

const FlexRow = ({ stretch = false, children }: FlexRowProps) => {
	return (
		<div className={['row', stretch && 'row--stretch'].join(' ')}>
			{ children }
		</div>
	)
}

export default FlexRow
