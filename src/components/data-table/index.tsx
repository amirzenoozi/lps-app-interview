import React from 'react';
import './style.scss';
import Icon from '@icon-park/react/es/all';
import { DataTableProps, DataTableHeader, DataTableCell, DataTableHeaderCell} from './type';

const DataTableHeader = ({slug, title, sortable, style, onHeaderClick}: DataTableHeaderCell) => {
	const headerClick = () => {
		if (sortable) {
			onHeaderClick(slug);
		}
	};


	return (
		<th style={style} onClick={headerClick}>
			{title}
			{sortable && <Icon type={'SortTwo'} theme={'outline'} size={14}/>}
		</th>
	);
};


const DataTableCell = ({value, style}: DataTableCell) => {
	return (
		<td style={style}>
			{value}
		</td>
	);
};


const DataTable = ({headers, records, onHeaderClick}: DataTableProps) => {
	return (
		<div className={'table'}>
			<table border={0} cellSpacing={0}>
				<thead>
				<tr>
					{headers.map((item: DataTableHeader) => {
						return <DataTableHeader key={item.slug} onHeaderClick={onHeaderClick} {...item} />;
					})}
				</tr>
				</thead>
				<tbody>
				{records.map((item: any, index: number) => {
					return (
						<tr key={index}>
							{headers.map((header: DataTableHeader) => {
								return <DataTableCell key={header.slug} value={item[header.slug]} style={header.style} />;
							})}
						</tr>
					);
				})}
				</tbody>
			</table>
		</div>
	);
}

export default DataTable;
