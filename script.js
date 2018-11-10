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

        for (let em of this.employees) {
            let deleteBtnId = `id${em.idNumber}`;
            tbody.append(
                `<tr>
                    <td>${em.firstName}</td>
                    <td>${em.lastName}</td>
                    <td>${em.idNumber}</td>
                    <td>${em.jobTitle}</td>
                    <td>${em.annualSalary}</td>
                    <td><button id="${deleteBtnId}">delete</button></td>
                </tr>`
            );
            $(`#${deleteBtnId}`).on('click', deleteBtnClicked);
        }
    }
    totalPayroll() {
        // let total = 0;
        // for (let em of this.employees) {
        //     total += em.annualSalary;
        // }
        return this.total;
    }
    displayTotal() {
        let el =$('#totalPayroll');
        el.empty();
        const monthly = this.total / 12;
        el.append(`Total Monthly: $${monthly}`);
        if (monthly <= 20000) {
            el.css('background-color', 'white');
        } else {
            el.css('background-color', 'red');
        }
    }
    deleteEmployee(id) {
        console.log('in delete employee', this);
        // find index of employee to delete and remove that element of array
        for (let i in this.employees) {
            if (this.employees[i].idNumber === id){
                this.total -= this.employees[i].annualSalary;
                this.employees.splice(i, 1);
                break;
            }
        }
        console.log(this.employees);
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
    // idNumber of employee to delete begins on 3rd char of button id
    const empId = this.id.slice(2);
    payroll.deleteEmployee(empId);
    payroll.displayEmployees();
    payroll.displayTotal();
}