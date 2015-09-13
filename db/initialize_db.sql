CREATE TABLE "comments" (
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