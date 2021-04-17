import { object, string, number } from "yup";

const formSchema = object().shape({
  mazeAlgos: string()
    .required("Maze algorithm is required")
    .oneOf(["Dfs", "Kruskal", "Wilson"], "Invalid maze algorithm specified"),
  mazeWidth: number()
    .required("Maze width is required")
    .min(2, "Maze width must be atleast 2")
    .integer("Maze width needs to be an integer"),
  mazeHeight: number()
    .required("Maze height is required")
    .min(2, "Maze height must be atleast 2")
    .integer("Maze height needs to be an integer"),
  wallThickness: number()
    .required("Wall thickness is required")
    .min(1, "Wall thickness must be atleast 1px")
    .integer("Wall thickness must be an integer"),
  pathThickness: number()
    .required("Path thickness is required")
    .min(1, "Path thickness must be atleast 1px")
    .integer("Path thickness must be an integer"),
});

export default formSchema;
