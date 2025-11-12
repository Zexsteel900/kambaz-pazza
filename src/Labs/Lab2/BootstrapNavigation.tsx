import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Nav,
} from "react-bootstrap";

export default function BootstrapNavigation() {
  return (
    <div id="wd-css-navigating-with-tabs">
      <h2>Tabs</h2>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link href="#/Labs/Lab2/Active" active>
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/Labs/Lab2/Link1">Link 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/Labs/Lab2/Link2">Link 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/Labs/Lab2/Disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div id="wd-css-navigating-with-cards" className="mb-3">
        <h2>Cards</h2>
        <Card style={{ width: "18rem" }}>
          <CardImg variant="top" src="images/stacked.jpg" />
          <CardBody>
            <CardTitle>Stacking Starship</CardTitle>
            <CardText>
              Stacking the most powerful rocket in history. Mars or Bust!
            </CardText>
            <Button variant="primary" href="#">
              Boldly Go
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
