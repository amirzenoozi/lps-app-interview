import type { Meta, StoryObj } from '@storybook/react'
import DataTable from '../components/data-table'

const meta = {
	title: 'Components/Table',
	component: DataTable,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		onHeaderClick: { control: 'function', defaultValue: () => {} },
		headers: { control: 'object', defaultValue: [], description: 'The header control what field will be shown in your table.' },
		records: { control: 'object', defaultValue: [], description: 'The List of your records.' }
	}
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		onHeaderClick: (header: string) => {
			console.log(header)
		},
		headers: [
			{ title: 'ID', slug: 'id', sortable: false, style: {} },
			{ title: 'Name', slug: 'name', sortable: false, style: {} },
			{ title: 'Age', slug: 'age', sortable: false, style: {} },
			{ title: 'Username', slug: 'username', sortable: false, style: {} },
			{ title: 'Salary', slug: 'salary', sortable: false, style: {} }
		],
		records: [
			{ id: 1, name: 'John', age: 20, username: 'johndooo', salary: '80,000$' },
			{ id: 2, name: 'Jane', age: 24, username: 'janeee', salary: '85,000$' },
			{ id: 3, name: 'Joe', age: 30, username: 'joenolan', salary: '120,000$' },
			{ id: 4, name: 'Jill', age: 32, username: 'jill_32', salary: '45,000$' },
			{ id: 5, name: 'Jack', age: 40, username: 'jackgreen', salary: '12,000$' }
		]
	}
}
