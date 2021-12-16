
const itemForm = document.getElementById('addItemForm')
itemForm.addEventListener('submit', addItem)
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
    listOfItems.textContent=''
    axios.get('/api/items')
        .then(res=> {addItemToMyList(res.data)})
        .catch(err => console.log(err))
}

function addItem(e){
    e.preventDefault()
    const newItem = document.getElementById('itemInput')

    let itemObj = {
        name: newItem.value
    }

    axios.post('/api/items', itemObj)
    // console.log(itemObj)
    .then(getAllItems)
    newItem.value=''
}

getAllItems();