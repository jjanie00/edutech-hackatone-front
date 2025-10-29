import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import FormPage from "@/pages/FormPage";
import StoryPage from "@/pages/StoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
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
