function reporttoData()
{
    //fetch to get Reportto data
    fetch('http://localhost:9999/employee')
    .then(res=>res.json())
    .then(json=>{
        //This is to show employee names as ReportsTo
        const reportData = document.querySelector('#reportName');
        reportData.innerHTML += "<option></option>";
        for(const row of json)
        {
            reportData.innerHTML += `
            <option value=${row.EmployeeId}>${row.EmployeeId}: ${row.LastName} ${row.FirstName}</option>`;
        }
        reportData.innerHTML += `</select>`
    });
}

reporttoData();

document.querySelector('button').addEventListener('click',addNew);

function addNew()
{
    alert('Processing your request');
    const newData = new FormData(document.querySelector('form'));
    fetch('http://localhost:9999/employee',{method:'POST',body:newData});
}