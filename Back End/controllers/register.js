const handleRegister = db => (req, res) => {
  const { username, password, email, name } = req.body;
  db.query(
    {
      sql:
        "INSERT INTO userdata(Username,Password,Email,Name) VALUES (?,?,?,?)",
      values: [username, password, email, name]
    },
    function(error, results, fields) {
      if (error) {
        res
          .status(400)
          .json("Unable to register due to server issue or used username");
      }
      // const isValid = bcrypt.compareSync(password, results[0].Password);
      res.send("Registered Successfully");
    }
  );
};

module.exports = {
  handleRegister: handleRegister
};
