# Spotify Authorization Code with PKCE example

This app displays your Spotify profile information using [Authorization Code with PKCE](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow)
to grant permissions to the app.

## Using your own credentials

You will need to register your app and get your own credentials from the [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard).

- Create a new app in the dashboard and add `http://localhost:8080` to the app's redirect URL list.
- Once you have created your app, update the `client_id` and `redirect_uri` in the `public/app.js` file with the values obtained from the app settings in the dashboard.

## Running the example

From a console shell:

    $ npm start

Then, open `http://localhost:8080` in a browser.

## Code Walkthrough

**Flow of code**
- When first loaded in, the user will not be logged in and the login html fragment will be rendered with the following call: *renderTemplate("main", "login");*
- When the user clicks the login button, the function *loginWithSpotifyClick()* is invoked, which calls *redirectToSpotifyAuthorize()* in turn
    -This function assembles the components necessary for the authorization procedure and then sends an authorization request to Spotify's API, which takes over the URL and rendering
- On authorization pass/fail, the user is sent back to redirectUrl
    - On pass, a 'code' is sent in the URL's query arguments
        - The code is then used to retrieve an access token
    - On fail, no 'code' is present and we end up with *renderTemplate("main", "login");*
- Once an access token is successfully retrieved, we render different components:
    - *renderTemplate("main", "logged-in-template")*
        - The data for this component is obtained with *getUserData()*
    - *renderTemplate("oauth", "oauth-template")*
        - The data for this component is contained in *currentToken*

**currentToken**
 - This is an Object that houses methods for retrieving or saving the data contained in Spotify's authorization token (sent as a JavaScript Promise)
 - It saves token data into localStorage
 - The first methods are getters for retrieving this data from localStorage
 - The last method, *.save*, unpacks the token and saves it to localStorage
  - The access token itself is an encrypted string containing the credentials and permissions forming an authorization

**MDN Objects**
The example uses many Objects from Mozilla's web API such as:
 - URLSearchParams
     - Enables iterating through a URL's query parameters
         - URL query parameters are the key=value pairs in a URL following a '?'
         - Each parameter is separated by '&'
     - The code uses this object's .get() method to find the value associated with the key 'code'
     - The .delete() method removes the key=value pair matching the given key from the URL
 - URL
     - For parsing, constructing, normalizing, and encoding URLs
     - .searchParams references the URL's URLSearchParams
     - .href returns the entire URL as a string

**Spotify Authorization API Calls**

getToken()
 - Takes in an authorization code and verifies if it is a valid one, returning an authorization token as a Promise if so
 - Uses the code_verifier in localStorage that is set when the user presses the login button
 - Uses fetch() to send to Spotify's Web API for tokens the following:
     - clientId: our Spotify Web App's ID
     - grant_type: What kind of method we're using for authorization
     - code: Any previous authorization code that we've received through the url
     - redirect_uri: Where to send the user on a failed token exchange?
     - code_verifier: The random string that's used to validate messages as legitimate

getUserData()
 - This function serves as an example of how to use a validated access token following the instructions on https://developer.spotify.com/documentation/web-api/concepts/access-token
 - Note how the access token is placed in the header of our http request

renderTemplate()
 - The example is using a special HTML element, `<template>`:
     - These can be found in index.html
     - renderTemplate() copies the HTML Fragments within the templates into the given <div> so that they are rendered
     - For some reason, it loops through the attributes of each cloned element and replaces the data-bind key with blanks, leaving many attribute values keyless.
         - Based on these replaced values, it then tries to differentiate between onClick events, which it types as "HANDLER", and the keyless attributes, which it types as "PROPERTY"
 - Tries to replace attribute values bearing this regular expression: /;\n\r\n/g
     - ; = Looks for JavaScript's expression terminator
     - / = denotes the beginning and end of a regular expression
     - \n = line feed
     - \r = carriage return
     - g = a flag that causes the search to return all matches rather than just the first
     - This all seems to mean that the function is looking for the end of expressions and replacing them with empty strings
         - It combines the resulting string with a prefix of "data." if its type was determined to be a "PROPERTY"
     - In the try-catch portion that follows, it assigns a new value to the attributes of the element accordingly:
         - Executes the assembled JavaScript code if the element type is PROPERTY to get the value
             - These are references to the data Object, renderTemplate()'s 3rd argument
         - Returns a function call if the element type is HANDLER
 - In summary, the function replaces template fragment elements data-bind attributes with attribute keys & values or element contents that we generate with the JavaScript that results after the text replacements. Effectively, this allows us to:
     - Populate the templates with the data that we passed into the function
     - Supply raw function handles to onclick

redirectToSpotifyAuthorize()
 - Generates a string to run the cryptography algorithm with using the characters in the variable possible
 - First, it fills an unsigned integer array of size 64 using crypto, JavaScript's global random number generator
 - Then, it calls Array.reduce()
     - The initial accumulator value is set to an empty string
     - The callback selects a character from possible based on the random number element and adds it to the accumulator
 - Next it encodes the string into bytes, then encrypts it using the SHA-256 algorithm
 - code_challenge_base64
     - First the bytes in hashed are converted to a string
     - Then the string is converted to ASCII characters
     - This string of ASCII characters then has the following replacements:
         - Removes any '=' characters
         - Replaces '+' with '-'
         - Replaces '/' with '_'
 - code_verifier is saved to the browser session's localStorage
 - Finally, a new URL is assembled with all the components necessary to send Spotify's authorization API an authentication request
     - authUrl will hold the URL Object to be created
     - It starts off by setting the .url to authorizationEndpoint
     - We then assemble the query parameters in params
     - We can add these to authUrl.search:
         - Create a new URLSearchParams Object, passing the params Object in as a constructor argument
         - Calling .toString() on this new URLSearchParams Object makes it fit a URL.search
 - Redirect the browser to our assembled URL by assigning its string representation to window.location.href

refreshToken()
 - Tokens are only valid for 1 hour
 - This function assembles an http request to Spotify's Token API to renew that timer

**Built-in JavaScript & HTML Concepts**

String
 - .replace()
    Functions like other language's character replacement functions
 - .fromCharCode()
    <br>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
    <br>Converts an array of UTF-16 character codes (Uints) into their characters and returns the resulting String

window
 - A browser's global namespace
 - .history
    Refers to the browser's navigation history
     - .replaceState()
        <br>https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
        <br>Alters the state and url of the current history entry
         - The example uses this to remove the code query entry from the url so that refreshing the page does not trigger another authorization check
         - The original example passes in an empty Object and a non-empty string as its 1st and 2nd arguments, respectively.  This isn't necessary according to MDN's documentation.
             - The 1st argument, state, accepts null.  Since we're passing in an empty object, we may as well pass in null.
             - The 2nd argument is unused.  The original example must've been written with some legacy version of .replaceState() in mind.
 - .location.href
    Manipulating this property allows you to redirect the browser to a different url

async function
 - Declares a function that will run in the background, not locking up the program
 - Async functions return Promises by default
 - Promises are unpacked with the keyword await, which also enqueues function calls so that they can be executed in order

fetch
 - Sends an html request to the given URL and returns a Response object

document
 - Refers to the html document that the window is currently displaying
 - .getElementById()
    Returns a reference to the first HTML element (some data tagged by <id=___></>) with a matching id
    HTMLElement reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
 - .querySelectorAll()
    <br>https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll

`<template>`
<br>https://www.w3schools.com/tags/tag_template.asp
<br>https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
 - The explanation for template.content.cloneNode(true) can be found here
 - An HTML element that is not rendered and is just used to store HTML fragments
 - These are typically copied into other HTML elements so that the fragments can be rendered

The Spread Operator (…)
 - Unpacks an iterable into individual key:value pairs to be operated on

Array
 - .forEach()
    Allows you to provide a callback function that is called with each element in the array as an argument
 - .filter()
    Returns only the elements that match the given filter callback
 - .reduce(callback, initialValue)
    Takes in a 2-parameter callback function, passes each element through it, and accumulates the result into 1 returned variable.
    1st argument is the accumulator which collects the results of the operations on each element.
    2nd argument is the element.

Regular Expressions
<br>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
<br>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#advanced_searching_with_flags
<br>https://regex101.com/ - Tool for quickly understanding regex
<br> - Used by renderTemplate() to replace element attribute text
    
Element.removeAttribute()
<br>https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute

crypto
<br>https://developer.mozilla.org/en-US/docs/Web/API/crypto_property
 - A global variable that references a Crypto Object
 - Mainly used for generating random numbers with .getRandomValues()
 - .subtle.digest()
    <br>https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
    <br>Used to encrypt a given sequence using SHA algorithms
    
TextEncoder
 - An Object for converting strings into bytes to be sent over a connection

btoa()
<br>https://developer.mozilla.org/en-US/docs/Web/API/btoa
 - Stands for bytes to ASCII?
 - Converts a string encoded as bytes to a string of ASCII characters

**Chrome Tips**
 - Chrome doesn't do a hard reload when loading recompiled pages, thus your code changes won't immediately show up after refreshing.
    - To fix this, hold Ctrl when refreshing or press F12 to open the Dev Tools, then right click on the refresh button to get the hard reload and/or clear cache options