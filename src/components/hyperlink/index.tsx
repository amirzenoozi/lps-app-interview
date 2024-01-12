import React from 'react'
import './style.scss'
import type HyperlinkProps from './type'

const Hyperlink = ({
	text = '',
	variant = 'primary-dark',
	icon = false,
	iconName = '',
	iconPosition = 'left',
	type = 'button',
	size = 24,
	to = '',
	target = '_blank',
	children,
	...props
}: HyperlinkProps) => {
	return (
		<a
			className={BtnClassGenerator(variant, icon, iconName, iconPosition)}
			type={type}
			href={to}
			target={target}
			{...props}
		>
			{children}
		</a>
	)
}

const BtnClassGenerator = (variant: string, icon: boolean, iconName: string, iconPosition: string) => {
	const classes = [
		'hyperlink',
		`hyperlink--${variant}`,
		iconPosition === 'left' && 'hyperlink--prepend',
		iconPosition === 'right' && 'hyperlink--append',
		icon && 'hyperlink--icon'
	]
	return classes.join(' ')
}

export default Hyperlink
