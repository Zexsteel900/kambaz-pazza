import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { HiOutlinePlus } from "react-icons/hi2";
import { FaTrashCan } from "react-icons/fa6";
import { TiPencil } from "react-icons/ti";
import { useSelector } from "react-redux";

export default function ModuleControlBtns({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (id: string) => void;
  editModule: (moduleId: string) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  return (
    <div className="float-end">
      {isFaculty && (
        <>
          <TiPencil
            className="text-primary me-2 fs-5"
            onClick={() => editModule(moduleId)}
            style={{ cursor: "pointer" }}
          />
          <FaTrashCan
            className="text-danger me-2 mb-1 fs-6"
            onClick={() => deleteModule(moduleId)}
            style={{ cursor: "pointer" }}
          />
        </>
      )}
      <GreenCheckmark />
      <HiOutlinePlus className="fs-5" />
      <IoEllipsisVertical className="fs-6" />
    </div>
  );
}
