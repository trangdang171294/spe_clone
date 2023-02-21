import Footer from 'src/components/Footer';
import Header from 'src/components/Header';

interface Props {
    children?: React.ReactNode;
}

function MainLayout(props: Props) {
    const { children } = props;
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default MainLayout;
