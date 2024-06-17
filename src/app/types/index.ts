export type Manager = {
  id: string;
  firstName: string;
  lastName: string;
  telephoneNumber: string;
  emailAddress: string;
  employeeManager?: string | null;
  status: string;
};

export type Department = {
  id?: string;
  name: string;
  status?: string;
  manager: string;
};

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  telephoneNumber: string;
  emailAddress: string;
  employeeManager: string | null;
  status: string;
  password?: string;
  role?: string;
  departmendts?: Department[];
};

export type EmployeeData = {
  id?: string;
  firstName: string;
  lastName: string;
  telephoneNumber: string;
  emailAddress: string;
  manager?: string;
  status?: string;
};
