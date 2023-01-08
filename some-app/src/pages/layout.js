import { Outlet, Link } from "react-router-dom";
import '../styles/App.css';

function Layout() {
	return (
		<>
		<nav>
			<ul role="menubar" aria-haspopup="true">
				<li><Link to="sign-in"><a>Sign in</a></Link></li>
			</ul>
		</nav>
		<Outlet />
		</>
	)
}

export default Layout;
