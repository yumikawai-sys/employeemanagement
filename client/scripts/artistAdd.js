document.querySelector('button').addEventListener('click',addNew);

function addNew()
{
    alert('Processing your request');
    const newData = new FormData(document.querySelector('form'));
    fetch('http://localhost:9999/Artist',{method:'POST',body:newData});
    
}