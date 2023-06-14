# Library Admin

Library Admin is an application that allows you to manage authors and their books, it is a basic but intuitive administrator.

## Clone the repository
```sh
git clone https://github.com/salejo28/LibraryAdmin.git
```

## Create .env file
Create the **.env** file and set this variable

```sh
VITE_JSON_SERVER_URL=http://localhost:3000
```

## Installing dependencies

Install the application dependencies by running:

```sh
npm install
```

## Init json server
If you do not have json server 
```sh
npm i -g json-server
```

Execute the following command
```sh
json-server -w db/db.json
```

## Development

Start the application in development mode by running:

```sh
npm run dev
```

## Production

Build the application in production mode by running:

```sh
npm run build
```

Run the production app
```sh
npm run serve
```

## Things to improve

One of the things to improve is that when deleting an author, at the moment of deleting all the books associated to it, I made a function to do it, it does it but nevertheless it gives an error when doing it. The function is

```js
 const handleDelete = async () => {
    if (resource === "authors") {
      await Promise.all(
        selectedIds.map(async (selected_id) => {
          const { data } = await dataProvider.getList("books", {
            filter: { authorId: selected_id },
            pagination: undefined as unknown as PaginationPayload,
            sort: undefined as unknown as SortPayload,
          });

          const books_ids = data.map((d) => d.id);
          await dataProvider.deleteMany("books", {
            ids: books_ids,
          });
        })
      );
    }
  };
```

As the function getList receives obligatorily the properties pagination and sort, but all the elements related to author were needed, so I passed them as undefined but at the moment of executing it gives an error that it is not possible to receive undefined.