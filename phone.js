const loadPhone = async (searchText='13') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones => {

    // step-1: get the container
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display 'show all' button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    // display only 12 phone
    phones = phones.slice(0, 12);

    phones.forEach(phone => {
        // console.log(phone);
        // step-2: create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-8 bg-gray-200 shadow-xl`;

        // step-3: innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body text-left text-black">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-start">
                        <button onclick="handleShowDetails('${phone.slug}') " class="btn  btn-primary">Buy Now</button>
                      </div>
                </div>`
        // step-4: append child
        phoneContainer.appendChild(phoneCard);

    })
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// handle search button
const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}


// handle search 2
// const handleSearch2 = () =>{
//     toggleLoadingSpinner(true);
//     const searchField2 = document.getElementById('search-field-2');
//     const searchText = searchField2.value;
//     loadPhone(searchText);
// }


// loading spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.classList.remove('hidden');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

// show details button
const handleShowDetails = async(id) => {
    // console.log('clicked', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);

}
// phone details on modal
const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-details-container');

    showDetailContainer.innerHTML = `
    <img src="${phone.image}" />
    <p><span>Storage: </span>${phone?.
        mainFeatures?.storage}</p>
    <p><span>Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span>GPS: </span>${phone?.others?.GPS || 'No GPS'}</p>      
    `


    // show the modal
    show_details_modal.showModal()
}



loadPhone();