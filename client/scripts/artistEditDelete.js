//View all data
function viewAllData()
{
    fetch('http://localhost:9999/Artist')
    .then(res=>res.json())
    .then(json=>{
        const artistData = document.querySelector('#artistList');
        for(const row of json)
        {
            artistData.innerHTML += `
                <br>
                <br>
                <div class="renderArtist">
                    <div class="allartist">
                        <img src="images/artisticon.png" id="artisticonimg">
                        <table class="tableArtist">
                            <tr><td class ="tdTitle"><b>Artist ID</b><td class ="tdValue"> ${row.ArtistId}</td></tr>
                            <tr><td class ="tdTitle"><b>Artist Name</b></td><td class ="tdName">${row.Name}</td></tr>
                        </table>
                        <div class="buttons">
                            <button class='update_btn' value=${row.ArtistId}>Update</button>
                            <button class='delete_btn' value=${row.ArtistId}>Delete</button>
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
    //Double-click the table (Artist Name only, not Artist ID)
    const cells = document.querySelectorAll('.tdName');
    for(const cell of cells)
    {
        cell.addEventListener('dblclick',(e)=>e.target.setAttribute('contenteditable',true));
    }
    
    //Update button is clicked
    const updateBtns = document.querySelectorAll('.update_btn');
    for(const btn of updateBtns)
    {
        btn.addEventListener('click',(e)=>updateArtist(e.target));
    }

    //Delete button is clicked
    const deleteBtns = document.querySelectorAll('.delete_btn');
    for(const btn of deleteBtns)
    {
        btn.addEventListener('click',(e)=>deleteArtist(e.target));
    }
}

//Update method
function updateArtist(e)
{
    const dataName = e.parentElement.parentElement.children[1].children[0].children[1].children[1].innerText; //Name
    const dataID = e.parentElement.parentElement.children[1].children[0].children[0].children[1].innerText; //Id

    let jsonData = {};
    jsonData['Name'] = dataName;
    
    jsonData = JSON.stringify(jsonData);
    fetch('http://localhost:9999/Artist/'+ dataID,
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
function deleteArtist(e)
{
    fetch('http://localhost:9999/Artist/'+ e.value,{method:'delete'});
}
