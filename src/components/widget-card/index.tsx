import React from 'react';
import Icon from '@icon-park/react/es/all';
import './style.scss';
import WidgetCardProps from './type';

const WidgetCard= ({ title, children }: WidgetCardProps) => {
	return (
		<div className={'widgetCard'}>
			<div className={'widgetCard__header'}>
				<p>{ title }</p>
				<Icon type={'HamburgerButton'} theme={'outline'} size={'20'} />
			</div>
			<div className={'widgetCard__content'}>
				{ children }
			</div>
		</div>
	);
}

export default WidgetCard;

