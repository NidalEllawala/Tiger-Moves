const { createNewGameDB } = require('../model/mdb');


async function newGameDB (req, res) {
  try {
    const choice = 'tiger';   //req.body['choose-player'];
    const game = await createNewGameDB(choice);
    res.send(game._id);
    //res.render('home', {uid: game._id, choice: choice});
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send('Internal server error');
  }
}

module.exports = { newGameDB };