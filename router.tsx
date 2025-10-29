import { createBrowserRouter } from "react-router-dom";
import StudentDashBoardPage from "@/pages/StudentDashBoardPage";
import FormPage from "@/pages/FormPage";
import StoryPage from "@/pages/StoryPage";
import QuizPage from "@/pages/QuizPage";

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
  {
    path: "/quiz",
    element: <QuizPage />,
  },
]);
