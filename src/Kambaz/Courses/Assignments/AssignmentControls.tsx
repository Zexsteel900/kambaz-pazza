import { Button, FormControl, InputGroup } from "react-bootstrap";
import { TfiPlus } from "react-icons/tfi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AssignmentControls() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  return (
    <div id="wd-assignment-controls" className="text-wrap">
      {isFaculty && (
        <>
          <Button
            variant="danger"
            size="sm"
            className="me-1 float-end"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
          >
            <TfiPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Assignment
          </Button>
          <Button variant="secondary" size="sm" className="me-1 float-end">
            <TfiPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Group
          </Button>
        </>
      )}

      <div className="d-flex justify-content-between aling-items-ceneter">
        <div className="d-flex justify-content-start align-items-center">
          <InputGroup
            size="sm"
            style={{ width: "300px" }}
            className="wd-search-bar-padding me-5"
          >
            <InputGroup.Text>
              <HiMagnifyingGlass />
            </InputGroup.Text>
            <FormControl type="text" placeholder="Search..." />
          </InputGroup>
        </div>
      </div>
    </div>
  );
}
