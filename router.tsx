import { createBrowserRouter } from "react-router-dom";
import StudentDashBoardPage from "@/pages/StudentDashBoardPage";
import FormPage from "@/pages/FormPage";
import StoryPage from "@/pages/StoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <StudentDashBoardPage />,
  },
  {
    path: "/create-story",
    element: <FormPage />,
  },
  {
    path: "/story",
    element: <StoryPage />,
  },
]);
