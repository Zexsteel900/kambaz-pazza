import {
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  InputGroup,
  Row,
} from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";

export default function BootstrapForms() {
  return (
    <div id="wd-css-styling-forms">
      <h2>Forms</h2>
      <Form>
        <FormGroup>
          <FormLabel htmlFor="email1">Email address</FormLabel>
          <FormControl
            type="email"
            id="email1"
            placeholder="name@example.com"
          />
          <br />
          <FormLabel htmlFor="textarea1">Example textarea</FormLabel>
          <FormControl as="textarea" id="textarea1" rows={3} />
        </FormGroup>
      </Form>
      <br />
      <div id="wd-css-styling-dropdowns">
        <h3>Dropdowns</h3>
        <Form>
          <FormGroup>
            <FormSelect>
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </FormSelect>
          </FormGroup>
        </Form>
      </div>
      <br />
      <div id="wd-css-styling-switches">
        <h3>Switches</h3>
        <Form>
          <FormGroup>
            <FormCheck
              type="switch"
              id="switch"
              label="Default switch checkbox input"
            />
            <FormCheck
              type="switch"
              id="switch2"
              checked
              label="Checked switch checkbox input"
            />
            <FormCheck
              type="switch"
              id="switch3"
              disabled
              label="Disabled switch checkbox input"
            />
            <FormCheck
              type="switch"
              id="switch4"
              checked
              disabled
              label="Disabled checked switch checkbox input"
            />
          </FormGroup>
        </Form>
      </div>
      <br />
      <div id="wd-css-styling-range-and-sliders">
        <h3>Range</h3>
        <Form>
          <FormGroup>
            <FormLabel htmlFor="Example range">Example range</FormLabel>
            <FormRange min="0" max="5" step="0.5" id="range1" />
          </FormGroup>
        </Form>
      </div>
      <br />
      <div id="wd-css-styling-addons">
        <h3>Addons</h3>
        <Form>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <InputGroup.Text>0.00</InputGroup.Text>
            <FormControl type="text" />
          </InputGroup>
        </Form>
        <br />
        <InputGroup>
          <FormControl type="text" />
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
        </InputGroup>
      </div>
      <br />
      <div id="wd-css-responsive-forms-1">
        <h3>Responsive Forms</h3>
        <Form>
          <FormGroup as={Row}>
            <FormLabel column sm="2" htmlFor="email1">
              Email
            </FormLabel>
            <Col sm="10">
              <FormControl
                type="text"
                id="email1"
                defaultValue="email@example.com"
              />
            </Col>
          </FormGroup>
          <br />
          <FormGroup as={Row}>
            <FormLabel column sm="2" htmlFor="password1">
              Password
            </FormLabel>
            <Col sm="10">
              <FormControl type="password" id="password1" />
            </Col>
          </FormGroup>
          <br />
          <FormGroup as={Row}>
            <FormLabel column sm="2" htmlFor="textarea2">
              Bio
            </FormLabel>
            <Col sm="10">
              <FormControl as="textarea" id="textarea2" rows={3} />
            </Col>
          </FormGroup>
        </Form>
      </div>
      <br />
      <div id="wd-css-responsive-forms-2">
        <h3>Responsive Forms</h3>
        <Form>
          <FormGroup as={Row}>
            <FormLabel column sm="2" htmlFor="r1">
              Email
            </FormLabel>
            <Col sm="10">
              <FormControl type="email" id="r1" />
            </Col>
          </FormGroup>
          <br />
          <FormGroup as={Row}>
            <FormLabel column sm="2" htmlFor="r2">
              Password
            </FormLabel>
            <Col sm="10">
              <FormControl type="password" id="r2" />
            </Col>
            <br />
          </FormGroup>
          <br />
          <fieldset>
            <FormGroup as={Row}>
              <Col as="legend" sm={2} className="radio-legend pt-0">
                Radios
              </Col>
              <Col sm={10}>
                <FormCheck
                  type="radio"
                  label="First radio"
                  name="gridRadios"
                  id="r3"
                  value="option1"
                  defaultChecked
                />
                <FormCheck
                  type="radio"
                  label="Second radio"
                  name="gridRadios"
                  id="r4"
                  value="option2"
                />
                <FormCheck
                  type="radio"
                  label="Third disabled radio"
                  name="gridRadios"
                  id="r5"
                  value="option3"
                  disabled
                />
              </Col>
            </FormGroup>
          </fieldset>
          <br />
          <FormGroup as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <FormCheck type="checkbox" id="r6" label="Example checkbox" />
            </Col>
          </FormGroup>
          <br />
          <Button variant="primary" type="submit">
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
}
