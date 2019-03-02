Logic - Users will be able to click buttons to add pre-stored food items to their "ate" display. Or, they can enter a custom item and calorie amount. They can then submit their totals to be stored as a "Day" into the database for storage.

**Front End: React** 
- Containers:
  - TotalsDisplay: shows items eaten, number of that item eaten, and total calories (displays day.itemsEaten)
- Components:
  - Food Buttons: bagel, apple, banana, cup noodle, taki, welch's, Hidden Valley granola bar, etc.
  - Log Day: adds totals to database

**Back End**
- will be displayed on port 8888
- get requests to root will be main display
- Stretch: redirect to different page to view all logs?

**Database**
- MongoDB Atlas for management


**Structure**
-Clicking a food button will:
  > update totalCalories in day
  > add item to day.itemsEaten
  > if item already exists, increment item 

- Individual Food Items: 
{
  name: 'bagel',
  calories: '100'
}

- Day: 
{
  date: '3-6-2019',
  totalCalories: 1350,
  itemsEaten: {
    bagel: 2,
    welchs: 4,
    cupNoodle: 1
  }
}
