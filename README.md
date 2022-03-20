Project FirstPancake

AC  (Login):

- Login page is accessible under `/login` only for non-authenticated users, otherwise it redirects them to the Home page
- Email and password fields are mandatory
- Password field text visibility can be toggled by clicking the eye icon
- If any of the fields values are invalid, immediately show it on the UI (standard text field error state is enough)
- When waiting for the server response, the submission button has to be disabled
- In case there is a server-side error happened during form submission, show it in a snackbar
- After successful login, redirect user to the home page

AC (Home):

- Home page is accessible under `/` only to logged-in users, otherwise it redirects them to the Login page
- “DP” are initials of the user’s first and last names
- If the user name is empty, show “U” in the user avatar
- The burger menu icon button at the left part of the app bar doesn’t do anything when clicking
- When clicking the user avatar, a menu with a single “Logout” item appears
- When clicking “Logout”, user logs out
- Call `src/common/clearFirestoreCache` function after user is signed out (this is a known issue of reactfire)


AC (Login):

- “Register” link below forwards the user to the registration page

AC (Register):

- Registration page is accessible under `/register` only to non-authenticated users, otherwise it redirects them to the Home page
- All form fields are mandatory
- Email field has to accept only valid emails
- Password length has to be minimum 12 characters
- Password field text visibility can be toggled by clicking the eye icon
- “Repeat password” field value has to match the Password field value
- Name field has to contain at least 2 words, each of which has to start from a capital letter
- If any of the fields values are invalid, immediately show it on the UI (standard text field error state is enough)
- When waiting for the server response, the submission button has to be disabled
- In case there is a server-side error happened during form submission, show it in a snackbar
- After successful registration, authenticate the user, redirect them to the home page and show a snackbar with the text “Welcome on board 🚀”
- “Login” link below forwards the user to the login page
- Name field value has to be save inside the user profile on Firebase Auth (not to Firestore)

AC (Home):

- The “Explore flats” button will lead the user to the Flat listing page

AC (Flat listing):

- The page is available under `/flats` only to authenticated users, otherwise it redirects them to the Login page
- By default, flats appear on the page without any filters applied
- Flats are always sorted by publication time and limited to the last 20 published
- Each flat is displayed in a Flat card
- When scrolling the flat list, the app bar and the “City” field always stay fixed and visible at the same place
- Flats information is stored inside Firestore (collection: `flats`)

AC (Flat card):

- The image is shown on the left side of the card and it covers the entire space of its container
- The price per night is shown in USD
- The address is shown as it is (without removing the city name etc.)
- Description can take up to maximum 3 lines of space
- In case the description is not provided, the “Details” button stays on the same place
- When clicking “Details”, nothing happens

AC (Flat filtering):

- The “City” field value is in sync with the address bar (e.g. if its value `Berlin`, the address bar URL will equal to `/flags?city=Berlin` and vice-versa)
- When the “City” field value is not empty, a dropdown below it appears with possible city name suggestions (using Google Places Autocomplete API)
- When clicking any of the suggestions, the “City” field value changes to the full name of the selected city
- Whenever the “City” field search icon or a city suggestion are clicked, the flat list gets filtered by the city name (exact match is enough)
- In case the address bar has the city value specified initially at the page load, the list also gets filtered
- Whenever the “City” field value is cleared, user sees flats without them being filtered by a city name