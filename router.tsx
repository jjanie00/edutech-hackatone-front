import { createBrowserRouter } from "react-router-dom";
import FormPage from "@/pages/FormPage";
import StoryPage from "@/pages/StoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FormPage />,
  },
  {
    path: "/story",
    element: <StoryPage />,
  },
]);
