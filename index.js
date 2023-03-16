
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
                school,
            ))
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

function renderHTMLFile() {
    fs.writeFileSync('./index.html', /*html*/`
        <ul>
            ${employees.map((employee) => {
                <li>
                    <div>
                    <h1>${employee.getName()}</h1>
                    <p>${employee.getEmail()}</p>
                    </div>
                </li>
             })
            } 
        </ul>
    `
)};

newEmployee();