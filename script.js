'use strict';
class Employee {
    constructor(firstName, lastName, idNumber, jobTitle, annualSalary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.jobTitle = jobTitle;
        this.annualSalary = parseInt(annualSalary);
    }
}

class Payroll {
    constructor() {
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    displayEmployees() {
        let table = $('#employeeTable');
        table.empty();
        table.append('<thead><tr><th>First Name</th><th>Last Name</th>' 
            + '<th>ID Number</th><th>Job Title</th><th>Annual Salary</th></thead>'
        );
        let tbody = $('<tbody id="tableBody"></tbody>');
        table.append(tbody);

        for (let em of this.employees) {
            tbody.append(
                `<tr>
                    <td>${em.firstName}</td>
                    <td>${em.lastName}</td>
                    <td>${em.idNumber}</td>
                    <td>${em.jobTitle}</td>
                    <td>${em.annualSalary}</td>
                </tr>`
            );
        }
    }
    totalPayroll() {
        let total = 0;
        for (let em of this.employees) {
            total += em.annualSalary;
        }
        return total;
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
    payroll.displayEmployees();
    console.log(payroll.totalPayroll());
}

function clearInputs() {
    $('#fnIn').val('');
    $('#lnIn').val('');
    $('#idIn').val('');
    $('#jobTitleIn').val('');
    $('#annSalaryIn').val('');    
}