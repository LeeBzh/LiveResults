import { Category } from "./category.enum";
import { Runner } from "./runner";

export interface RaceModel {
  id: number;
  category: Category;
  runners: Runner[];
}
