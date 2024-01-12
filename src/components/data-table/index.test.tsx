import React from 'react'
import { render, screen } from '@testing-library/react'
import DataTable from './index'

describe('Table', () => {
	test('DataTable', () => {
		const headers = [
			{
				slug: 'shortLink',
				title: 'Short Link',
				sortable: true,
				style: { textAlign: 'left', width: '35%' }
			},
			{
				slug: 'status',
				title: 'Status',
				sortable: true,
				style: { textAlign: 'center', width: '10%' }
			}
		]
		const records = [
			{
				shortLink: 'Hello',
				status: 'Active'
			}
		]

		render(<DataTable headers={headers} records={records} onHeaderClick={(e: any) => { return false }} />)
		const linkElement = screen.getByText(/Active/i)
		expect(linkElement).toBeInTheDocument()
	})
})
