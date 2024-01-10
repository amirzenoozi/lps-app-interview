import React, { useState } from 'react';
import './style.scss';

interface RadioProps {
	value: string;
	label: string;
	name: string;
	checked: boolean;
	clickHandler: (e: any) => void;
}

interface RadioOptions {
	value: string;
	label: string;
}


interface RadioGroupProps {
	options: Array<RadioOptions>;
	value: string;
	name: string;
	clickHandler: (value: string) => void;
}


const Radio: React.FC<RadioProps> = ({ value, label, name, checked, clickHandler }) => {

	const handleClick = (e: any) => {
		clickHandler(e.target.value);
	};

	return (
		<div className={'radio'}>
			<input type='radio' value={value} name={name} onChange={handleClick} checked={checked} />
			<label>{ label }</label>
			<span className={'radio-selector'} />
		</div>
	);
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, name, clickHandler }) => {
	const [selected, setSelected] = useState<string>(value);

	const RadioClickHandler = (value: string) => {
		setSelected(value);
		clickHandler(value);
	};

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
				);
			})}
		</div>
	);
}

export default RadioGroup;
