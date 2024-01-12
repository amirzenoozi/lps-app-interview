import React from 'react'
import './style.scss'
import type WidgetCardProps from './type'
import { HamburgerButton } from '@icon-park/react'

const WidgetCard = ({ title, children }: WidgetCardProps) => {
	return (
		<div className={'widgetCard'}>
			<div className={'widgetCard__header'}>
				<p>{ title }</p>
				<HamburgerButton theme={'outline'} size={'20'} />
			</div>
			<div className={'widgetCard__content'}>
				{ children }
			</div>
		</div>
	)
}

export default WidgetCard
