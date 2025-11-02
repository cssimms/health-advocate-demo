# Implementation Notes

### Basic setup/dev experience

Console errors, configuration, linting errors were all pretty obvious from the start.

- [x] .env had key commented out,

  - could use a .env.sample + gitignore .env

- [x] toast error

```
In HTML, <th> cannot be a child of <thead>.
This will cause a hydration error.
```

~ wrap the <th> in their own <tr>

- [x] js console errors
  - some nextjs stuff but also just html and react easy things to fix

```
Warning: Each child in a list should have a unique "key" prop.
```

this got me down a whole typing rabbit hole, (but a good one!) getting the types from the backend and using them on the Page.
"specialties" is spelled wrong and is also an unknown json blob. changing to an array of strings, bc that seems reasonable.

- [x] searching doesn't work at all
- [x] reset search bar doesn't clear input value
- [x] basic styling... it's hard to look at honestly

### Front End code health

Splitting things into different components, don't use raw tables, and leverage tailwind's utility classes a bit.
Searching should be debounced or have an explicit Search button

### API Performance

- [ ] We're fetching all records on page load
  - [ ] need some kind of pagination for splash page or browsing advocates
- [ ] Searching right now is filtering through all results on the front end
  - [ ] need a dedicated endpoint for searching, for abstraction and optimization
  - [ ] search is a big subject! will implement a small "search" service that does some basic things, but obviously searching at scale is a whole other set of problems
    - Elasticsearch? Caching? Personalizated Search queries?
    - [ ] hook up the frontend to the new search endpoint
    - [ ] should include a primitive debounce

### Data modeling

```typescript
city: text("city").notNull(),
```

Locations can be a problem with normalization, but it depends on how strict you are validating incoming data. I would
try to be very strict and use some external library or location normalizer so you don't end up with data that's hard to search for later!
e.g. New York vs NY vs new york, etc.

```typescript
degree: text("degree").notNull(),
```

There are only so many types of degrees, might be a good candidate for Postgres Domains
https://www.postgresql.org/docs/current/sql-createdomain.html

```typescript
specialties: text("payload").array().default([]).notNull(),
```

May deserve it's own table sooner rather than later, and suggestions on input to keep data in line.
It's a lot of redundant data in the advocate table if you have thousands of advocates with the same 30-character specialty. That's not to mention
searching.

```typescript
phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
```

I would be tempted to revist the phonenumber datatype, BIGINT feels like a mistake to me. I did some quick research, and it looks like
there are a couple different ways to go, would need more time to form a real opinion.
(this might be a total non-issue after reading more about it)
libphonenumber via pg_libphonenumber?
https://dba.stackexchange.com/questions/164796/how-do-i-store-phone-numbers-in-postgresql
https://github.com/blm768/pg-libphonenumber

VARCHAR might not have real performance concerns until you're up into millions of rows?
https://www.mayerdan.com/programming/2017/06/26/db_phone_types

### Tests

Need em!
