import { useState } from 'react';
import { fetchCouncil } from './api';
import './App.css';

// A shimmering card component that reveals its content on click
const CouncilCard = ({ persona }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div 
      className={`card ${persona.is_wildcard ? 'wildcard-card' : ''}`}
      onClick={() => setRevealed(true)}
    >
      <div className={`card-blur-overlay ${revealed ? 'revealed' : ''}`}>
        <span className="reveal-text">
          {persona.is_wildcard ? 'Unleash Anomaly' : 'Reveal Perspective'}
        </span>
      </div>
      
      <div className={`card-content ${revealed ? 'revealed' : 'unrevealed'}`}>
        <div className="card-header">
          <h3 className="persona-name">{persona.name}</h3>
          <span className="persona-title">{persona.flavor}</span>
          {persona.intro && <div className="persona-intro">{persona.intro}</div>}
        </div>
        <div className="card-body">
          <p className="persona-advice">"{persona.advice_quote}"</p>
          <div className="persona-reasoning">
            <span className="reasoning-label">Deduction:</span> {persona.reasoning}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [councilData, setCouncilData] = useState(null);
  const [error, setError] = useState(null);

  const handleSummon = async () => {
    if (!situation.trim()) return;
    
    setLoading(true);
    setError(null);
    setCouncilData(null);

    try {
      const data = await fetchCouncil(situation);
      setCouncilData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const titans = councilData ? councilData.council.filter(c => !c.is_wildcard) : [];
  const wildcard = councilData ? councilData.council.find(c => c.is_wildcard) : null;

  return (
    <div className="app-container">
      <header>
        <h1>Alter-Ego</h1>
        <div className="subtitle">Borrow a better brain.</div>
      </header>

      {!councilData && (
        <div className="input-section">
          <div className="textarea-wrapper">
            <textarea
              placeholder="What's the situation? (e.g. 'I was offered a promotion, but it requires moving to a city I hate.')"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              disabled={loading}
            />
          </div>
          <button 
            className="summon-btn" 
            onClick={handleSummon}
            disabled={loading || !situation.trim()}
          >
            {loading ? 'Consulting the Void...' : 'Summon Council'}
          </button>
          
          {loading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <span>Aligning dimensions...</span>
            </div>
          )}

          {error && (
            <div style={{ color: 'var(--wildcard-red)', marginTop: '1rem', textAlign: 'center' }}>
              Error: {error}
            </div>
          )}
        </div>
      )}

      {councilData && (
        <div className="council-container">
          <div style={{ textAlign: 'center' }}>
             <div className="domain-badge">
               Domain Recognized: {councilData.situation_analysis}
             </div>
             <div style={{ marginBottom: '2rem' }}>
              <button 
                onClick={() => setCouncilData(null)} 
                style={{
                  background: 'transparent', 
                  border: '1px solid var(--accent-cyan)', 
                  color: 'var(--accent-cyan)', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
              >
                ← New Situation
              </button>
             </div>
          </div>

          <div className="council-grid">
            {titans.slice(0, 4).map((persona) => (
               <CouncilCard key={persona.id || persona.name} persona={persona} />
            ))}
          </div>

          {wildcard && (
            <div className="wildcard-card-wrapper">
               <CouncilCard persona={wildcard} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
