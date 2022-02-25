export interface GetUsersDTO {
  page: number;
  per_page: number;
  total_pages: number;
  data: UserDTO[];
}

export interface UserDTO {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
