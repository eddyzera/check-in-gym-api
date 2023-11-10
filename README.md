# Check-in Gym API

API NodeJS que faz check-in em academias

## Requirements

### Functional requirements

- [ ] should be possible to register;
- [ ] should be possible to authenticate;
- [ ] should be possible to obtain the profile of a logged in user;
- [ ] should be possible to obtain the number of check-ins performed by the logged in user;
- [ ] should be possible for the user to obtain their check-in history;
- [ ] should be possible for the user to search for nearby gyms;
- [ ] should be possible for the user to search for gyms by name;
- [ ] should be possible for the user to check-in at a gym;
- [ ] should be possible to validate a user's check-in;
- [ ] should be possible to register a gym;

### Business rules

- [ ] The user must not be able to register with a duplicate email;
- [ ] The user cannot do 2 check-ins on the same day;
- [ ] The user cannot check in if they are not close (100m) to the gym;
- [ ] Check-in can only be validated up to 20 minutes after being created;
- [ ] Check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

### Non-functional requirements

- [ ] The user password must be encrypted;
- [ ] The application data must be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token);

## Tools

- Typescript
- Pisma ORM
