import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { db } from "../../Database";

interface Assignment {
  _id: string;
  title: string;
  description: string;
  course: string;
  points?: number;
  due_date?: string;
  available_date?: string;
  until_date?: string;
  editing?: boolean;
}

const initialState: { assignments: Assignment[] } = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      // const newAssignment: any = {
      //   _id: new Date().getTime().toString(),
      //   title: assignment.title,
      //   description: assignment.description,
      //   points: assignment.points,
      //   dueDate: assignment.dueDate,
      //   availableFrom: assignment.availableFrom,
      //   availableUntil: assignment.availableUntil,
      //   course: assignment.course,
      // };
      state.assignments.push(action.payload);
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
  },
});
export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignments,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
