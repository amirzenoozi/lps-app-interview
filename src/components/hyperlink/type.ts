import type React from 'react'

interface HyperlinkProps {
	text?: string
	variant?: 'primary-dark' | 'primary-light' | 'secondary' | 'ghost-dark' | 'ghost-light' | 'linear-light'
	type?: 'button' | 'submit' | 'reset'
	size?: number
	to?: string
	target?: '_blank' | '_self' | '_parent' | '_top'
	children?: React.ReactNode
	props?: any
}

export default HyperlinkProps
