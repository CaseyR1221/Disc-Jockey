const newReviewHandler = async (event) => {
    event.preventDefault();

    const body = document.querySelector('#review-body').value.trim();
    // grabs the id at the end of the url by turning url into a string then an array and grabbing the last element
    const post_id = window.location.href.toString().split("/").pop();

    if (body && post_id) {
      const response = await fetch('/api/review/', {
        method: 'POST',
        body: JSON.stringify({ body, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        console.log('failed to post comment');
      }
    }
  };

  document
  .querySelector('.review-form')
  .addEventListener('submit', newReviewHandler);