import FontAndFavicon from 'src/modules/layout/components/FontAndFavicon/FontAndFavicon';
import Footer from 'src/modules/layout/components/Footer/Footer';
import Header from 'src/modules/layout/components/Header/Header';

function Layout({ children }) {
  return (
    <>
      <FontAndFavicon />
      <div className="site">
        <Header />
        <main style={{ display: 'flex', flexDirection: 'column' }}>{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
