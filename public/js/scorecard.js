const newScorecardHandler = async (event) => {
    event.preventDefault();

    const course = document.querySelector('#course-name').value.trim();
    const score = document.querySelector('#course-score').value.trim();
    const par = document.querySelector('#course-par').value.trim();

    if (course && score && par) {
      const response = await fetch('/api/users/scorecard', {
        method: 'POST',
        body: JSON.stringify({ course, score, par }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        console.log('failed to post comment');
      }
    }
  };

  const deleteHandler = async (event) => {
    event.preventDefault();
console.log(event.target);
    const scorecard_id = event.target.id;
    const response = await fetch(`/api/users/scorecard/${scorecard_id}`, {
        method: 'DELETE',
    });

      if(response.ok) {
          alert("scorecard was deleted!");
          document.location.replace("/api/users/profile");
      } else {
          alert("Could not delete scorecard!");
      }
  };


  document
  .querySelector('#saveScore')
  .addEventListener('click', newScorecardHandler);

  document
  .querySelector('#prevScores')
  .addEventListener('click', deleteHandler);