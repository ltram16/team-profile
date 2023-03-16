
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const employees = [];

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
function newEmployee() {
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the employee?',
    },
    {
        type: 'list',
        name: 'position',
        message: 'What position is this employee?',
        choices: [
            'Manager',
            'Engineer',
            'Intern',
        ]
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the id of the employee?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the email of the employee?',
    },
]).then(({position, email, id, name}) => {
    switch (position) {
        case 'Manager':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'officeNumber',
                    message: 'What is the office number?'
                }
        ]).then(({ officeNumber }) => {
            employees.push(new Intern(
                name,
                id,
                email,
                officeNumber,
            ))
            another()
        });
            
        break;

        case 'Engineer':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'github',
                    message: 'What is the Github username?'
                }
        ]).then(({ github }) => {
            employees.push(new Engineer(
                name,
                id,
                email,
                github,
            ))
            another()
        });
        break;
        case 'Intern':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'school',
                    message: 'What is the name of the school?'
                }
        ]).then(({ school }) => {
            employees.push(new Intern(
                name,
                id,
                email,
                school,
            ))
            another()
        });
        break;
        default:
    }
})
};

function another() {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'more',
            message: 'Create another?'
        }
    ]).then(({ more }) => {
        if (more) newEmployee()
        else renderHTMLFile()
        // else console.log(employees)
    })
};

function managerCard(manager) {
    return `
    <div class="col-auto mb-3">
    <div class="card" style="width: 18rem;">
        <div class="card-header">
            <h5 class="card-title">${manager.name}</h5>
            <small class="text-muted">${manager.role}</small>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${manager.id}</li>
            <li class="list-group-item">${manager.email}</li>
            <li class="list-group-item">${manager.officeNumber}</li>
        </ul>
    </div>
    </div>
    `;
}

function engineerCard(engineer) {
    return `
    <div class="col-auto mb-3">
            <div class="card" style="width: 18rem;">
                <div class="card-header">
                    <h5 class="card-title">${engineer.name}</h5>
                    <small class="text-muted">${engineer.role}</small>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${engineer.id}</li>
                    <li class="list-group-item">${engineer.email}</li>
                    <li class="list-group-item">${engineer.github}</li>
                </ul>
            </div>
        </div>
    `;
}

function internCard(intern) {
    return `
    <div class="col-auto mb-3">
            <div class="card" style="width: 18rem;">
                <div class="card-header">
                    <h5 class="card-title">${intern.name}</h5>
                    <small class="text-muted">${intern.role}</small>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${intern.id}</li>
                    <li class="list-group-item">${intern.email}</li>
                    <li class="list-group-item">${intern.school}</li>
                </ul>
            </div>
        </div>
    `;
}

function renderHTMLFile() {
    fs.writeFileSync('./index.html', /*html*/`
    <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link ref="stylesheet" href="./style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <title>Team Profile Generator</title>
</head>
<div class="jumbotron">
    <h1 class="display-4">Meet the Team!</h1>
</div>
<div class="container">
<div class="row">
    <body>
        <div class="container-fluid mt-4">
            <div class="row justify-content-center">
            ${employees.map((employee) => {
                switch (employee.getRole()) {
                    case "Manager":
                        return managerCard(employee);
                    case "Engineer":
                        return engineerCard(employee);
                    case "Intern":
                        return internCard(employee);
             }
            }
    ).join("")} 
            </div>
        </div>
    </body>
</html>
    `
)};

newEmployee();