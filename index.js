var mysql = require("mysql");
var inquirer = require("inquirer");
var dotenv = require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect(function (err) {
    if (err) throw err;
    promptUser();
});

function promptUser() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View Departments",
                "View Roles",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Remove Employee",
                "Remove Role",
                "Remove Department",
                "Update Employee Role",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    viewEmployees();
                    break;

                case "View All Employees By Department":
                    viewEmployeesByDep();
                    break;

                case "View Departments":
                    viewDepartments();
                    break;

                case "View Roles":
                    viewRoles();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Remove Role":
                    removeRole();
                    break;

                case "Remove Department":
                    removeDepartment();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function viewEmployees() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department ";
    query += "FROM employee LEFT JOIN role ON employee.role_id = role.id ";
    query += "LEFT JOIN department ON role.department_id = department.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        { console.table(res) };
        promptUser();
    });
}

function viewEmployeesByDep() {
    inquirer
        .prompt(
            {
                type: "list",
                name: "depChoice",
                message: "Please select department.",
                choices: ["Sales", "Marketing", "Customer Service", "Human Resources", "Information Technology"]
            }
        ).then(function (answer) {
            if (answer.depChoice === "Sales") {
                var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department ";
                query += "FROM employee LEFT JOIN role ON employee.role_id = role.id ";
                query += "LEFT JOIN department ON role.department_id = department.id WHERE department.id = 1 ";
                connection.query(query, function (err, res) {
                    if (err) throw err;
                    { console.table(res) };
                    promptUser();
                });
            }
            else if (answer.depChoice === "Marketing") {
                var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department ";
                query += "FROM employee LEFT JOIN role ON employee.role_id = role.id ";
                query += "LEFT JOIN department ON role.department_id = department.id WHERE department.id = 2";
                connection.query(query, function (err, res) {
                    if (err) throw err;
                    { console.table(res) };
                    promptUser();
                });
            }
            else if (answer.depChoice === "Customer Service") {
                var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department ";
                query += "FROM employee LEFT JOIN role ON employee.role_id = role.id ";
                query += "LEFT JOIN department ON role.department_id = department.id WHERE department.id = 3";
                connection.query(query, function (err, res) {
                    if (err) throw err;
                    { console.table(res) };
                    promptUser();
                });
            }
            else if (answer.depChoice === "Human Resources") {
                var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department ";
                query += "FROM employee LEFT JOIN role ON employee.role_id = role.id ";
                query += "LEFT JOIN department ON role.department_id = department.id WHERE department.id = 4";
                connection.query(query, function (err, res) {
                    if (err) throw err;
                    { console.table(res) };
                    promptUser();
                });
            }
            else if (answer.depChoice === "Information Technology") {
                var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department ";
                query += "FROM employee LEFT JOIN role ON employee.role_id = role.id ";
                query += "LEFT JOIN department ON role.department_id = department.id WHERE department.id = 5";
                connection.query(query, function (err, res) {
                    if (err) throw err;
                    { console.table(res) };
                    promptUser();
                });
            }
        })
}

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        { console.table(res) };
        promptUser();
    });
}

function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        { console.table(res) };
        promptUser();
    });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
            },
            {
                type: "list",
                name: "employeeRole",
                message: "What is the employee's role?",
                choices: ["Sales Lead", "Marketing Analyst", "Customer Service Representative", "Director of Human Resources", "Director of Information Technology"]
            }
        ]).then(function (answer) {
            if (answer.employeeRole === "Sales Lead")
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: 1
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your employee was created successfully!");
                        promptUser();
                    }
                );
            else if (answer.employeeRole === "Marketing Analyst")
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: 2
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your employee was created successfully!");
                        promptUser();
                    }
                );
            else if (answer.employeeRole === "Customer Service Representative")
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: 3
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your employee was created successfully!");
                        promptUser();
                    }
                );
            else if (answer.employeeRole === "Director of Human Resources")
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: 4
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your employee was created successfully!");
                        promptUser();
                    }
                );
            else if (answer.employeeRole === "Director of Information Technology")
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: 5
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your employee was created successfully!");
                        promptUser();
                    }
                );
        });

}

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "Please enter the new role title.",
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the new role salary?",
            },
            {
                type: "list",
                name: "roleDepartment",
                message: "Please enter the department for the new role.",
                choices: ["Sales", "Marketing", "Customer Service", "Human Resources", "Information Technology"]
            }
        ])
        .then(function (answer) {
            if (answer.roleDepartment === "Sales")
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.roleTitle,
                        salary: answer.roleSalary,
                        department_id: 1
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your role was created successfully!");
                        promptUser();
                    }
                );
            else if (answer.roleDepartment === "Marketing")
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.roleTitle,
                        salary: answer.roleSalary,
                        department_id: 2
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your role was created successfully!");
                        promptUser();
                    }
                );
            else if (answer.roleDepartment === "Customer Service")
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.roleTitle,
                        salary: answer.roleSalary,
                        department_id: 3
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your role was created successfully!");
                        promptUser();
                    }
                );
            else if (answer.roleDepartment === "Human Resources")
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.roleTitle,
                        salary: answer.roleSalary,
                        department_id: 4
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your role was created successfully!");
                        promptUser();
                    }
                );
            else if (answer.roleDepartment === "Information Technology")
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.roleTitle,
                        salary: answer.roleSalary,
                        department_id: 5
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your role was created successfully!");
                        promptUser();
                    }
                );
        });
}

function addDepartment() {
    inquirer
        .prompt(
            {
                type: "input",
                name: "newDepartmentName",
                message: "Please enter the name of the new department.",
            },
        )
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.newDepartmentName,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your new department was created successfully!");
                    promptUser();
                }
            );
        });
}

function removeEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstNameDeleteEmployee",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "lastNameDeleteEmployee",
                message: "What is the employee's last name?",
            },
        ])
        .then(function (answer) {
            connection.query(
                "DELETE FROM employee WHERE first_name = ? and last_name = ?", [answer.firstNameDeleteEmployee, answer.lastNameDeleteEmployee],
                function (err) {
                    if (err) throw err;
                    console.log("The employee was deleted successfully!");
                    promptUser();
                }
            );
        });
}

function removeRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "removeRole",
                message: "Which role would you like to remove?",
            },
        ])
        .then(function (answer) {
            connection.query(
                "DELETE FROM role WHERE title = ?", [answer.removeRole],
                function (err) {
                    if (err) throw err;
                    console.log("The role was deleted successfully!");
                    promptUser();
                }
            );
        });
}

function removeDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "removeDepartment",
                message: "Which department would you like to remove?",
            },
        ])
        .then(function (answer) {
            connection.query(
                "DELETE FROM department WHERE name = ?", [answer.removeDepartment],
                function (err) {
                    if (err) throw err;
                    console.log("The department was deleted successfully!");
                    promptUser();
                }
            );
        });
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstNameUpdateRole",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "lastNameUpdateRole",
                message: "What is the employee's last name?",
            },
            {
                type: "list",
                name: "employeeRoleUpdate",
                message: "What is the employee's new role?",
                choices: ["Sales Lead", "Marketing Analyst", "Customer Service Representative", "Director of Human Resources", "Director of Information Technology"]
            }
        ])
        .then(function (answer) {
            if (answer.employeeRoleUpdate === "Sales Lead")
                connection.query(
                    "UPDATE employee SET role_id = 1 WHERE first_name = ? and last_name = ?", [answer.firstNameUpdateRole, answer.lastNameUpdateRole],
                    function (err) {
                        if (err) throw err;
                        console.log("The employee was updated successfully!");
                        promptUser();
                    }
                );
            else if (answer.employeeRoleUpdate === "Marketing Analyst")
                connection.query(
                    "UPDATE employee SET role_id = 2 WHERE first_name = ? and last_name = ?", [answer.firstNameUpdateRole, answer.lastNameUpdateRole],
                    function (err) {
                        if (err) throw err;
                        console.log("The employee was updated successfully!");
                        promptUser();
                    }
                );
            else if (answer.employeeRoleUpdate === "Customer Service Representative")
                connection.query(
                    "UPDATE employee SET role_id = 3 WHERE first_name = ? and last_name = ?", [answer.firstNameUpdateRole, answer.lastNameUpdateRole],
                    function (err) {
                        if (err) throw err;
                        console.log("The employee was updated successfully!");
                        promptUser();
                    }
                );
            else if (answer.employeeRoleUpdate === "Director of Human Resources")
                connection.query(
                    "UPDATE employee SET role_id = 4 WHERE first_name = ? and last_name = ?", [answer.firstNameUpdateRole, answer.lastNameUpdateRole],
                    function (err) {
                        if (err) throw err;
                        console.log("The employee was updated successfully!");
                        promptUser();
                    }
                );
            else if (answer.employeeRoleUpdate === "Director of Information Technology")
                connection.query(
                    "UPDATE employee SET role_id = 5 WHERE first_name = ? and last_name = ?", [answer.firstNameUpdateRole, answer.lastNameUpdateRole],
                    function (err) {
                        if (err) throw err;
                        console.log("The employee was updated successfully!");
                        promptUser();
                    }
                );
        });
}