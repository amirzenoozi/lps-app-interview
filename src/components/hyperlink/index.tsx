import React from 'react'
import './style.scss'
import type HyperlinkProps from './type'

const Hyperlink = ({
	text = '',
	variant = 'primary-dark',
	type = 'button',
	size = 24,
	to = '',
	target = '_blank',
	children,
	...props
}: HyperlinkProps) => {
	return (
		<a
			className={BtnClassGenerator(variant)}
			type={type}
			href={to}
			target={target}
			{...props}
		>
			{children}
		</a>
	)
}

const BtnClassGenerator = (variant: string) => {
	const classes = [
		'hyperlink',
		`hyperlink--${variant}`
	]
	return classes.join(' ')
}

export default Hyperlink
