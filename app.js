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
    items.innerHTML = "";
    const fullItem = document.getElementById('details');
    fullItem.innerHTML = "";
    data.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
      <div class="card h-100">
         <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 class="card-title">${phone.phone_name}</h5>
               <h6 class="card-title">${phone.brand}</h6>
               <button onclick="loadDetials('${phone.slug}')" id="details-btn" class="btn btn-secondary">Details</button>   
            </div>
      </div>
      `
      items.appendChild(div)
    })
}

const loadDetials = slug =>{
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
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
    
    <div class="row g-0 py-5">
    <div class="col-md-3 text-center">
      <img src="${phone.image}" class="img-fluid rounded-start" alt="" style="height:200px">
    </div>
    <div class="col-md-9">
      <div class="card-body">
        <h5 class="card-title">${phone.name}</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
    `;
    fullItem.appendChild(div)
}

