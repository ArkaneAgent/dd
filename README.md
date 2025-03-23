# Prompt Tinder

A dating app for matching people based on their AI style, creativity, and similar interests.

## Overview

Prompt Tinder is a web application that mimics the functionality of the Tinder dating app but focuses on connecting people based on their AI prompt styles, shared interests, and Solana tokens they hold. Users can swipe left or right on profiles, match with others who have also swiped right on them, and chat with their matches.

## Features

- **User Authentication**: Sign up and login functionality with profile creation
- **Profile Management**: Users can create and edit their profiles with:
  - Full name
  - Username
  - Date of birth
  - Interests
  - Solana tokens they hold
  - AI style description
  - Profile picture
- **Swipe Interface**: Tinder-style swiping left (reject) or right (like)
- **Matching System**: When two users swipe right on each other, a match is created
- **Real-time Chat**: Chat functionality for matched users

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Storage**: Local Storage (client-side)
- **Dependencies**: Font Awesome for icons

## How to Use

1. **Setup**:
   - Simply open the `diggr.html` file in a modern web browser
   - The app works entirely client-side and doesn't require a server

2. **Sign Up**:
   - Create an account with your details
   - Add your AI style, interests, and Solana tokens

3. **Swipe**:
   - Browse through profiles and swipe right (like) or left (dislike)
   - You can swipe by clicking the buttons or using touch gestures on mobile

4. **Match**:
   - When you and another user both swipe right on each other, it's a match!
   - A match screen will appear allowing you to start chatting or continue swiping

5. **Chat**:
   - Access your matches through the chat icon in the navigation
   - Start conversations with your matches

## Data Storage

The app uses the browser's Local Storage to store:
- User accounts
- Profile information
- Swipe history
- Matches
- Chat messages

This means all data is stored locally on your device and will persist between sessions until you clear your browser data.

## Customization

- **Profile Pictures**: Replace the default profile picture (`default-profile.jpg`) with an actual image
- **Sample Profiles**: The app generates sample profiles for demonstration purposes

## Limitations

Since this is a demonstration app:
- All data is stored locally in the browser
- Profile pictures for demonstration profiles are loaded from Unsplash URLs
- In a real production app, you would want to implement server-side storage and authentication

## Future Improvements

- Server-side implementation for user data
- Real user authentication
- Integration with Solana wallet for token verification
- Push notifications for new matches and messages
- Expanded profile options and preference settings

## File Structure

- `diggr.html` - Main HTML file containing the app structure
- `styles.css` - CSS styling for the app
- `app.js` - JavaScript containing all the app functionality
- `default-profile.jpg` - Default profile image for users who don't upload a photo

## Credits

- Icons from [Font Awesome](https://fontawesome.com/)
- Sample profile images from [Unsplash](https://unsplash.com/) 