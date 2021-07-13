var data = [{
        name: 'John',
        age: 24,
        systolic: 95,
        diastolic: 60,
        date: "01/25/2021"
    },
    {
        name: 'John',
        age: 24,
        systolic: 111,
        diastolic: 67,
        date: "01/25/2021"
    },
    {
        name: 'John',
        age: 24,
        systolic: 128,
        diastolic: 108,
        date: "01/25/2021"
    },
    {
        name: 'Sarah',
        age: 32,
        systolic: 187,
        diastolic: 58,
        date: "01/25/2021"
    },
    {
        name: 'Sarah',
        age: 32,
        systolic: 141,
        diastolic: 41,
        date: "01/25/2021"
    },
    {
        name: 'Sarah',
        age: 32,
        systolic: 129,
        diastolic: 62,
        date: "01/25/2021"
    },
    {
        name: 'Martin',
        age: 57,
        systolic: 123,
        diastolic: 90,
        date: "01/25/2021"
    },
    {
        name: 'Martin',
        age: 57,
        systolic: 135,
        diastolic: 60,
        date: "01/25/2021"
    },
    {
        name: 'Martin',
        age: 57,
        systolic: 90,
        diastolic: 60,
        date: "01/25/2021"
    }
];

// the default display for all users
var filteredList = data;

// build a dropdown for specific users
function buildDropDown() {
    let eventDD = document.getElementById('eventDropDown');


    // get distinct users from the data array
    curUser = JSON.parse(localStorage.getItem('userArray')) || data;
    let distinctUsers = [...new Set(curUser.map(data => data.name))];

    let linHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getUsers(this)" data-string="Everyone">Everyone</a>';
    let resultHTML = ""

    for (let i = 0; i < distinctUsers.length; i++) {
        resultHTML += `<a class='dropdown-item' onclick='getUsers(this)' data-string='${distinctUsers[i]}'>${distinctUsers[i]}</a>`;
    }
    resultHTML += linHTMLEnd;
    eventDD.innerHTML = resultHTML;
    displayStatsSystolic();
    displayData();
}

function getUsers(element) {
    let user = element.getAttribute('data-string')
    let curUser = JSON.parse(localStorage.getItem('userArray')) || data;
    filteredList = curUser;
    document.getElementById('statsHeader').innerHTML = `Stats for ${user}`
    if (user != 'Everyone') {
        filteredList = curUser.filter(function (item) {
            if (item.name == user) {
                return item;
            }
        })
    }
    displayStatsSystolic();
}

// display stats
function displayStatsSystolic() {
    let total = 0;
    let average = 0;
    let highest = 0;
    let lowest = -1;
    let currentValue = 0;

    for (let i = 0; i < filteredList.length; i++) {
        currentValue = filteredList[i].systolic;
        total += currentValue;

        if (highest < currentValue) {
            highest = currentValue;
        }

        if (lowest > currentValue || lowest < 0) {
            lowest = currentValue;
        }
    }

    average = total / filteredList.length;

    document.getElementById('total').innerHTML = total.toLocaleString();
    document.getElementById('average').innerHTML = average.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    document.getElementById('highest').innerHTML = highest.toLocaleString();
    document.getElementById('lowest').innerHTML = lowest.toLocaleString();
    document.getElementById('totalType').innerHTML = 'Total Systolic';
    document.getElementById('averageType').innerHTML = 'Average Systolic';
    document.getElementById('highestType').innerHTML = 'Highest Systolic';
    document.getElementById('lowestType').innerHTML = 'Lowest Systolic';


}

function displayStatsDiastolic() {
    let total = 0;
    let average = 0;
    let highest = 0;
    let lowest = -1;
    let currentValue = 0;

    for (let i = 0; i < filteredList.length; i++) {
        currentValue = filteredList[i].diastolic;
        total += currentValue;

        if (highest < currentValue) {
            highest = currentValue;
        }

        if (lowest > currentValue || lowest < 0) {
            lowest = currentValue;
        }
    }

    average = total / filteredList.length;

    document.getElementById('total').innerHTML = total.toLocaleString();
    document.getElementById('average').innerHTML = average.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    document.getElementById('highest').innerHTML = highest.toLocaleString();
    document.getElementById('lowest').innerHTML = lowest.toLocaleString();
    document.getElementById('totalType').innerHTML = 'Total Diastolic';
    document.getElementById('averageType').innerHTML = 'Average Diastolic';
    document.getElementById('highestType').innerHTML = 'Highest Diastolic';
    document.getElementById('lowestType').innerHTML = 'Lowest Diastolic';


}

function displayData() {
    const template = document.getElementById('userData-template');
    const userBody = document.getElementById('userBody');

    userBody.innerHTML = '';

    let curUser = JSON.parse(localStorage.getItem('userArray')) || [];
    if (curUser.length == 0) {
        curUser = data;
        localStorage.setItem('userArray', JSON.stringify(curUser))
    }

    for (let i = 0; i < curUser.length; i++) {
        const userRow = document.importNode(template.content, true)
        userCols = userRow.querySelectorAll("td")
        userRow.getElementById('user').textContent = curUser[i].name;
        userRow.getElementById('age').textContent = curUser[i].age;
        userRow.getElementById('systolic').textContent = curUser[i].systolic;
        userRow.getElementById('diastolic').textContent = curUser[i].diastolic;
        userRow.getElementById('readingDate').textContent = new Date(curUser[i].date).toLocaleDateString();

        if (curUser[i].systolic >= 180 || curUser[i].diastolic >= 120) {
            userRow.querySelector('tr').classList.add('crisis')
        } else if (curUser[i].systolic >= 140 || curUser[i].diastolic >= 90) {
            userRow.querySelector('tr').classList.add('stageTwo')
        } else if (curUser[i].systolic >= 130 || curUser[i].diastolic >= 80) {
            userRow.querySelector('tr').classList.add('stageOne')
        } else if (curUser[i].systolic >= 120 && curUser[i].diastolic < 80) {
            userRow.querySelector('tr').classList.add('elevated')
        } else {
            userRow.querySelector('tr').classList.add('normal')
        }

        userBody.appendChild(userRow)

    }

}

function saveUserData() {
    let curUser = JSON.parse(localStorage.getItem('userArray')) || data;
    let dismissBtn = document.getElementById('dismissBtn');


    let obj = {};
    obj['name'] = document.getElementById('newUserName').value;
    obj['age'] = parseInt(document.getElementById('newUserAge').value);
    obj['systolic'] = parseInt(document.getElementById('newUserSystolic').value);
    obj['diastolic'] = parseInt(document.getElementById('newUserDiastolic').value);
    obj['date'] = new Date(document.getElementById('newReadingDate').value).toLocaleDateString();

    if (obj['name'] != '' && obj['systolic'] != 0 && obj['diastolic'] != 0) {

        curUser.push(obj);
        localStorage.setItem('userArray', JSON.stringify(curUser));
        displayData();
        buildDropDown()
        dismissBtn.click();
    } else {
        dismissBtn.click();
    }
}


function resetData() {
    localStorage.clear();
    window.location.reload();
}