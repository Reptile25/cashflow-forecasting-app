# .

This is a Vue.js project that is to calculate a Companies Cashflow forecasting for a given period.

## Project Setup

1. Install Docker and Docker-Compose
2. Clone the repository
```git
git clone https://github.com/Reptile25/cashflow-forecasting-app.git
```

3. Go to the project root directory and run the following commands
### Docker

1. Build the docker image
```sh
docker-compose up --build
```

### NPM
1. Install dependencies
```sh
npm install
```
2. Run the application in development mode
```sh
npm run dev
```

You can access the application at http://localhost:5173/ once development server is running.

## Features
The project is built using Vue3 and has all the following features:
- A form to add recurring income and expenses (e.g. daily, weekly, monthly)
- Calculate and display the projected cashflow for N months
- Allow the user to adjust N Months

Bonus Requirements:
- Add support for a multi-entity hierarchy with consolidated reporting (having a Company that has each cashflow and calculating the cashflow for each entity)
- Support inter-entity transfers (transfer cashflow from one company to another)

## Content Used
- Vue Router that has different views for different sections using `MainLayout.vue` as the parent component with children components
  - `CashflowList.vue` => Displays the company cashflow data and also shows the cashflow forecast for the given period
  - `CashflowForm.vue` => Form to add cashflow for each company based on income and expenses
  - `CashflowTransferForm.vue` => A from that transfers cashflow from one company to another
- Small CSS assets that make the UI look much better
- Added Pinia to have a store that will store the cashflow data when moving between views
- TypeScript used throughout the project and strongly typed
- Used `Vueuse` library to store cashflow data via the local storge so when the user refreshes the page, the data is still there

## Future Improvements
- Hook up a backend that will store the cashflow data (change the actions to use an API)
- Currently, the monthly data is based on 30 days, not date values for each month projections
- Add a production docker image that will build the application and also build distributions
- Add a CI/CD pipeline that will handle using the built docker image and deploying it to a server
- Add unit testing


