# Setup Server

To download dependencies:

```bash
npm install
```

To run the server in development mode:

```bash
npm run dev
```

## Setup Database

To setup database locally for the first time:

```bash
npx supabase login
npx supabase init
```

To run databast locally (Ensure Docker is already installed on your system):

```bash
npx supabase start
```

To stop the database:

```bash
npx supabase stop
```

To update schema changes:

```bash
npx prisma db push
```

View database using Prisma GUI:

```bash
npx prisma studio
```
