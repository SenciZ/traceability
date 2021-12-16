
const itemForm = document.getElementById('addItemForm')
itemForm.addEventListener('submit', addItemToMyList)
const listOfItems = document.getElementById('listOfItems')


function addItemToMyList(arr){
    // alert('clicked')
    for(let i =0; i<arr.length; i++){
        const li = document.createElement('li')
        let item = arr[i].name
        li.textContent = `${item}`
        listOfItems.appendChild(li)
    }
}

function getAllItems(){
    axios.get('/api/items')
        .then(res=> {addItemToMyList(res.data)})
        .catch(err => console.log(err))
}

getAllItems();