import type { Meta, StoryObj } from '@storybook/react'
import Btn from '../components/btn'

const meta = {
	title: 'Components/Button',
	component: Btn,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		text: { control: 'text', defaultValue: 'Buttons' },
		type: { control: 'select', defaultValue: 'button', options: ['button', 'submit', 'reset'] },
		iconPosition: { control: 'select', defaultValue: 'left', options: ['left', 'right'] },
		iconName: { control: 'text', defaultValue: 'Save' },
		variant: {
			control: 'select',
			defaultValue: 'primary-dark',
			options: ['primary-dark', 'primary-light', 'secondary', 'ghost-dark', 'ghost-light', 'linear-light']
		}
	}
} satisfies Meta<typeof Btn>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		variant: 'primary-dark',
		text: 'Button',
		icon: false,
		iconName: 'Save',
		iconPosition: 'left',
		type: 'button',
		size: 24,
		to: '',
		disable: false
	}
}
