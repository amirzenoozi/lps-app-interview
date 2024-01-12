import React from 'react'
import { render, screen } from '@testing-library/react'
import RadioGroup from './index'
import metricOptions from '../../constants/metricOptions'

describe('RadioGroup', () => {
	test('Single Radio', () => {
		render(<RadioGroup options={[metricOptions[0]]} name={'metric'} value={'all'} clickHandler={(msg) => { console.log(msg) }} />)
		const linkElement = screen.getByLabelText(/All/i)
		expect(linkElement).toBeInTheDocument()
	})

	test('Multiple Radio', () => {
		render(<RadioGroup options={metricOptions} name={'metric'} value={'all'} clickHandler={(msg) => { console.log(msg) }} />)
		const allLabel = screen.getByLabelText(/All/i)
		const cpuLabel = screen.getByLabelText(/CPU/i)
		const memoryLabel = screen.getByLabelText(/Memory/i)
		expect(allLabel).toBeInTheDocument()
		expect(cpuLabel).toBeInTheDocument()
		expect(memoryLabel).toBeInTheDocument()
	})
})
