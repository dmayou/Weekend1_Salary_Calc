'use strict';

// Class definitions
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
        this.total = 0;
    }
    addEmployee(employee) {
        this.employees.push(employee);
        this.total += employee.annualSalary;
    }
    displayEmployees() {
        let table = $('#employeeTable');
        table.empty();
        table.append('<thead><tr><th>First Name</th><th>Last Name</th>' 
            + '<th>ID Number</th><th>Job Title</th><th>Annual Salary</th></thead>'
        );
        let tbody = $('<tbody id="tableBody"></tbody>');
        table.append(tbody);

        if (this.employees.length > 0) {
            for (let em of this.employees) {
                let deleteBtn = 
                    $('<button/>')
                        .text('delete')
                        .addClass('btn btn-secondary btn-sm')
                        .on('click', deleteBtnClicked)
                        .data( {empId: em.idNumber }); // add 'id number' field to button
                tbody.append(
                    $('<tr></tr>').append(
                        `<td>${em.firstName}</td>
                        <td>${em.lastName}</td>
                        <td>${em.idNumber}</td>
                        <td>${em.jobTitle}</td>
                        <td>${new Intl.NumberFormat().format(em.annualSalary)}</td>`)
                        .append($('<td></td>').append(deleteBtn))
                );
            }
        } else {
            tbody.append('<tr><td>(no employees)</td></tr>');
        }
    }
    monthlyPayroll() {
        return Math.round(this.total / 12);
    }
    displayTotal() {
        let el =$('#totalPayroll');
        el.empty();
        const monthlyStr = 
            new Intl.NumberFormat(
                'en-IN', { minimumFractionDigits: 2 }).format(this.monthlyPayroll()
        );
        el.append(`<h4 class="rt-just">Total Monthly: $${monthlyStr}</h4>`);
        if (this.monthlyPayroll() <= 20000) {
            el.css('background-color', 'white');
        } else {
            el.css('background-color', 'red');
        }
    }
    deleteEmployee(id) {
        // finds index of first employee with matching id and removes array element
        for (let i in this.employees) {
            if (this.employees[i].idNumber === id){ // found employee to delete
                this.total -= this.employees[i].annualSalary; // deduct salary
                this.employees.splice(i, 1);
                break;
            }
        }
    }
}

// global variables
let payroll = new Payroll();


$(document).ready( function() {
     $('#submitBtn').on('click', submitClicked);
     payroll.displayEmployees(); // initially will put up 'no employees' row
    } 
);

// functions
function submitClicked() {
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
    payroll.displayTotal();
}

function clearInputs() {
    $('#fnIn').val('');
    $('#lnIn').val('');
    $('#idIn').val('');
    $('#jobTitleIn').val('');
    $('#annSalaryIn').val('');  
}

function deleteBtnClicked() {
    payroll.deleteEmployee($(this).data().empId);
    payroll.displayEmployees();
    payroll.displayTotal();
}