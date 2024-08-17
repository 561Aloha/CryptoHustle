

```markdown
# Bitcoin Price Tracker

This project is a simple cryptocurrency price tracker that displays real-time information for Bitcoin. It fetches data from the CryptoCompare API and displays various details about Bitcoin, including its price, market cap, launch date, and more. This application was built using React and React Router.

## Video Walkthrough

## Features

- **Real-time Price Updates**: Get the latest price for Bitcoin in USD.
- **Coin Details**: View detailed information about Bitcoin, including the launch date, algorithm, whitepaper, and more.
- **Routing**: Navigate between the homepage and detailed coin pages using React Router.

## Tech Stack

- **React**: Frontend framework for building the UI components.
- **React Router**: Handles routing for navigating between pages.
- **CryptoCompare API**: Used to fetch real-time cryptocurrency data.
- **CSS**: Custom styling for the components.

## Project Setup

To run this project locally, follow the steps below:

### Prerequisites

- Node.js (version 14 or later)
- npm (or yarn)
```

1. Clone the repository:

   ```bash
   git clone https://github.com/561Aloha/bitcoin-price-tracker.git
   ``````

2. Navigate to the project directory:

   ```bash
   cd bitcoin-price-tracker
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and add your CryptoCompare API key:

   ```bash
   VITE_APP_API_KEY=your_api_key_here
   ```

5. Run the application:

   ```bash
   npm run dev
   ```

6. Open your browser and visit `http://localhost:3000`.

## Usage

- The homepage lists Bitcoin with its current price.
- Clicking on Bitcoin will take you to a detailed page with more information, including market cap, algorithm, whitepaper link, and more.

## Folder Structure

```
├── src
│   ├── components
│   │   ├── CoinInfo.jsx
│   │   └── CoinDetail.jsx
│   ├── routes
│   │   ├── Layout.jsx
│   │   └── DetailView.jsx
│   ├── App.jsx
│   └── index.jsx
├── public
│   └── index.html
└── package.json
```

## API Used

- **CryptoCompare API**: Provides real-time cryptocurrency prices and metadata.

For more details, visit [CryptoCompare API documentation](https://min-api.cryptocompare.com/).

## License

This project is licensed under the MIT License.
```

Feel free to customize the content as needed!
