// GET all users
app.get('/api/users', (req, res) => {
  User.find()
    .populate('thoughts') // Populate field with thoughts
    .populate('friends') // Populate field with friends
    .exec((err, users) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(users);
      }
    });
});

// GET a single user by id
app.get('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .populate('thoughts') // Populate field with thoughts
    .populate('friends') // Populate field with friends
    .exec((err, user) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(user);
      }
    });
});
  
  // POST a new user
  app.post('/api/users', (req, res) => {
    // Logic to create a new user
  });
  
  // PUT to update a user by id
  app.put('/api/users/:userId', (req, res) => {
    // Logic to update a user by id
  });
  
  // DELETE to remove a user by id
  app.delete('/api/users/:userId', (req, res) => {
    // Logic to remove a user/associated thoughts by id  
  });
  
  // POST to add a new friend to a user's friend list
  app.post('/api/users/:userId/friends/:friendId', (req, res) => {
    // Logic to add a new friend to a user's friend list
  });
  
  // DELETE to remove a friend from a user's friend list
  app.delete('/api/users/:userId/friends/:friendId', (req, res) => {
    // Logic to remove a friend from a user's friend list
  });