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
    URL: /api/server/create<br>
    Method: POST<br>
    Description: Send in the form of an array of objects Several servers can be created in one request<br>
    Body: [{<br>
    "name": "Server Name",<br>
    "url": "http://example.com"<br>
    }]

   # Get Server By ID
    URL: /api/server/by-id/:id <br>
    Method: GET <br>
    URL Parameters:id - The ID of the server to retrieve <br>
    Description: Retrieves the details of the server by ID and last 10 request objects

   # Get All Servers
    URL: /api/server/get-all <br>
    Method: GET <br>
    Description: Retrieves details of all servers    

   # Get Server Requests By ID
    URL: /api/server/requests/:id <br>
    Method: GET <br>
    URL Parameters:id - The ID of the server to retrieve <br>
    Description: Retrieves the requests belonging to the server by id

   # Update a Server
    URL: /api/server/update/:id <br>
    Method: PUT <br>
    URL Parameters: id - The ID of the server to update <br>
    Description: Updates an existing server entry by ID <br>
    Body: {<br>
    "name": "Updated Server Name",<br>
    *or*<br>
    "url": "http://updated-example.com"<br>
    }

   # Delete Server
    URL: /api/server/delete/:id <br>
    Method: DELETE <br>
    URL Parameters: id - The ID of the server to delete <br>
    Description: Deletes an existing server entry by ID 

7.  Using the API for email <br>
    It was not in the requirements of the assignment but I think it was consumed <br>

   # Create Email
   URL: /api/email/create<br>
    Method: POST<br>
    Description: Creates a new email entry<br>
    Body: { <br>
    "name":"your name", <br>
    "email":"your email" <br>
    }

   # Get All Emails
   URL: /api/email/get-all<br>
    Method: GET<br>
    Description: Retrieves a list of all email entries<br>

   # Update Email
   URL: /api/email/update/:id<br>
    Method: PUT<br>
    Description: Updates an existing email or name entry by ID<br>
    URL Parameters:id - The ID of the email to update<br>
    Body: {<br>
    "name":"Updates your name",<br>
    *or*<br>
    "email":"Updates your email"<br>
    }

   # Delete Email
    URL: /api/email/delete/:id<br>
    Method: DELETE<br>
    URL Parameters: id - The ID of the email to delete<br>
    Description: Deletes an email entry by ID




