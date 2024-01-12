export interface RadioProps {
	value: string
	label: string
	name: string
	checked: boolean
	clickHandler: (e: any) => void
}

export interface RadioOptions {
	value: string
	label: string
}

export interface RadioGroupProps {
	options: RadioOptions[]
	value: string
	name: string
	clickHandler: (value: string) => void
}
