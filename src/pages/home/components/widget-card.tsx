import React from 'react';
import Icon from '@icon-park/react/es/all';

interface FlexRowProps {
	title: string,
	children?: React.ReactNode;
}

const WidgetCard: React.FC<FlexRowProps> = ({ title, children }) => {
	return (
		<div className={'chartCard'}>
			<div className={'chartCard__header'}>
				<p>{ title }</p>
				<Icon type={'HamburgerButton'} theme={'outline'} size={'20'} />
			</div>
			<div className={'chartCard__content'}>
				{ children }
			</div>
		</div>
	);
}

export default WidgetCard;
