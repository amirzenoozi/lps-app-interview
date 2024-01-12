import React from 'react'
import { render, screen } from '@testing-library/react'
import FlexRow from './index'
import FlexCol from '../flex-col'

describe('Grids', () => {
	test('Row+Col', () => {
		render(<FlexRow><FlexCol xs={24} sm={12} md={8} lg={6} xl={4} xxl={3}>Hello</FlexCol></FlexRow>)
		const linkElement = screen.getByText(/Hello/i)
		expect(linkElement).toBeInTheDocument()
	})
})
