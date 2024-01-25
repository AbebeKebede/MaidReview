// Import the functions you need from the SDKs you need

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
const storage = firebase.storage(); // Initialize Firebase Storage

const reviewForm = document.getElementById('reviewForm');
const reviewsContainer = document.getElementById('reviews');


reviewForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const maidName = document.getElementById('maidName').value;
  const rating = document.getElementById('rating').value;
  const maidPhotoInput = document.getElementById('maidPhoto');
  const maidPhotoFile = maidPhotoInput.files[0];

  const maidComment = document.getElementById('maidComment').value;

  // Upload photo to Firebase Storage
  const storageRef = storage.ref(`maid_photos/${maidPhotoFile.name}`);
  const photoSnapshot = await storageRef.put(maidPhotoFile);
  const photoURL = await photoSnapshot.ref.getDownloadURL();
  
  database.ref('maidReviews').push({
    maidName,
    rating: parseInt(rating),
    photoURL,
    maidComment
  });
  
  reviewForm.reset();
});

// Listen for changes in the database and update the UI
database.ref('maidReviews').on('value', (snapshot) => {
  reviewsContainer.innerHTML = '';

  snapshot.forEach((childSnapshot) => {
    const review = childSnapshot.val();
    const reviewElement = document.createElement('div');
    reviewElement.innerText = `${review.maidName} - Rating: ${review.rating} - Comment ${review.maidComment}`;
    reviewsContainer.appendChild(reviewElement);
  });
});

