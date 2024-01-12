import React from 'react'
import { render, screen } from '@testing-library/react'
import Hyperlink from './index'

describe('HyperLink', () => {
	test('Text', () => {
		render(<Hyperlink variant={'primary-dark'}>Click</Hyperlink>)
		const linkElement = screen.getByText(/Click/i)
		expect(linkElement).toBeInTheDocument()
	})
	test('HTML Node', () => {
		render(<Hyperlink variant={'primary-dark'}><span>Click</span></Hyperlink>)
		const linkElement = screen.getByText(/Click/i)
		expect(linkElement).toBeInTheDocument()
	})
})
