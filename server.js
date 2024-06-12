const { Client } = require("pg");
const inquirer = require("inquirer");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "Tanaya04",
  database: "company_db",
});

client.connect((err) => {
  if (err) throw err;
  console.log("WELCOME TO ANERI CORPORATION EMPLOYEE TRACKER");
  startMenu();
});

const startMenu = () => {
  inquirer
    .prompt({
      message: "What would you like to do today?",
      name: "menu",
      type: "list",
      choices: [
        "View all departments",
        "View all jobs",
        "View all employees",
        "Add a department",
        "Add a job",
        "Add an employee",
        "Update employee job",
        "Exit",
      ],
    })
    .then((response) => {
      switch (response.menu) {
        case "View all departments":
          viewDepartment();
          break;
        case "View all jobs":
          viewJobs();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a job":
          addJob();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update employee job":
          updateEmployee();
          break;
        case "Exit":
          client.end();
          break;
        default:
          client.end();
      }
    });
};

const viewDepartment = () => {
  client.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    startMenu();
  });
};

const viewJobs = () => {
  client.query("SELECT * FROM job", (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    startMenu();
  });
};

const viewEmployees = () => {
  client.query(
    `SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id
     FROM ((department
     JOIN job ON department.id = job.department_id)
     JOIN employee ON job.id = employee.job_id);`,
    (err, res) => {
      if (err) throw err;
      console.table(res.rows);
      startMenu();
    }
  );
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the department name?",
      },
    ])
    .then((answer) => {
      client.query(
        "INSERT INTO department (dept_name) VALUES ($1)",
        [answer.department],
        (err, res) => {
          if (err) throw err;
          console.log("Department added!");
          startMenu();
        }
      );
    });
};

const addJob = () => {
  inquirer
    .prompt([
      {
        name: "jobTitle",
        type: "input",
        message: "What is the job title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this job?",
      },
      {
        name: "deptId",
        type: "input",
        message: "What is the department ID number?",
      },
    ])
    .then((answer) => {
      client.query(
        "INSERT INTO job (title, salary, department_id) VALUES ($1, $2, $3)",
        [answer.jobTitle, answer.salary, answer.deptId],
        (err, res) => {
          if (err) throw err;
          console.log("Job added!");
          startMenu();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "nameFirst",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "nameLast",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "jobId",
        type: "input",
        message: "What is the employee's job id?",
      },
      {
        name: "managerId",
        type: "input",
        message: "What is the manager Id?",
      },
    ])
    .then((answer) => {
      client.query(
        "INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES ($1, $2, $3, $4)",
        [answer.nameFirst, answer.nameLast, answer.jobId, answer.managerId],
        (err, res) => {
          if (err) throw err;
          console.log("Employee added!");
          startMenu();
        }
      );
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Enter employee id",
      },
      {
        name: "jobId",
        type: "input",
        message: "Enter new job id",
      },
    ])
    .then((answer) => {
      client.query(
        "UPDATE employee SET job_id=$1 WHERE id=$2",
        [answer.jobId, answer.id],
        (err, res) => {
          if (err) throw err;
          console.log("Employee updated!");
          startMenu();
        }
      );
    });
};
