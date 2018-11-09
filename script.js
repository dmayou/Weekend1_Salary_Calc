'use strict';
class Employee {
    constructor(firstName, lastName, idNumber, jobTitle, annualSalary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.jobTitle = jobTitle;
        this.annualSalary = annualSalary;
    }
}

class Payroll {
    constructor() {
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    display() {
        let table = $('#employeeTable');
        table.empty();
        table.append('<thead><tr><th>First Name</th><th>Last Name</th>' 
            + '<th>ID Number</th><th>Job Title</th><th>Annual Salary</th></thead>'
        );
        let tbody = $('<tbody id="tableBody"></tbody>');
        table.append(tbody);

        // $('#employeeDiv').append(table);
        for (let employee of this.employees) {
            tbody.append(
                `<tr>
                    <td>${employee.firstName}</td>
                    <td>${employee.lastName}</td>
                    <td>${employee.idNumber}</td>
                    <td>${employee.jobTitle}</td>
                    <td>${employee.annualSalary}</td>
                </tr>`
            );
        }
    }
}

$(document).ready( onReady );
let payroll = new Payroll();

function onReady() {
    $('#submitBtn').on('click', submitClicked);
}

function submitClicked() {
    console.log('in submitClicked');
    payroll.addEmployee(new Employee (
            $('#fnIn').val(),
            $('#lnIn').val(),
            $('#idIn').val(),
            $('#jobTitleIn').val(),
            $('#annSalaryIn').val()
        )
    );
    clearInputs();
    payroll.display();
}

function clearInputs() {
    $('#fnIn').val('');
    $('#lnIn').val('');
    $('#idIn').val('');
    $('#jobTitleIn').val('');
    $('#annSalaryIn').val('');    
}