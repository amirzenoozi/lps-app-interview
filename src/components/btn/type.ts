import type IconsList from '../../constants/icons'

interface BtnProps {
	text?: string
	variant?: 'primary-dark' | 'primary-light' | 'secondary' | 'ghost-dark' | 'ghost-light' | 'linear-light'
	icon?: boolean
	iconName?: keyof typeof IconsList | ''
	iconPosition?: 'left' | 'right'
	type?: 'button' | 'submit' | 'reset'
	size?: number
	to?: string
	disable?: boolean
}

export default BtnProps
