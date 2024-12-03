const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuotebtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');




/////get Qutes;
let airQuotes = [];
let errorCount = 0;

//showLoadingSpinner show

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;

};

function randQuotes() {
    showLoadingSpinner();
    const quoteNum = airQuotes[Math.floor(Math.random() * airQuotes.length)];
    if (!quoteNum.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = `-${quoteNum.author}`;
    }
    if (quoteNum.text.length > 90) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    quoteText.textContent = quoteNum.text;
    removeLoadingSpinner();

}

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const respone = await fetch(apiUrl);
        airQuotes = await respone.json();
        randQuotes();
        // throw new Error('opps')
    } catch (err) {
        if (errorCount < 10) {
            errorCount++;
            getQuotes();
        } else {
            console.error('Too many errors fetching quote.', err);
            quoteText.textContent = 'Sorry Something went wrong'
            removeLoadingSpinner();
        }
    }
}
function twitting() {
    const msg = `https://twitter.com/intent/tweet?${quoteText.textContent}- ${authorText.textContent}`
    window.open(msg, '_blank')

}

///////////////event listenr/////
newQuotebtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', twitting);

//  on load
getQuotes()

