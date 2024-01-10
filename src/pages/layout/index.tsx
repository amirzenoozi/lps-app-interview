import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/nav-bar';
import './style.scss';

const Layout = () => {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
}

export default Layout;
