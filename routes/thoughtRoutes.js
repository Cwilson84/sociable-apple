// GET all thoughts
app.GET('/api/thoughts', (req, res) => {
    // Logic to fetch all thoughts
  });
  
  // GET a single thought by id
  app.GET('/api/thoughts/:thoughtId', (req, res) => {
    // Logic to fetch a single thought by id
  });
  
  // POST to create a new thought
  app.POST('/api/thoughts', (req, res) => {
    // Logic to create a new thought and update the associated user's thoughts array
  });
  
  // PUT to update a thought by id
  app.PUT('/api/thoughts/:thoughtId', (req, res) => {
    // Logic to update a thought by id
  });
  
  // DELETE to remove a thought by id
  app.DELETE('/api/thoughts/:thoughtId', (req, res) => {
    // Logic to remove a thought by id
  });
  
  // POST to create a reaction stored in a single thought's reactions array field
  app.POST('/api/thoughts/:thoughtId/reactions', (req, res) => {
    // Logic to create a reaction and add it to a thought's reactions array
  });
  
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  app.DELETE('/api/thoughts/:thoughtId/reactions/:reactionId', (req, res) => {
    // Logic to remove a reaction by its reactionId from a thought's reactions array
  });