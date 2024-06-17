import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Departments
  const department1 = await prisma.department.create({
    data: {
      name: "Engineering",
      status: "Active",
      manager: "Alice Johnson",
    },
  });

  const department2 = await prisma.department.create({
    data: {
      name: "Marketing",
      status: "Active",
      manager: "Bob Smith",
    },
  });

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { emailAddress: "hradmin@test.com" },
    update: {},
    create: {
      firstName: "HR",
      lastName: "Admin",
      telephoneNumber: "555-0100",
      emailAddress: "hradmin@test.com",
      status: "Active",
      password: "TestPass1234", // In a real-world scenario, make sure to hash passwords
      role: "admin",
    },
  });

  // Create Managers
  const manager1 = await prisma.user.upsert({
    where: { emailAddress: "alice.johnson@example.com" },
    update: {},
    create: {
      firstName: "Alice",
      lastName: "Johnson",
      telephoneNumber: "555-0101",
      emailAddress: "alice.johnson@example.com",
      status: "Active",
      password: "Password123#", // In a real-world scenario, make sure to hash passwords
      role: "manager",
      departmentId: department1.id,
    },
  });

  const manager2 = await prisma.user.upsert({
    where: { emailAddress: "bob.smith@example.com" },
    update: {},
    create: {
      firstName: "Bob",
      lastName: "Smith",
      telephoneNumber: "555-0102",
      emailAddress: "bob.smith@example.com",
      status: "Active",
      password: "Password123#", // In a real-world scenario, make sure to hash passwords
      role: "manager",
      departmentId: department2.id,
    },
  });

  // Create Employees
  const employees = [
    {
      firstName: "Charlie",
      lastName: "Brown",
      telephoneNumber: "555-0103",
      emailAddress: "charlie.brown@example.com",
      status: "Active",
      password: "Password123#",
      role: "employee",
      employeeManager: "Alice Johnson",
      departmentId: department1.id,
    },
    {
      firstName: "David",
      lastName: "Wilson",
      telephoneNumber: "555-0104",
      emailAddress: "david.wilson@example.com",
      status: "Active",
      password: "Password123#",
      role: "employee",
      employeeManager: "Alice Johnson",
      departmentId: department1.id,
    },
    {
      firstName: "Eva",
      lastName: "Martinez",
      telephoneNumber: "555-0105",
      emailAddress: "eva.martinez@example.com",
      status: "Active",
      password: "Password123#",
      role: "employee",
      employeeManager: "Alice Johnson",
      departmentId: department1.id,
    },
    {
      firstName: "Frank",
      lastName: "Miller",
      telephoneNumber: "555-0106",
      emailAddress: "frank.miller@example.com",
      status: "Active",
      password: "Password123#",
      role: "employee",
      employeeManager: "Alice Johnson",
      departmentId: department1.id,
    },
    {
      firstName: "Grace",
      lastName: "Lee",
      telephoneNumber: "555-0107",
      emailAddress: "grace.lee@example.com",
      status: "Active",
      password: "Password123#",
      role: "employee",
      employeeManager: "Alice Johnson",
      departmentId: department1.id,
    },
    {
      firstName: "Hannah",
      lastName: "Taylor",
      telephoneNumber: "555-0108",
      emailAddress: "hannah.taylor@example.com",
      status: "Active",
      password: "Password123#",
      role: "employee",
      employeeManager: "Bob Smith",
      departmentId: department2.id,
    },
    {
      firstName: "Ian",
      lastName: "Anderson",
      telephoneNumber: "555-0109",
      emailAddress: "ian.anderson@example.com",
      status: "Active",
      password: "Password123#",
      role: "employee",
      employeeManager: "Bob Smith",
      departmentId: department2.id,
    },
    {
      firstName: "Julia",
      lastName: "Thomas",
      telephoneNumber: "555-0110",
      emailAddress: "julia.thomas@example.com",
      status: "Active",
      password: "Password123#",
      role: "employee",
      employeeManager: "Bob Smith",
      departmentId: department2.id,
    },
    {
      firstName: "Kevin",
      lastName: "Moore",
      telephoneNumber: "555-0111",
      emailAddress: "kevin.moore@example.com",
      status: "Active",
      password: "Password123#",
      role: "employee",
      employeeManager: "Bob Smith",
      departmentId: department2.id,
    },
    {
      firstName: "Laura",
      lastName: "Jackson",
      telephoneNumber: "555-0112",
      emailAddress: "laura.jackson@example.com",
      status: "Active",
      password: "Password123#",
      role: "employee",
      employeeManager: "Bob Smith",
      departmentId: department2.id,
    },
  ];

  for (const employee of employees) {
    await prisma.user.create({
      data: employee,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
