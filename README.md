# Angular: HackerBank

## Environment 
- Angular CLI Version: 10.0.4
- Angular Core Version: 10.0.4
- Node Version: 14(LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/FGlur_Ov682QyDjcxduO-w/hackerbank.gif)

## Functionality Requirements

Implement the following functionalities:

- All transactions are initially displayed inside the table in the order they are retrieved from the source. The source is the getTransactions function in the record-table.component.ts file in the repository.

- Picking the date from the date input and pressing the `Filter` button should display all the records for that date in the table. If no date is chosen, the `Filter` button should not do anything.

- Clicking on the `Amount ($)` table header should sort the records in ascending order of amount. The behavior is the same for multiple clicks on `Amount ($)`.

Each transaction object contains the following properties : 
- `String` date: The date when the transaction took place in the format YYYY-MM-DD.
- `String` description: The description of the transaction.
- `Number` type: The type of transaction, where 0 denotes a credit transaction and 1 denotes a debit transaction.
- `Float` amount: The total amount of the transaction.
- `String` balance: The balance of the account after the transaction was completed, prefixed with a dollar sign ($).

```
  {
    "date": "2019-12-03",
    "description": "HACKERBANK INC. DES:CCD+ ID: 33375894749",
    "type": 0,
    "amount": 1985.4,
    "balance": "$12,234.45"
  }
```

## Testing Requirements

- The input to add the filter date should have the data-test-id attribute `app-input`.
- The `Filter` button should have the data-test-id attribute `submit-button`.
- The `Amount ($)` table header for sorting the data by amount should have the data-test-id attribute `amount`.
- The table body container `<tbody>`, which contains the record rows, should have the data-test-id attribute `records-body`.

## Project Specifications

**Read Only Files**
- src/app/app.component.spec.ts
- src/app/record-table/record-table.component.spec.ts

**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```
