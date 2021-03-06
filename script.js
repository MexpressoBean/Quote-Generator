
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Function for showing the loading spinner
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Function for removing the loading spinner
function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }

}

// Get quote from API
async function getQuote(){
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'; 

    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);

        // In cases that there is no author text
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
        }
        else
        {
            authorText.innerText = data.quoteAuthor;
        }
        
        //Reduce font size for longer quotes
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }

        // Displays the quote text on the browser from the api
        quoteText.innerText = data.quoteText;
        
        // Stop loader and show quote
        removeLoadingSpinner();
    }
    catch(error){
        getQuote();
        console.log('No quote read', error);
    }
} // END getQuote


// Funtion that allow the user to tweet out the quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();