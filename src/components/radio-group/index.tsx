import React, { useState } from 'react'
import './style.scss'
import { type RadioGroupProps, type RadioProps } from './type'

const Radio = ({ value, label, name, checked, clickHandler }: RadioProps) => {
	const handleClick = (e: any) => {
		clickHandler(e.target.value)
	}

	return (
		<div className={'radio'}>
			<input id={`radio-${name}-${value}`} type='radio' value={value} name={name} onChange={handleClick} checked={checked} />
			<label htmlFor={`radio-${name}-${value}`}>{ label }</label>
			<span className={'radio-selector'} />
		</div>
	)
}

const RadioGroup = ({ options, value, name, clickHandler }: RadioGroupProps) => {
	const [selected, setSelected] = useState<string>(value)

	const RadioClickHandler = (value: string) => {
		setSelected(value)
		clickHandler(value)
	}

	return (
		<div className={'radio-group'}>
			{ options.map((item, index) => {
				return (
					<Radio
						key={`radio-${item.value}-${index}`}
						value={item.value}
						label={item.label}
						name={name}
						checked={selected === item.value}
						clickHandler={RadioClickHandler}
					/>
				)
			})}
		</div>
	)
}

export default RadioGroup
