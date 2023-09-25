
// search form
const search_form = document.getElementById('search-form');
// input field
const search_box = document.getElementById('search-box');
// results
const search_result = document.getElementById('search-result');
// load more results
const show_more_btn = document.getElementById('show-more-btn');
const btn = document.querySelector('#btn');
// we need to get the unsplash image api


// access key to the unsplash api
const ACCESS_KEY = "lb1zyOEatxOnxrO5qvHuiuRAi8Kv4XWxBdD3qmgx7to";

let keyword = "";
let page = 1;

// asynchronous function
// promise-based code, as if it was synchronous
// and it checks that we are not breaking the execution thread.
async function searchImages() {
    // getting the value of the search box
    // eg Love images
    keyword = search_box.value;

    // forming the api
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${ACCESS_KEY}&per_page=12`;

    // making a request to the api
    const response = await fetch(url);
    const data = await response.json();

    // data will be printed to the console
    // the results are stored in a 'results' object
    const results = data.results;

    // iterating through the results
    results.map(result => {
        // create an image element tag
        const image = document.createElement('img');
        image.src = result.urls.small;

        // link to the image profile on unsplash
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        // open the link in new tab
        imageLink.target = "_blank";

        imageLink.appendChild(image);

        search_result.appendChild(imageLink);
    })

    // show me the show more btn
    show_more_btn.style.display = 'block';
}

// so its seems that submit is an event listener
// we are going to call the searchImages() function
// whenever we click on the submit
btn.addEventListener('click', (e) => {
    // it will prevent the default behavior of a...
    // browser, which is to go to another page...
    // when we click the submit button
    e.preventDefault();
    // anytime we enter any new keyword,
    // the page will become 1
    page = 1;
    // deleting previous images if any
    if(search_result.hasChildNodes()) {
        let child = search_result.lastElementChild;
        while(child) {
            search_result.removeChild(child);
            child = search_result.lastElementChild;
        }
    }
    // calling the asynchronous function
    searchImages();
});

// search-box.addEventListener('input', () => {
//     page = 1;
//     // delete all the images before
//     if(search)

// })

show_more_btn.addEventListener('click', () => {
    // it will increase the number value of the page
    page++;
    searchImages();
})