const loadData = () => {
    const userInput = document.getElementById('search-kayword')
    const userText = userInput.value;
    userInput.value = ""
    const url = `https://openapi.programming-hero.com/api/phones?search=${userText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data))
}

const displayData = data => {
    const items = document.getElementById('items')
    items.innerHTML = ""
    data.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
      <div class="card h-100">
         <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 class="card-title">${phone.brand}</h5>
               <p class="card-text"></p>
               <button onclick="" id="details-btn" class="btn btn-secondary">Details</button>   
            </div>
      </div>
      `
      items.appendChild(div)
    })
}

const loadDetials = idMeal =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}

const displayDetails = phone =>{
    const fullItem = document.getElementById('details');
    fullItem.innerHTML = "";
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone}" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title">${phone}</h5>
      <p class="card-text">${phone}</p>
      <p class="card-text"><small class="text-muted">Category:${phone}</small></p>
    </div>
    `;
    fullItem.appendChild(div)
}

