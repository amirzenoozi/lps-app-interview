import React from 'react'
import './style.scss'
import { type DataTableProps, type DataTableHeaderProp, type DataTableCellProp, type DataTableHeaderCellProp } from './type'
import { SortTwo } from '@icon-park/react'

const DataTableHeader = ({ slug, title, sortable, style, onHeaderClick }: DataTableHeaderCellProp) => {
	const headerClick = () => {
		if (sortable) {
			onHeaderClick(slug)
		}
	}

	return (
		<th style={style} onClick={headerClick}>
			{title}
			{sortable && <SortTwo theme={'outline'} size={14}/>}
		</th>
	)
}

const DataTableCell = ({ value, style }: DataTableCellProp) => {
	return (
		<td style={style}>
			{value}
		</td>
	)
}

const DataTable = ({ headers, records, onHeaderClick }: DataTableProps) => {
	return (
		<div className={'table'}>
			<table border={0} cellSpacing={0}>
				<thead>
					<tr>
						{headers.map((item: DataTableHeaderProp) => {
							return <DataTableHeader key={item.slug} onHeaderClick={onHeaderClick} {...item} />
						})}
					</tr>
				</thead>
				<tbody>
					{records.map((item: any, index: number) => {
						return (
							<tr key={index}>
								{headers.map((header: DataTableHeaderProp) => {
									return <DataTableCell key={header.slug} value={item[header.slug]} style={header.style} />
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default DataTable
