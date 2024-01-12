import React from 'react'
import { render, screen } from '@testing-library/react'
import Container from './index'

describe('Layout', () => {
	test('Container', () => {
		render(<Container>Hello</Container>)
		const linkElement = screen.getByText(/Hello/i)
		expect(linkElement).toBeInTheDocument()
	})
})
