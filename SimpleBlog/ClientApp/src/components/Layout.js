import Navigation from "./Navigation";
import { Container } from 'reactstrap';
function Layout(props) {
    return (
        <div>
            <Navigation />
            <Container>
                {props.children}
            </Container>
        </div>
        )
}

export default Layout;