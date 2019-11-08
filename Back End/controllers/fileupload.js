const handleFileupload = (db, fs) => (req, res, next) => {
  const up_file = req.files.file;
  const { AlbumName, ArtistName, AlbumPrice, SongName, SongPrice } = req.body;
  const dateTime = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const Artworkpath = "./public/albumimages";
  // console.log(AlbumName);

  if (!up_file) {
    res.status(400).json("No file");
  }

  const filepath = "./Albums/" + AlbumName + "/";
  const fullfilepath = "./Albums/" + AlbumName + "/" + up_file.name;
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
  }

  up_file.mv(filepath + up_file.name, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json("Uploaded!");
  });

  db.query(
    {
      sql:
        "INSERT INTO musicdb.artist (Name) SELECT * FROM (SELECT ?) AS tmp WHERE NOT EXISTS (SELECT * FROM artist WHERE Name = ?);",
      values: [ArtistName, ArtistName]
    },
    function(error, results, fields) {
      if (error) {
        console.log("SQL Sign in not working");
        throw error;
      } else {
        console.log("artist SQL success");
      }
    }
  );
  db.query(
    {
      sql:
        "INSERT INTO musicdb.album (Album_Title, Date, Price, Album_Artwork, ArtistID) SELECT * FROM (SELECT ?,?,?,?, a.ArtistID FROM artist a WHERE a.Name = ?) AS tmp;",
      values: [AlbumName, dateTime, AlbumPrice, Artworkpath, ArtistName]
    },
    function(error, results, fields) {
      if (error) {
        console.log("SQL Sign in not working");
        console.log(error);
      } else {
        console.log("Album SQL success");
      }
    }
  );

  db.query(
    {
      sql:
        "INSERT INTO musicdb.song (Song_Title, File_Location, Price, Date, Song_Artwork, AlbumID, ArtistID) SELECT * FROM (SELECT ?, ?, ?,?, ?, a.AlbumID, a.ArtistID FROM album a WHERE a.Album_Title = ?) AS tmp;",
      values: [
        SongName,
        fullfilepath,
        SongPrice,
        dateTime,
        Artworkpath,
        AlbumName
      ]
    },
    function(error, results, fields) {
      if (error) {
        console.log("SQL Sign in not working");
        throw error;
      } else {
        console.log("song sql success");
      }
    }
  );
};

module.exports = {
  handleFileupload: handleFileupload
};
