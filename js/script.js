window.users = new Map();
window.userRegex = new RegExp(/^[a-zA-Z][a-zA-Z\s\.\d]{1,40}$/);
//RFC 2822 standard email validation
window.emailRegex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);




function addUserClick() {
    var user = getUserData();

    if (user === false) {
        return;
    }


    var validEmail = checkUserEmail(user[0]);
    var validName = checkUserName(user[1]);


    if (!validEmail && !validName) {
        printMessage('error-email-label', 'red', 'Invalid user email');
        printMessage('error-name-label', 'red', 'Invalid user name');
        return;
    }

    if (!validEmail) {
        printMessage('error-email-label', 'red', 'Invalid user email');
        return;
    }

    if (!validName) {
        printMessage('error-name-label', 'red', 'Invalid user name');
        return;
    }

    if (window.users.has(user[0])) {
        printMessage('error-email-label', 'red', 'This user is already exist');
        return;
    }

    if (user !== false && !window.users.has(user[0])) {
        window.users.set(user[0], [user[1], user[2]]);
        printMap();
    }
}

function ClearFieldsCLick() {
    clearAllFields();
}


function onChangeNameFunction() {
    var userName = document.getElementById('Name').value;
    if (userName === "") {
        printMessage('error-name-label', 'red', 'Enter your name');
    } else if (!checkUserName(userName)) {
        printMessage('error-name-label', 'red', 'Invalid user name');
    } else {
        printMessage('error-name-label', 'green', 'Valid user name');
    }
}

function onChangeEmailFunction() {
    var userEmail = document.getElementById('Email').value;
    if (userEmail === "") {
        printMessage('error-email-label', 'red', 'Enter your email');
    } else if (!checkUserEmail(userEmail)) {
        printMessage('error-email-label', 'red', 'Invalid user email');
    } else {
        printMessage('error-email-label', 'green', 'Valid user email');
    }
}

function printMap() {
    var innerHTML =
        "<table>\n\
                <caption>Membrs</caption>\n\
                <thead>\n\
                    <tr>\n\
                        <td class='main-content-table-td-id'>#</td>\n\
                        <td class='caption-text'>Name</td>\n\
                        <td class='caption-text'>Email</td>\n\
                        <td class='caption-text'>Registration Date</td>\n\
                    </tr>\n\
                </thead>\n\
            <tbody>";

    var index = 1;
    for (var [key, values] of window.users) {
        innerHTML += "<tr>";
        innerHTML = innerHTML + "<th class='main-content-table-td-id'>" + index + "</th>";
        innerHTML = innerHTML + "<th>" + values[0] + "</th>";
        innerHTML = innerHTML + "<th>" + key + "</th>";
        innerHTML = innerHTML + "<th>" + values[1] + "</th>";
        index++;
        innerHTML += "</tr>";
    }
    innerHTML += "</tbody></table>";
    document.getElementById("main-content-table").innerHTML = innerHTML;
    clearAllFields();
}

function getUserData() {
    var email = document.getElementById('Email').value;
    var name = document.getElementById('Name').value;
    var date = getDateNow();
    if (name === "") {
        printMessage('error-name-label', 'red', 'Enter your name');
    }
    if (email === "") {
        printMessage('error-email-label', 'red', 'Enter your email');
    }
    if (email !== "" && name !== "") {
        return [email, name, date];
    }
    return false;
}


function getDateNow() {
    var date = new Date(Date.now());

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var stringDate = "";
    stringDate = day < 10 ? stringDate + "0" + day + "." : stringDate + day + ".";
    stringDate = month < 10 ? stringDate + "0" + month + "." : stringDate + month + ".";
    stringDate += year;

    return stringDate;
}

function clearAllFields() {
    document.getElementById('Email').value = "";
    document.getElementById('Name').value = "";
    document.getElementById('error-email-label').innerHTML = "";
    document.getElementById('error-name-label').innerHTML = "";
}


function checkUserName(userName) {
    return window.userRegex.test(userName);
}

function checkUserEmail(email) {
    return window.emailRegex.test(email);
}

function printMessage(elementid, elementStyleColor, message) {
    document.getElementById(elementid).style.color = elementStyleColor;
    document.getElementById(elementid).innerHTML = message;
}