import Header from './header';
import Footer from './footer';
import Main from './main';


export default function Layout() {
	return (
		<div className="page-container">

			<Header />

			<Main />

			<Footer />
		</div>
	);
}
