this implements a mini project which uses rest api and fs module

# routes 
Routes :-

GET /
=> Display all note titles
=> Click on a title to open the note

GET /:file-name
=> Display content of a specific note

GET /new
=> Show form to create a new note

POST /
=> Create a new file with topic as filename and content as file content

GET /:file-name/edit
=> Show form to edit an existing note

PUT /:file-name
=> Update or append content to a specific note

DELETE /:file-name
=> Delete a specific note


Optional Routes :-

GET /search
=> Search notes by title

PATCH /:file-name/rename
=> Rename a note

GET /trash
=> Display deleted notes

POST /restore/:file-name
=> Restore a deleted note

## ..





### this file implements fs module node js
#operations : CRUD
c -> create 
r -> read
u -> update 
d -> delete 

## import 
    npm i fs
    const fs = require("fs");


## functions used

1. Read a file

const data = fs.readFileSync("data.txt", "utf8");
console.log(data);

2. Write a file
fs.writeFileSync("data.txt", "New Content");

3. Append to a file
fs.appendFileSync("data.txt", "\nAnother Line");

4. Delete a file
fs.unlinkSync("data.txt");

5. Create a folder & Delete a folder
fs.mkdirSync("data");
fs.rmdirSync("data");



### folder structure 
text-editor/
│
├── notes/
│   ├── note1.txt
│   └── note2.txt
├── views/
│   ├── home.ejs
│   ├── create.ejs
│   └── edit.ejs
└── index.js

this creates a new file with name of topic and content within it ..


### Suggested Flow
Home Page
   |
   +--> Create Note
   |
   +--> Open Note
            |
            +--> Edit
            |
            +--> Delete