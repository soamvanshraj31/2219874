# Campus Hiring URL Shortener Microservice

## Overview
This project is a full-stack HTTP URL Shortener Microservice built for a campus hiring evaluation. It includes:
- A custom logging middleware
- Node.js + Express backend
- React + Material UI frontend

## Folder Structure
```
/Logging Middleware
/Backend Test Submission
/Frontend Test Submission
```

## Features
- Shorten URLs with optional custom shortcode and validity
- Redirect to original URLs
- Track and display analytics for each short URL
- Custom logging to a remote server

## Setup Instructions

### 1. Backend
```
cd "2219874/Backend Test Submission"
npm install
npm start
```
- Runs on [http://localhost:5000](http://localhost:5000)

### 2. Frontend
```
cd "2219874/Frontend Test Submission"
npm install
npm start
```
- Runs on [http://localhost:3000](http://localhost:3000)

### 3. Logging Middleware
- Used internally by both backend and frontend for logging events.

## Usage

### Shorten a URL
- Go to [http://localhost:3000/](http://localhost:3000/)
- Enter a long URL, validity (optional), and shortcode (optional)
- Click "Shorten URLs" to generate a short link

### View Statistics
- Go to [http://localhost:3000/stats](http://localhost:3000/stats)
- Enter a shortcode to view analytics

## Example API URLs
- **Shorten URL (POST):** `http://localhost:5000/shorturls`
- **Redirect:** `http://localhost:5000/<shortcode>`
- **Stats (GET):** `http://localhost:5000/shorturls/<shortcode>`

## Example Inputs
| URL                        | Validity (min) | Shortcode   |
|----------------------------|----------------|-------------|
| https://www.google.com     |                |             |
| https://www.wikipedia.org  | 60             |             |
| https://www.github.com     |                | mygithub    |
| https://www.notion.so      | 10             | notes2024   |
| https://www.example.com    | 5              | ex5         |

## Screenshots

### 1. URL Shortener Page – Single URL
![Single URL Shortener](./Frontend%20Test%20Submission/screenshots/1_url_shortener.png)

### 2. URL Shortener Page – Five URLs
![Five URLs Shortener](./Frontend%20Test%20Submission/screenshots/5_url_shortener.png)

### 3. URL Shortener Page – Empty Field Error
![Empty Field Error](./Frontend%20Test%20Submission/screenshots/empty_field.png)

### 4. URL Shortener Page – Invalid URL Error
![Invalid URL Error](./Frontend%20Test%20Submission/screenshots/invalid_url.png)

### 5. Statistics Page – No Clicks
![Statistics Page No Clicks](./Frontend%20Test%20Submission/screenshots/short_url_statistics_1.png)

### 6. Statistics Page – With Click Details
![Statistics Page With Click Details](./Frontend%20Test%20Submission/screenshots/short_url_statistics_with_location.png)

---

