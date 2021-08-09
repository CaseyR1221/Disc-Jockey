const newReviewHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#review-body').value.trim();
    // grabs the id at the end of the url by turning url into a string then an array and grabbing the last element
    const disc_id = window.location.href.toString().split("/").pop();
console.log("saved");
    if (comment && disc_id) {
      const response = await fetch('/api/reviews/', {
        method: 'POST',
        body: JSON.stringify({ comment, disc_id }),
        headers: { 'Content-Type': 'application/json' },
      });
console.log("posted");
      if (response.ok) {
        document.location.reload();
      } else {
        console.log('failed to post comment');
      }
    }
  };

  document
  .querySelector('#postReview')
  .addEventListener('click', newReviewHandler);