### Notes as I go

- [x] .env had key commented out,

  - could use a .env.sample + gitignore .env

- [x] toast error

```
In HTML, <th> cannot be a child of <thead>.
This will cause a hydration error.
```

~ wrap the <th> in their own <tr>

- [ ] js console errors

```
Warning: Each child in a list should have a unique "key" prop.
```

this got me down a whole typing rabbit hole, (but a good one!) getting the types from the backend and using them on the Page.
"specialties" is spelled wrong and is also an unknown json blob. changing to an array of strings, bc that seems reasonable.

- some nextjs stuff but also just html and react easy things to fix

- [ ] front end scaling

  - are we fetchign all records?
  - is there pagination?

- [ ] searching doesn't work at all
- [ ] reset search bar doesn't clear input value
