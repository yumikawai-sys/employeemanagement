function viewAllData()
{
    fetch('http://localhost:9999/employee')
    .then(res=>res.json())
    .then(json=>{
        const employeeData = document.querySelector('#employeeList');
        
        for(const row of json)
        {
            employeeData.innerHTML += `
                <br>
                <br>
                <div class="renderEmployee">
                <h3>Employee ID ${row.EmployeeId}: ${row.LastName}, ${row.FirstName}</h3>
                <div class="allemployee">
                    <img src="images/person.png" id="personimg">
                    <table class="tableEmployee">
                        <tr><td class ="tdTitle"><b>Last Name</b><td class ="tdValue"> ${row.LastName}</td></tr>
                        <tr><td class ="tdTitle"><b>First Name</b></td><td class ="tdValue">${row.FirstName}</td></tr>
                        <tr><td class ="tdTitle"><b>Title</b></td><td class ="tdValue">${row.Title}</td></tr>
                        <tr><td class ="tdTitle"><b>Report To</b></td><td class ="tdValue">${row.ReportsTo}</td></tr>
                        <tr><td class ="tdTitle"><b>Birthday</b></td><td class ="tdValue">${row.BirthDate}</td></tr>
                        <tr><td class ="tdTitle"><b>Hired from</b></td><td class ="tdValue">${row.HireDate}</td></tr>
                        <tr><td class ="tdTitle"><b>Address</b></td><td class ="tdValue">${row.Address}</td></tr>
                        <tr><td class ="tdTitle"><b>City</b></td><td class ="tdValue">${row.City}</td></tr>
                        <tr><td class ="tdTitle"><b>State</b></td><td class ="tdValue">${row.State}</td></tr>
                        <tr><td class ="tdTitle"><b>Country</b></td><td class ="tdValue">${row.Country}</td></tr>
                        <tr><td class ="tdTitle"><b>Postal Code</b></td><td class ="tdValue">${row.PostalCode}</td></tr>
                        <tr><td class ="tdTitle"><b>Phone Number</b></td><td class ="tdValue">${row.Phone}</td></tr>
                        <tr><td class ="tdTitle"><b>Fax Number</b></td><td class ="tdValue">${row.Fax}</td></tr>
                        <tr><td class ="tdTitle"><b>Email</b></td><td class ="tdValue">${row.Email}</td></tr>
                        <tr class="hiddenid"><td class ="tdTitle"><b>ID</b></td><td class ="tdValue">${row.EmployeeId}</td></tr>
                    </table>
                    <div class="buttons">
                        <button class='update_btn' value=${row.EmployeeId}>Update</button>
                        <button class='delete_btn' value=${row.EmployeeId}>Delete</button>
                    </div>
                </div>
                </div>
            `;
        }
        //Double-click table, Update & Delete button
        addEventListeners();
    });
}

viewAllData();

function addEventListeners()
{
    //Double-click the table 
    const cells = document.querySelectorAll('td');
    for(const cell of cells)
    {
        cell.addEventListener('dblclick',(e)=>e.target.setAttribute('contenteditable',true));
    }
    
    //Update button is clicked
    const updateBtns = document.querySelectorAll('.update_btn');
    
    for(const btn of updateBtns)
    {
        btn.addEventListener('click',(e)=>updateEmployee(e.target));
    }

    //Delete button is clicked
    const deleteBtns = document.querySelectorAll('.delete_btn');
    for(const btn of deleteBtns)
    {
        btn.addEventListener('click',(e)=>deleteEmployee(e.target));
    }
}

//Update method
function updateEmployee(e)
{
    const dataLast = e.parentElement.parentElement.children[1].children[0].children[0].children[1].innerText; //LastName
    const dataFirst = e.parentElement.parentElement.children[1].children[0].children[1].children[1].innerText; //FirstName
    const dataTitle = e.parentElement.parentElement.children[1].children[0].children[2].children[1].innerText; //Title
    const dataReportsTo = e.parentElement.parentElement.children[1].children[0].children[3].children[1].innerText; //Report
    const dataBirthDate = e.parentElement.parentElement.children[1].children[0].children[4].children[1].innerText; //Birth
    const dataHireDate = e.parentElement.parentElement.children[1].children[0].children[5].children[1].innerText; //Hire
    const dataAddress = e.parentElement.parentElement.children[1].children[0].children[6].children[1].innerText; //Address
    const dataCity = e.parentElement.parentElement.children[1].children[0].children[7].children[1].innerText; //City
    const dataState = e.parentElement.parentElement.children[1].children[0].children[8].children[1].innerText; //State
    const dataCountry = e.parentElement.parentElement.children[1].children[0].children[9].children[1].innerText; //Country
    const dataPostalCode = e.parentElement.parentElement.children[1].children[0].children[10].children[1].innerText; //Postal
    const dataPhone = e.parentElement.parentElement.children[1].children[0].children[11].children[1].innerText; //Phone
    const dataFax = e.parentElement.parentElement.children[1].children[0].children[12].children[1].innerText; //Fax
    const dataEmail = e.parentElement.parentElement.children[1].children[0].children[13].children[1].innerText; //Email
    
    const dataID = e.parentElement.parentElement.children[1].children[0].children[14].children[1].innerText; //Id
    
    let jsonData = {};
    jsonData['LastName'] = dataLast;
    jsonData['FirstName'] = dataFirst;
    jsonData['Title'] = dataTitle;
    jsonData['ReportsTo'] = dataReportsTo;
    jsonData['BirthDate'] = dataBirthDate;
    jsonData['HireDate'] = dataHireDate;
    jsonData['Address'] = dataAddress;
    jsonData['City'] = dataCity;
    jsonData['State'] = dataState;
    jsonData['Country'] = dataCountry;
    jsonData['PostalCode'] = dataPostalCode;
    jsonData['Phone'] = dataPhone;
    jsonData['Fax'] = dataFax;
    jsonData['Email'] = dataEmail;

    jsonData = JSON.stringify(jsonData);
    fetch('http://localhost:9999/employee/'+ dataID,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:'put',
        body:jsonData
    })
}

//Delete method
function deleteEmployee(e)
{
    fetch('http://localhost:9999/employee/'+ e.value,{method:'delete'});
}

