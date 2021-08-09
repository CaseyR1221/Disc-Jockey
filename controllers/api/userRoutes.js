const router = require('express').Router();
const { Reviews, User, ScoreCard, Disc } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [ScoreCard],
    });

    const reviewData = await Reviews.findAll({
      where: { user_id: req.session.user_id },
      include: Disc,
    });

    const user = userData.get({ plain: true });
    const reviews = reviewData.map((review) => review.get({ plain: true }));

console.log(user);
console.log(reviews);

    res.render('userprofile', {
      layout: 'profile',
      user,
      reviews,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates a new score card and saves it with a user id
router.post('/scorecard', async (req,res) => {
  try {
      const scorecardData = ScoreCard.create({
          course_name: req.body.course,
          my_score: req.body.score,
          par: req.body.par,
          user_id: req.session.user_id,
      });

      res.status(200).json(scorecardData);

  } catch(err) {
      res.status(400).json(err);
  }
});

router.delete('/scorecard/:id', async (req,res) => {
  try {
    const scorecardData = await ScoreCard.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!scorecardData) {
      res.status(404).json({ message: 'No scorecard found with this id!' });
      return;
    }

    res.status(200).json(scorecardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;