const newScorecardHandler = async (event) => {
    event.preventDefault();

    const score = document.querySelector('#user-score').value.trim();
    const par = document.querySelector('#course-par').value.trim();

    if (score && par) {
      const response = await fetch('/api/user/scorecard', {
        method: 'POST',
        body: JSON.stringify({ score, par }),
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
  .querySelector('.score-form')
  .addEventListener('submit', newScorecardHandler);