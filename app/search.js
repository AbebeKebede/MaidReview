// Event listener for search input
const firebaseConfig = {
    apiKey: "AIzaSyDPywnMf7tlutf3f9_HXEmAtv6sIEbpwao",
    authDomain: "maidreview-f29de.firebaseapp.com",
    databaseURL: "https://maidreview-f29de-default-rtdb.firebaseio.com",
    projectId: "maidreview-f29de",
    storageBucket: "maidreview-f29de.appspot.com",
    messagingSenderId: "910103568681",
    appId: "1:910103568681:web:0576c52d78fd37078d5738",
    measurementId: "G-F8PE9V9T4E"
  };
  
  // Initialize Firebase
  
  
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const maidReviewsRef = database.ref('maidReviews');

const searchInput = document.getElementById('searchInput');
const maidList = document.getElementById('maidList');

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
  
    // Clear previous maid list
    maidList.innerHTML = '';
  
    // Filter maids based on the search term
    maidReviewsRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const maid = childSnapshot.val();
        if (maid.maidName.toLowerCase().includes(searchTerm)) {
          // Display maids that match the search term
          const maidElement = document.createElement('div');
          maidElement.innerHTML = `<div class="card">
          <div class="card-image"><img src=${maid.photoURL} width="100%" height="100%"></div>
          <div class="category"> ${maid.maidName} </div>
          <div class="heading"> ${maid.maidComment}
              <div class="author"> Rating: ${maid.rating}</div>
          </div>
        </div>`;
          maidList.appendChild(maidElement);
        }
      });
    });
  });