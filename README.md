On 14/09/2023 @Suresh Mali sir gave a new assignment as follows:
- Create a database and backend configuration using PostgreSQL and Node JS with roles for Admin, State Coordinator, District Coordinator, and Village Coordinator. 
- Each level coordinator should have access and authority to view data according to their role.
- Admin should be able to view and change data of roles.
- There can be one or multiple coordinators at each level.
- State coordinators must be able to see all the districts from their respective states and should be able to assign only the District coordinators. 
- District coordinators must be able to see all the villages from their respective districts and should be able to assign only the Village coordinators.
- Only the Village coordinator is able to submit the villager's info form.
- There may be a possibility that the village coordinator will create and submit a form from a mobile phone while offline, so implement 4 separate timestamps -
    - Mobile CreatedAt - When submitting a newly created from offline mode through mobile.
    - Mobile UpdatedAt - When updating an existing record from offline mode through mobile.
    - Web CreatedAt - When creating a new form through a web portal or when synced records that were created while offline through mobile. 
    - Web UpdatedAt - When updating an existing record through a web portal or when synced records that were updated in offline mode through mobile.
- Create a basic dashboard that will be able to view the data according to the role that has signed in.
- Perform a user authentication with email/mobile and password, and also give a phone number-based OTP option when a user forgets the password.
- Also, maintain a user session via cookies and use JWT for secure token transfers.


## File Structure

## Doubts:
1. what's the need of making custom create function from CRUD operations, as we can define the middlewares in the index.js itself --> to practice DRY while combining and customizing controllers by extracting common functions that involve while performing CRUD operations 
2. explain require(anything)(Sequelize, sequelize)? --> this is because from **anything** we are exporting a function that gets invoked right here, and next brackets are the params that it accepts.
3. what is the need of sending timestamp to client on every error occurred while performing operations on db? 