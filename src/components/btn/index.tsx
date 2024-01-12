import React from 'react'
import type BtnProps from './type'
import './style.scss'
import IconsList from '../../constants/icons'

const Btn = ({
	text = '',
	variant = 'primary-dark',
	icon = false,
	iconName = '',
	iconPosition = 'left',
	type = 'button',
	size = 24,
	disable = false,
	to = '',
	...props
}: BtnProps) => {
	return (
		<button
			className={BtnClassGenerator(variant, icon, iconPosition, disable)}
			type={type}
			disabled={disable}
			{...props}
		>
			{!icon && (iconName !== '') && iconPosition === 'left' && IconsList[iconName]}
			{icon && (iconName !== '') && IconsList[iconName]}
			{!icon && text}
			{!icon && (iconName !== '') && iconPosition === 'right' && IconsList[iconName]}
		</button>
	)
}

const BtnClassGenerator = (variant: string, icon: boolean, iconPosition: string, disable: boolean) => {
	const classes = [
		'btn',
		`btn--${variant}`,
		iconPosition === 'left' && 'btn--prepend',
		iconPosition === 'right' && 'btn--append',
		disable && 'btn--disabled',
		icon && 'btn--icon'
	]
	return classes.join(' ')
}

export default Btn
