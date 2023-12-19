const axios = require('axios');
const jwt = require("jsonwebtoken");

const token = localStorage.getItem("access_token");
const SECRET_KEY = process.env.SECRET_KEY;

const role = jwt.verify(token, SECRET_KEY).role;

let forRole = [];
let forDepartment = [];
let forYear = [];
let forProgramme = [];


function logSelectedValues() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
        const type = checkbox.getAttribute('name').toLowerCase();
        if (type.includes('depttype')) {
            forDepartment.push(checkbox.value);
        } else if (type.includes('yeartypes')) {
            forYear.push(checkbox.value);
        } else if (type.includes('programmes')) {
            forProgramme.push(checkbox.value);
        } else if (type.includes('student')) {
            forRole.push(checkbox.value);
        } else if (type.includes('faculty')) {
            forRole.push(checkbox.value);
        } else if (type.includes('hod')) {
            forRole.push(checkbox.value);
        }
    });
    console.log(forRole, forDepartment, forYear, forProgramme);

    
}

document.getElementById('noticeForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    logSelectedValues();
    console.log("Submitted");
    const title = document.getElementById("noticeTitle").value;
    const description = document.getElementById("description").value;
    const noticeFile = document.getElementById("pdfFile").files[0];
    const date = document.getElementById("date").value;

    console.log(title, description, noticeFile, forRole, forDepartment, forYear, forProgramme, date);

    if (role === "admin") {
        await axios.post("http://localhost:3000/admin/add-notice", {
            title,
            description,
            noticeFile,
            forRole,
            forDepartment,
            forYear,
            forProgramme,
            date
        }).then((res) => {
            console.log("Notice added successfully", res);
            emptyArray();
        }).catch((err) => {
            console.log("Error in adding notice", err.message);
            emptyArray();
        });
    } else {
        await axios.post("http://localhost:3000/teacher/add-notice", {
            title,
            description,
            noticeFile,
            forRole,
            forDepartment,
            forYear,
            forProgramme,
            date
        }).then((res) => {
            console.log("Notice added successfully", res);
            emptyArray();
        }).catch((err) => {
            console.log("Error in adding notice", err.message);
            emptyArray();
        });
    }
});

const emptyArray = () => {
    forRole = [];
    forDepartment = [];
    forYear = [];
    forProgramme = [];
}

