import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import {
  AuthorsCreate,
  AuthorsEdit,
  AuthorsList,
} from "./resources/Authors/Authors";
import { Book, People } from "@mui/icons-material";
import { BooksCreate, BooksEdit, BooksList } from "./resources/Books/Books";

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="authors"
      list={AuthorsList}
      create={AuthorsCreate}
      edit={AuthorsEdit}
      icon={People}
    />
    <Resource
      name="books"
      list={BooksList}
      create={BooksCreate}
      edit={BooksEdit}
      icon={Book}
    />
  </Admin>
);
