const Employee = require('./lib/Employee.js');
const Engineer = require('./lib/Engineer.js');
const Manager = require('./lib/Manager.js');
const Intern = require('./lib/Intern.js');

const template = `
<!DOCTYPE html>
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

const card = `
<div class="manager-card">
    <div class="card-header">
        <h2 class="employee-name">Jim</h2>
        <div class="role flex">
            <icon></icon>
            <h3>Manager</h3>
        </div>
    </div>
    <div class="card-body">
        <ul class="card-list">
            <li class="card-item"></li>
            <li class="card-item"><a id="email" class="card-link" href="#"></a></li>
            <li class="card-item"><a id="github" class="card-link" href="#"></a></li>
            <li class="card-item"></li>
         </ul>
    </div>
</div>
`