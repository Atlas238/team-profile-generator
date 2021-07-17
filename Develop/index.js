const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee.js');
const Engineer = require('./lib/Engineer.js');
const Manager = require('./lib/Manager.js');
const Intern = require('./lib/Intern.js');

// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated

const teamManagerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: `Enter your Team Manager's Name: `
    },
    {
        type: 'input',
        name: 'id',
        message: `Enter your Team Manager's ID: `
    },
    {
        type: 'input',
        name: 'email',
        message: `Enter your Team Manager's Email: `
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: `Enter your Team Manager's Office Number: `
    }
]

const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: `Enter your new Employee's Name: `
    },
    {
        type: 'input',
        name: 'id',
        message: `Enter your new Employee's ID: `
    },
    {
        type: 'input',
        name: 'email',
        message: `Enter your new Employee's Email: `
    }
]
const employArr = [];

let exit = false;

const registerManager = async () => {

    console.log("Welcome! Let's create your team page. Please start by entering your details.\n This program assumes you are the team manager and will asign this role to the person whose details you enter here.");

    const {name, id, email, officeNumber} = await inquirer.prompt(teamManagerQuestions);

    const manager = new Manager(name, id, email, officeNumber);

    employArr.push(manager);

    console.log(`Thanks ${manager.name}.`);

}

const newEngineer = async () => {

    console.log('Great! Please fill out the new employees details.');
    
    const { name, id, email }  = await inquirer.prompt(employeeQuestions);
    
    console.log('The Engineer role requires registration of a github username...');
    
    const { github } = await inquirer
        .prompt({
            type: 'input',
            name: 'github',
            message: 'Username: '
        });
    
    const employ = new Engineer(name, id, email, github);
    
    employArr.push(employ);

    console.log("Thanks! Your new engineer has been added.");

}

const newIntern = async () => {

    console.log('Great! Please fill out the new employees details.');
    
    const { name, id, email }  = await inquirer.prompt(employeeQuestions);

    console.log('The Intern role requires registration of a School...');

    const { school } = await inquirer.prompt({
        type: 'input',
        name: 'school',
        message: 'School: '
    })

    const employ = new Intern(name, id, email, school);

    employArr.push(employ);

    console.log("Thanks! Your new Intern has been added.");
}

const generateHTML = async () => {
    
    let template = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./reset.css">
    <link rel="stylesheet" href="./style.css">
    <title>Team Portfolio</title>
    </head>
    <body>
    
    <header>
    <h1>My Team</h1>
    </header>
    
    <main class='flex flex-around'>
    
    </main>
    
    </body>
    </html>
    `
    
    function addCard(str, index, stringToAdd){
        return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
    }
    
    const cardStack = [];
    
    employArr.forEach(employeeDetails => {
        
        switch (employeeDetails.role){
            case 'Manager' : {

            let card = `
            <div class="card">
                <div class="card-header">
                    <h2 class="employee-name">${employeeDetails.name}</h2>
                    <div class="role flex">
                    <icon></icon>
                    <h3>${employeeDetails.role}</h3>
                    </div>
                </div>
                <div class="card-body">
                    <ul class="card-list">
                        <li class="card-item">ID: ${employeeDetails.id}</li>
                        <li class="card-item">Email: <a class="card-link" href="mailto:${employeeDetails.email}">${employeeDetails.email}</a></li>
                        <li class="card-item">Office Number: ${employeeDetails.officeNumber}</li>
                    </ul>
                </div>
            </div>`
            
            cardStack.push(`${card}\n`);
            } break;
            
            case 'Engineer' : {

            let card = `
            <div class="card">
                <div class="card-header">
                    <h2 class="employee-name">${employeeDetails.name}</h2>
                    <div class="role flex">
                    <icon></icon>
                    <h3>${employeeDetails.role}</h3>
                    </div>
                </div>
                <div class="card-body">
                    <ul class="card-list">
                        <li class="card-item">ID: ${employeeDetails.id}</li>
                        <li class="card-item">Email: <a class="card-link" href="mailto:${employeeDetails.email}">${employeeDetails.email}</a></li>
                        <li class="card-item">Github: <a class="card-link" href="https://github.com/${employeeDetails.github}/">${employeeDetails.github}</a></li>
                    </ul>
                </div>
            </div>`
            
            cardStack.push(`${card}\n`);

            } break;

            case 'Intern' : {

            let card = `
            <div class="card">
                <div class="card-header">
                    <h2 class="employee-name">${employeeDetails.name}</h2>
                    <div class="role flex">
                    <icon></icon>
                    <h3>${employeeDetails.role}</h3>
                    </div>
                </div>
            <div class="card-body">
                <ul class="card-list">
                    <li class="card-item">ID: ${employeeDetails.id}</li>
                    <li class="card-item">Email: <a class="card-link" href="mailto:${employeeDetails.email}">${employeeDetails.email}</a></li>
                    <li class="card-item">School: ${employeeDetails.school}</li>
                </ul>
                </div>
            </div>`
                
            cardStack.push(`${card}\n`);
            } break;
        }
        
        console.log(cardStack);
    });
    
    //   console.log(addCard(template, 497, card));
    
    // Index of main div
        // console.log(template[497])
}

const main = async () => {
    
    // WHEN I start the application
    // THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
    await registerManager();
    
    // THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
    do {
        const { another } = await inquirer.prompt({
            type:'list',
            name:'another',
            message: 'Would you like to add another engineer, or intern? Or are you finished building your team?',
            choices: ['Engineer','Intern','All Done']
        })

        switch(another) {

            case 'Engineer': {
                await newEngineer();
            } break;

            case 'Intern': {
                await newIntern();
            } break;

            case 'All Done': {
                console.log('Sounds good! Generating your page now...');

                exit = true;

                await generateHTML();

            } break;
        }

    } while (exit !== true);
}

main();