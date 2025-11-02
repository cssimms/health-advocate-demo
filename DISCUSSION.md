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

- [ ] searching doesn't work at all
- [ ] reset search bar doesn't clear input value
- [ ] basic styling... it's hard to look at honestly

### Front End code health

Splitting things into different components, don't use raw tables, and leverage tailwind's utility classes a bit.
Searching should be debounced or have an explicit Search button

### Performance / Technical design

- [ ] We're fetching all records on page load
  - [ ] need some kind of pagination for splash page or browsing advocates
- [ ] Searching right now is filtering through all results on the front end
  - [ ] need a dedicated endpoint for searching, for abstraction and optimization
  - [ ]
