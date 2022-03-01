const loadData = () => {
    const userInput = document.getElementById('search-kayword')
    const userText = userInput.value;
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('error-message2').style.display = 'none';
    userInput.value = ""
    const url = `https://openapi.programming-hero.com/api/phones?search=${userText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data))
}

/* Display all search result */
const displayData = data => {
    const items = document.getElementById('items')
    const firsData = data.slice(0, 20)
    items.innerHTML = "";
    if (data.length == 0) {
        document.getElementById('error-message').style.display = 'block';
    }
    const fullItem = document.getElementById('details');
    fullItem.innerHTML = "";
    firsData.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
      <div class="card h-100 p-2">
         <img src="${phone.image}" class="card-img-top p-3" alt="...">
            <div class="card-body d-flex justify-content-between">
               <div>
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-title">Brand: ${phone.brand}</p>
               </div>
               <div>
                    <button onclick="loadDetials('${phone.slug}')" id="details-btn" class="btn btn-secondary mt-3">Details</button> 
                </div>
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
    .catch(error => errorMessage(error))
}

const errorMessage = error =>{
    document.getElementById('error-message2').style.display = 'block';
}

/* Display phone details */
const displayDetails = phone =>{
    const fullItem = document.getElementById('details');
    document.getElementById('error-message2').style.display = 'none';
    fullItem.innerHTML = "";
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    
    <div class="row g-3 p-3">
        <div class="col-md-4 align-items-center d-flex justify-content-center">
            <img src="${phone.image}" class="w-100" alt="">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h2 class="card-title">${phone.name}</h2>
                <h6 class="card-title">${phone.releaseDate || '<spin class="text-warning"> Unknown Release Date</spin>'}</h6>
                <p class="card-text"><small class="text-muted"></small></p>
                <h5>Main Features:</h5>
                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th class ="table-primary">Storage:</th>
                            <th class="table-danger">DisplaySize:</th>
                            <th class="table-secondary">ChipSet:</th>
                            <th class="table-warning">Memory</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="table-info">${phone.mainFeatures.storage} </td>
                            <td class="table-warning">${phone.mainFeatures.displaySize} </td>
                            <td class="table-success">${phone.mainFeatures.chipSet} </td>
                            <td class="table-danger">${phone.mainFeatures.memory} </td>
                        </tr>
                    </tbody>
                </table>    

            <table class="table table-bordered text-center">
                <thead>
                    <h5>Sensors:</h5>
                    <tr class="table-info">
                        <td>${phone.mainFeatures.sensors[0]}:</td>
                        <td>${phone.mainFeatures.sensors[1]}</td>
                        <td>${phone.mainFeatures.sensors[2]}</td>
                        <td>${phone.mainFeatures.sensors[3]}</td>
                        <td>${phone.mainFeatures.sensors[4]}</td>
                        <td>${phone.mainFeatures.sensors[5]}</td>
                    </tr>
                </thead>
            </table>  

    <h5>Others:</h5>
    <table class="table table-bordered text-center">
        <thead>
            <tr>
                <th class="table-danger">WLAN:</th>
                <th class="table-success">Bluetooth:</th>
                <th class="table-warning">GPS:</th>
                <th class="table-info">NFC</th>
                <th class="table-danger">Radio</th>
                <th class="table-info">USB</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="table-secondary">${phone.others.WLAN} </td>
                <td class="table-danger">${phone.others.Bluetooth} </td>
                <td class="table-info">${phone.others.GPS}</td>
                <td class="table-warning">${phone.others.NFC}</td>
                <td class="table-primary">${phone.others.Radio}</td>
                <td class="table-secondary">${phone.others.USB}</td>
            </tr>
        </tbody>
    </table>
            </div>
        </div>
    </div>
    `;
    fullItem.appendChild(div)
}

