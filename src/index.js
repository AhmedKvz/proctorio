const fetch = require("node-fetch");
const employees = require("./fake-server/employees.json");
const salaries = require("./fake-server/salaries.json");

const getEmplFrom = async () => {
  try {
    const data = JSON.parse(JSON.stringify(employees));
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getSalaries = async () => {
  //TODO returns salaries from json
  const data = JSON.parse(JSON.stringify(salaries));

  return data;
};
getSalaries();

const getEmployees = async (asc = true, nullAs = Number.MAX_VALUE) => {
  //TODO should be exposed function which returns array of employees => for example [{id:"id", "name":"test", "salary":""}]
  try {
    const employees = await getEmplFrom();
    const salaries = await getSalaries();

    const mappedEmloyees = employees.map((employee) => {
      const employeeSalary = salaries.find(
        (salary) => salary.employeeId === employee.id
      );
      return {
        id: employee.id,
        name: employee.name,
        salary: employeeSalary.salary,
      };
    });

    const sortedEmployees = mappedEmloyees.sort((a, b) => {
      let aValue = isNaN(a.salary) ? nullAs : a.salary;
      let bValue = isNaN(b.salary) ? nullAs : b.salary;

      aValue = isNaN(a.salary) ? 0 : aValue;
      bValue = isNaN(b.salary) ? 0 : bValue;
      const diff = aValue - bValue;

      if (asc) {
        return bValue - aValue;
      } else {
        return asc ? diff : -diff;
      }
    });
    return sortedEmployees;
  } catch (error) {
    console.log(error);
  }
};

getEmployees().then((data) => console.log(data));

module.exports = { getEmployees };
