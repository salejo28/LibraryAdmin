import { Pagination as PaginationAdmin } from "react-admin";

export const Pagination = () => (
  <PaginationAdmin rowsPerPageOptions={[10, 25, 50]} />
);
