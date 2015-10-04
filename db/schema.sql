DROP TABLE comments;

CREATE TABLE comments (
  id INTEGER PRIMARY KEY, 
  author VARCHAR(255), 
  body TEXT, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO 
  comments (author, body)
VALUES
  ("Ned Stark",            "Winter is *not* coming?"),
  ("Jon Snow",             "I know *many* things?"  ),
  ("Daenerys Targaryen",   "My dragons *are* here?" );

DROP TABLE notes;

CREATE TABLE notes (
  id INTEGER PRIMARY KEY, 
  content TEXT, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO 
  notes (content)
VALUES
  ("This is a note."),
  ("No, this is a note."),
  ("This is not a note.");