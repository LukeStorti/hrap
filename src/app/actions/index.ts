"use server";

import { redirect } from "next/navigation";
import prisma from "../libs/prismadb";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Department, EmployeeData } from "../types";

export async function createEmployee(data: EmployeeData) {
  const { firstName, lastName, telephoneNumber, emailAddress, manager } = data;
  const status = "Active";
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      telephoneNumber,
      emailAddress,
      employeeManager: manager,
      status,
    },
  });

  return redirect("/dashboard/employees");
}

export async function editEmployeeStatus(id: string, status: string) {
  if (status === "Active") {
    const data = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        status: "Inactive",
      },
    });
  } else {
    const data = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        status: "Active",
      },
    });
  }
  revalidatePath("/dashboard/employees");
}

export async function editDepartmentStatus(id: string, status: string) {
  if (status === "Active") {
    const data = await prisma.department.update({
      where: {
        id: id,
      },
      data: {
        status: "Inactive",
      },
    });
  } else {
    const data = await prisma.department.update({
      where: {
        id: id,
      },
      data: {
        status: "Active",
      },
    });
  }
  revalidatePath("/dashboard/departments");
}

export async function updateEmployee(data: EmployeeData) {
  const { id, firstName, lastName, telephoneNumber, emailAddress, manager, status } = data;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      firstName,
      lastName,
      telephoneNumber,
      emailAddress,
      employeeManager: manager || null,
      status,
    },
  });

  return redirect("/dashboard/employees");
}

export async function createDepartment(data: Department) {
  const { name, manager } = data;

  const department = await prisma.department.create({
    data: {
      name: name,
      manager: manager,
    },
  });
  return redirect("/dashboard/departments");
}

export async function updateDepartment(data: Department) {
  const { id, name, manager, status } = data;
  const updatedDepartment = await prisma.department.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      manager: manager,
      status: status,
    },
  });

  return redirect("/dashboard/departments");
}

export async function getAllEmployees(status?: string, department?: string) {
  if (status === "Active" || status === "Inactive") {
    const data = await prisma.user.findMany({
      where: {
        status: status,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        telephoneNumber: true,
        emailAddress: true,
        employeeManager: true,
        status: true,
      },
    });

    return data;
  }

  const data = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      telephoneNumber: true,
      emailAddress: true,
      employeeManager: true,
      status: true,
    },
  });

  revalidatePath("/dashboard/employees");

  return data;
}

export async function getAllEmployeesByManager(managerName: string, status?: string) {
  if (status === "Active" || status === "Inactive") {
    const data = await prisma.user.findMany({
      where: {
        status: status,
        employeeManager: managerName,
      },
    });
    revalidatePath("/dashboard/employees");
    return data;
  }
  const data = await prisma.user.findMany({
    where: {
      employeeManager: managerName,
    },
  });
  return data;
}

export async function getEmployee(id: string) {
  const data = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      telephoneNumber: true,
      emailAddress: true,
      employeeManager: true,
      status: true,
    },
  });
  return data;
}

export async function getDepartment(id: string) {
  const data = await prisma.department.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      status: true,
      manager: true,
    },
  });
  return data;
}

export async function getManagers() {
  const data = await prisma.user.findMany({
    where: {
      role: "manager",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      telephoneNumber: true,
      emailAddress: true,
      employeeManager: true,
      status: true,
    },
  });
  return data;
}

export async function getDepartments(status?: string) {
  if (status === "Active" || status === "Inactive") {
    const data = await prisma.department.findMany({
      where: {
        status: status,
      },
      select: {
        id: true,
        name: true,
        status: true,
        manager: true,
        employees: true,
      },
    });
    revalidatePath("/dashboard/departments");
    return data;
  }
  const data = await prisma.department.findMany({
    select: {
      id: true,
      name: true,
      status: true,
      manager: true,
      employees: true,
    },
  });
  return data;
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;

  if (email) {
    const data = await prisma.user.findFirst({
      where: {
        emailAddress: email,
      },
      select: {
        id: true,
        role: true,
        firstName: true,
        lastName: true,
      },
    });

    return data;
  }
}
