import React, { useState, useEffect } from 'react';
import './App.css';
import { quotes } from './quotes';

function App() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [previousQuote, setPreviousQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [dailyCount, setDailyCount] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('philo-favorites');
    const savedCount = localStorage.getItem('philo-daily-count');
    const lastResetDate = localStorage.getItem('philo-last-reset');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    if (savedCount && lastResetDate) {
      const today = new Date().toDateString();
      if (lastResetDate === today) {
        setDailyCount(parseInt(savedCount));
      } else {
        // Reset counter for new day
        setDailyCount(0);
        localStorage.setItem('philo-daily-count', '0');
        localStorage.setItem('philo-last-reset', today);
      }
    } else {
      // First time user
      const today = new Date().toDateString();
      localStorage.setItem('philo-last-reset', today);
    }
  }, []);

  // Check if current quote is favorited
  useEffect(() => {
    setIsFavorite(favorites.some(fav => fav.id === currentQuote.id));
  }, [currentQuote, favorites]);

  const getRandomQuote = () => {
    // Store current quote as previous before changing
    setPreviousQuote(currentQuote);
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
    
    // Increment daily counter
    const newCount = dailyCount + 1;
    setDailyCount(newCount);
    localStorage.setItem('philo-daily-count', newCount.toString());
  };

  const goToPreviousQuote = () => {
    if (previousQuote) {
      setCurrentQuote(previousQuote);
      setPreviousQuote(null); // Clear previous quote after going back - button will disappear
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== currentQuote.id);
      setFavorites(updatedFavorites);
      localStorage.setItem('philo-favorites', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, currentQuote];
      setFavorites(updatedFavorites);
      localStorage.setItem('philo-favorites', JSON.stringify(updatedFavorites));
    }
  };

  const copyToClipboard = async () => {
    const quoteText = `"${currentQuote.text}" — ${currentQuote.author} (${currentQuote.source})`;
    try {
      await navigator.clipboard.writeText(quoteText);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const removeFavorite = (quoteId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== quoteId);
    setFavorites(updatedFavorites);
    localStorage.setItem('philo-favorites', JSON.stringify(updatedFavorites));
  };

  if (showFavorites) {
    return (
      <div className="app">
        <div className="header">
          <h1 className="app-title">philo</h1>
        </div>
        
        <div className="favorites-container">
          <div className="favorites-header">
            <h2>Your Favorite Quotes</h2>
            <button 
              className="back-button"
              onClick={() => setShowFavorites(false)}
            >
              ← Back to Quotes
            </button>
          </div>
          
          {favorites.length === 0 ? (
            <div className="empty-favorites">
              <p>No favorite quotes yet. Start exploring and heart the ones you love!</p>
            </div>
          ) : (
            <div className="favorites-list">
              {favorites.map((quote) => (
                <div key={quote.id} className="favorite-quote-card">
                  <div className="quote-content">
                    <p className="quote-text">"{quote.text}"</p>
                    <p className="quote-author">— {quote.author}</p>
                    <p className="quote-source">({quote.source})</p>
                  </div>
                  <button 
                    className="remove-favorite-btn"
                    onClick={() => removeFavorite(quote.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <h1 className="app-title">philo</h1>
      </div>
      
      <div className="main-content">
        <div className="quote-card">
          <div className="quote-indicator"></div>
          <button 
            className="view-favorites-btn"
            onClick={() => setShowFavorites(true)}
          >
            View Favorites
          </button>
          
          <div className="quote-content">
            <p className="quote-text">"{currentQuote.text}"</p>
            <p className="quote-author">— {currentQuote.author}</p>
            <p className="quote-source">({currentQuote.source})</p>
          </div>
        </div>
        
        <div className="quote-navigation">
          {previousQuote && (
            <button 
              className="previous-quote-btn"
              onClick={goToPreviousQuote}
              title="Go back to previous quote"
            >
              ←
            </button>
          )}
          
          <button className="new-thought-btn" onClick={getRandomQuote}>
            New Thought
          </button>
        </div>
        
        <div className="action-buttons">
          <button 
            className={`action-btn favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
          
          <div className="counter-btn">
            Read Today: {dailyCount}
          </div>
          
          <button className="action-btn share-btn" onClick={copyToClipboard}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
