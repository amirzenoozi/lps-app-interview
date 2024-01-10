import React from 'react';
import Icon from '@icon-park/react/es/all';
import './style.scss';

interface FlexRowProps {
	title: string,
	children?: React.ReactNode;
}

const WidgetCard: React.FC<FlexRowProps> = ({ title, children }) => {
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

