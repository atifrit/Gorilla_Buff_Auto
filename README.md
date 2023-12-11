# Gorilla_Buff_Auto

GorillaBuff Website: https://gorilla-buff-auto.onrender.com

# Description:

   Canaryhood is a full-stack web application inspired by Robinhood. It is designed to be a simulation of a stock trading platform that allows users to manage investments, track a portfolio, and keep tabs on stocks of interest.

# Features:

   User Authentication:

      Gorilla Buff protects the security of accounts registered with it by encrypting and securing passwords to offer security to users signing up. A demo user is also available to allow exploration of the site. Users must be logged in to access features such as bookings, transactions, and cars.

   Bookings:

      - User can create bookings.
      - User can view past and future bookings on the bookings page.
      - User can delete bookings by requesting a refund.
      - User can update bookings on the page for a given booking.
      - User can add funds to their balance.
      - User can withdraw funds from their balance.

   Transactions:


      - User can create transactions with different payment methods
      - User can update the payment method for past transactions
      - User can view their transaction history on their profile page
      - User can add funds to their balance.
      - User can withdraw funds from their balance.
      - When selecting the account balance option, funds will be added or removed from the account balance.

   Cars:

      - User can add cars to their account.
      - User can view their car details on the profile page.
      - User can update the details of their cars.
      - User can remove cars from their account.



# Technlogies:

- Frontend:
   - Redux
   - React
   - Javascript
   - CSS
   - HTML

- Backend:
   - Flask
   - Python


# Screenshots:
   - User Details:
      <img alt="user-details" src="">
   - Bookings Page:
      <img alt="bookings-page" src="">

# Technical Implementation:

   Gorilla Buff Auto allows customers to book appointments for different services on different types of cars. It was important to ensure that the user could refund bookings, and update their associated transactions to ensure they are only paying for what they want.

# Installation Instructions:

   - install dependencies:
      ```bash
         pipenv install -r requirements.txt
      ```

   - Create a .env file using the provided .envexample file.
   - Run the following commands in the terminal to setup the database and run the backend server:
      ```bash
         pipenv run flask db upgrade
      ```
      ```bash
         pipenv run flask seed all
      ```
      ```bash
         pipenv run flask run
      ```
   - In another terminal enter the react-app directory and run the following command to run the frontend:
      ```bash
         npm start
      ```

# Future Plans:

   - Google Maps API
   - improve sitewide style.

# Contributors:
   Adam Tifrit
   https://github.com/atifrit
