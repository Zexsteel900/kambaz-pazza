import { Button } from "react-bootstrap";
import { BiImport } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { LiaFileImportSolid } from "react-icons/lia";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { RiBarChart2Fill } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaBell } from "react-icons/fa";

export default function CourseStatus() {
  return (
    <div
      id="wd-course-status"
      style={{ width: "250px" }}
      className="wd-padding-right"
    >
      <h4>Course Status</h4>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button
            variant="secondary"
            size="sm"
            className="w-100 align-items-center justify-content-center text-nowrap"
          >
            <MdDoNotDisturbAlt className="me-2 wd-f-small" />
            Unpublish
          </Button>
        </div>
        <div className="w-50 pe-1">
          <Button variant="success" size="sm" className="w-100 text-nowrap">
            <FaCheckCircle className="me-2 fs-6" />
            Publish
          </Button>
        </div>
      </div>
      <br />
      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <BiImport className="me-2 fs-6" />
        Import Existing Content
      </Button>
      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-6" />
        Import from Commons
      </Button>
      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <IoMdHome className="me-2 fs-6" />
        Choose Home Page
      </Button>
      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <RiBarChart2Fill className="me-2 fs-6" />
        View Course Screen
      </Button>
      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <TfiAnnouncement className="me-2 fs-6" />
        New Announcement
      </Button>
      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <RiBarChart2Fill className="me-2 fs-6" />
        New Analytics
      </Button>
      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <FaBell className="me-2 fs-6" />
        View Course Notifications
      </Button>
    </div>
  );
}
