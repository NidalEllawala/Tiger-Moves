


function checkDB (req, res) {
  //const choice = req.body['choose-player'];
  const game = TestNewGame();
  res.send(game);
}