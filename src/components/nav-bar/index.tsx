import React from 'react'
import './style.scss'
import { NavLink } from 'react-router-dom'
import Icon from '@icon-park/react/es/all'

const NavBar = () => {
	const serverList = ['server01', 'server02', 'server03', 'server04', 'server05']
	return (
		<header className={'header'}>
			<nav>
				<NavLink
					to={'/'}
					className={({ isActive, isPending }) => isPending ? 'pending' : isActive ? 'active' : '' }
					data-tooltip-id="tooltip-area"
					data-tooltip-content="Home"
					data-tooltip-place="right"
				>
					<Icon type={'Home'} theme={'outline'} size={24} />
				</NavLink>
				{serverList.map((server, index) => {
					return (
						<NavLink
							key={server}
							to={`/servers/${server}`}
							className={({ isActive, isPending }) => isPending ? 'pending' : isActive ? 'active' : '' }
							data-tooltip-id="tooltip-area"
							data-tooltip-content={`Server 0${index + 1}`}
							data-tooltip-place="right"
						>
							<Icon type={'Server'} theme={'outline'} size={24} />
						</NavLink>
					)
				})}
			</nav>
		</header>
	)
}

export default NavBar
