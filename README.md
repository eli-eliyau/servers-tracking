Instructions to run

1. Download the project from GitHub

2. Downloading the libraries
   cmd npm i
   
3. running the system
   npm run dev

4. Creating a DB in postgresql
   name db:server tracking

5. Running a DUMP file
   cd server tracking\src\db_dump\dump.sql
   
   cmd psql -U postgres -d "server tracking" -f C:\Users\og1\Desktop\Server tracking\src\db_dump\dump.sql

6. Using the API for servers

   # Create Server
   
    URL: /api/server/create
    Method: POST \n
    Description: Send in the form of an array of objects Several servers can be created in one request
    Body: [{
    "name": "Server Name",
    "url": "http://example.com"
    }]

   # Get Server By ID

    URL: /api/server/by-id/:id
    Method: GET
    URL Parameters:id - The ID of the server to retrieve
    Description: Retrieves the details of the server by ID and last 10 request objects

   # Get All Servers

    URL: /api/server/get-all
    Method: GET
    Description: Retrieves details of all servers    

   # Get Server Requests By ID

    URL: /api/server/requests/:id
    Method: GET
    URL Parameters:id - The ID of the server to retrieve
    Description: Retrieves the details of all requests to the server by id

   # Update a Server
  
    URL: /api/server/update/:id
    Method: PUT
    URL Parameters: id - The ID of the server to update
    Description: Updates an existing server entry by ID
    Body: {
    "name": "Updated Server Name",
    *or*
    "url": "http://updated-example.com"
    }

   # Delete Server

    URL: /api/server/delete/:id
    Method: DELETE
    URL Parameters: id - The ID of the server to delete
    Description: Deletes an existing server entry by ID

7.  Using the API for email
    //It was not in the requirements of the assignment but I think it was consumed
    
   # Create Email

    URL: /api/email/create
    Method: POST
    Description: Creates a new email entry
    Body: {
    "name":"your name",
    "email":"your email"
    }

    # Get All Emails

     URL: /api/email/get-all
     Method: GET
     Description: Retrieves a list of all email entries

    # Update Email

     URL: /api/email/update/:id
     Method: PUT
     Description: Updates an existing email or name entry by ID
     URL Parameters:id - The ID of the email to update
     Body: {
     "name":"Updates your name",
      *or*
     "email":"Updates your email"
     }

     #  Delete Email

      URL: /api/email/delete/:id
      Method: DELETE
      URL Parameters: id - The ID of the email to delete
      Description: Deletes an email entry by ID




