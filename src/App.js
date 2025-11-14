import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('technology');

  useEffect(() => {
    fetchNews();
  }, [searchTerm]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Using a mock API - replace with your preferred news API
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=10`
      );
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
      // Set mock data on error
      setArticles([
        { id: 1, title: 'Welcome to NewsPilot', body: 'Your news aggregation platform is ready!' },
        { id: 2, title: 'Getting Started', body: 'Configure your news API key to start fetching real articles.' },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📰 NewsPilot</h1>
        <p>Your Personal News Aggregator</p>
      </header>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchNews} className="search-button">
          Search
        </button>
      </div>

      <main className="news-container">
        {loading ? (
          <div className="loading">Loading news...</div>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <article key={article.id} className="article-card">
                <h2>{article.title}</h2>
                <p>{article.body}</p>
                <div className="article-footer">
                  <span className="read-more">Read more →</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 NewsPilot. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
