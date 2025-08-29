# Weather App

A simple weather application built with React, TypeScript, and Vite. The app allows users to search for current weather information by city, displaying temperature, weather conditions, and other relevant data in a clean and responsive interface.

## Features

- Search for weather by city name
- Display current temperature, weather description, humidity, and wind speed
- Responsive design for desktop and mobile
- Error handling for invalid city names or network issues

## Technologies Used

- **React**: UI library for building interactive user interfaces
- **TypeScript**: Strongly typed JavaScript for safer and more maintainable code
- **Vite**: Fast development build tool with hot module replacement
- **ESLint**: Linting for code quality and consistency
- **OpenWeatherMap API**: Source for real-time weather data

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add your OpenWeatherMap API key:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
src/
  components/    # Reusable React components
  hooks/         # Custom React hooks
  services/      # API calls and utilities
  App.tsx        # Main application component
  main.tsx       # Entry point
```

## License

This project is licensed under the MIT License.
