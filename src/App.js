import React, { useState, useEffect } from 'react';
import { Heart, Share2, ArrowLeft, Trash2 } from 'lucide-react';

const quotes = [
  { text: "Bad men need nothing more to compass their ends, than that good men should look on and do nothing.", author: "John Stuart Mill", source: "Inaugural Address (paraphrase)" },
  { text: "First say to yourself what you would be; and then do what you have to do.", author: "Epictetus", source: "Discourses" },
  { text: "Don't explain your philosophy. Embody it.", author: "Epictetus", source: "Enchiridion" },
  { text: "Begin at once to live, and count each separate day as a separate life.", author: "Seneca", source: "Letters to Lucilius" },
  { text: "If a man knows not to which port he sails, no wind is favorable.", author: "Seneca", source: "Letters to Lucilius" },
  { text: "Be as you wish to seem.", author: "Socrates", source: "Fragments" },
  { text: "Contentment is natural wealth, luxury is artificial poverty.", author: "Socrates", source: "Fragments" },
  { text: "Courage is knowing what not to fear.", author: "Plato", source: "Republic" },
  { text: "Opinion is the medium between knowledge and ignorance.", author: "Plato", source: "Republic" },
  { text: "Hope is a waking dream.", author: "Aristotle", source: "Fragments" },
  { text: "Happiness depends upon ourselves.", author: "Aristotle", source: "Nicomachean Ethics" },
  { text: "The man who moves a mountain begins by carrying away small stones.", author: "Confucius", source: "Analects" },
  { text: "To see what is right and not do it is want of courage.", author: "Confucius", source: "Analects" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu", source: "Tao Te Ching" },
  { text: "When you are content to be simply yourself and don't compare or compete, everybody will respect you.", author: "Lao Tzu", source: "Tao Te Ching" },
  { text: "Flow with whatever may happen, and let your mind be free.", author: "Zhuangzi", source: "Zhuangzi" },
  { text: "The mind is everything. What you think you become.", author: "Buddha", source: "Dhammapada (attributed)" },
  { text: "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.", author: "Buddha", source: "Dhammapada (attributed)" },
  { text: "All is possible when emptiness is possible. Nothing is possible when emptiness is impossible.", author: "Nagarjuna", source: "Mulamadhyamakakarika" },
  { text: "To live without philosophizing is in truth the same as keeping the eyes closed without attempting to open them.", author: "Descartes", source: "Principles of Philosophy" },
  { text: "Peace is not an absence of war, it is a virtue, a state of mind.", author: "Spinoza", source: "Ethics (paraphrase)" },
  { text: "A wise man proportions his belief to the evidence.", author: "Hume", source: "Enquiries" },
  { text: "Happiness is not an ideal of reason but of imagination.", author: "Kant", source: "Critique of Practical Reason" },
  { text: "Life is not a problem to be solved, but a reality to be experienced.", author: "Kierkegaard", source: "Journals" },
  { text: "Become who you are.", author: "Nietzsche", source: "Thus Spoke Zarathustra (paraphrase)" },
  { text: "There are no beautiful surfaces without a terrible depth.", author: "Nietzsche", source: "Beyond Good and Evil" },
  { text: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James", source: "Talks to Teachers" },
  { text: "To conquer fear is the beginning of wisdom.", author: "Bertrand Russell", source: "Wisdom of the West (paraphrase)" },
  { text: "The limits of my language mean the limits of my world.", author: "Wittgenstein", source: "Tractatus Logico-Philosophicus" },
  { text: "Every man is born as many men and dies as a single one.", author: "Heidegger", source: "Paraphrase" },
  { text: "Commitment is an act, not a word.", author: "Sartre", source: "Situations" },
  { text: "Live to the point of tears.", author: "Camus", source: "Notebooks" },
  { text: "Change your life today.", author: "Simone de Beauvoir", source: "The Second Sex (paraphrase)" },
  { text: "For love of the world.", author: "Hannah Arendt", source: "The Human Condition (paraphrase)" },
  { text: "I don't write a book so that it will be the final word; I write a book so that other books are possible.", author: "Foucault", source: "Interview" },
  { text: "To pretend, I actually do the thing: I have therefore only pretended to pretend.", author: "Derrida", source: "Parergon" },
  { text: "Liberty can be restricted only for the sake of liberty.", author: "Rawls", source: "A Theory of Justice" },
  { text: "There are only individual people, different individual people, with their own individual lives.", author: "Nozick", source: "Anarchy, State, and Utopia" },
  { text: "You have to love your country like an adult loves somebody.", author: "Martha Nussbaum", source: "Interview" },
  { text: "Pain is pain, and the importance of preventing it does not depend on the race, sex, or species of the victim.", author: "Peter Singer", source: "Practical Ethics" }
];

export default function Philo() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [readCount, setReadCount] = useState(0);
  const [lastResetDate, setLastResetDate] = useState(new Date().toDateString());
  const [copied, setCopied] = useState(false);

  // Load saved favorites and daily count
  useEffect(() => {
    const saved = localStorage.getItem('philoFavorites');
    if (saved) setFavorites(JSON.parse(saved));

    const savedCount = localStorage.getItem('philoReadCount');
    const savedDate = localStorage.getItem('philoLastResetDate');
    const today = new Date().toDateString();

    if (savedDate === today && savedCount) {
      setReadCount(parseInt(savedCount));
    } else {
      setReadCount(0);
      localStorage.setItem('philoLastResetDate', today);
      localStorage.setItem('philoReadCount', '0');
    }
    setLastResetDate(today);
  }, []);

  // Reset read count each day
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastResetDate !== today) {
      setReadCount(0);
      setLastResetDate(today);
      localStorage.setItem('philoLastResetDate', today);
      localStorage.setItem('philoReadCount', '0');
    }
  }, [lastResetDate]);

  const getNewQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
    const newCount = readCount + 1;
    setReadCount(newCount);
    localStorage.setItem('philoReadCount', newCount.toString());
  };

  // Toggle favorites and persist them
  const toggleFavorite = (quote = currentQuote) => {
    const isFavorited = favorites.some(fav => fav.text === quote.text);
    const newFavorites = isFavorited
      ? favorites.filter(fav => fav.text !== quote.text)
      : [...favorites, quote];
    setFavorites(newFavorites);
    localStorage.setItem('philoFavorites', JSON.stringify(newFavorites));
  };

  const isFavorited = (quote = currentQuote) =>
    favorites.some(fav => fav.text === quote.text);

  const shareQuote = () => {
    const text = `"${currentQuote.text}"\n\n— ${currentQuote.author}${currentQuote.source ? `\n(${currentQuote.source})` : ''}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Favorites Page ---
  if (showFavorites) {
    return (
      <div className="min-h-screen bg-[#FBF7F4] flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold" style={{ color: '#8B4513' }}>Philo</h1>
              <div className="flex justify-center mt-2">
                <div className="w-6 h-3 bg-[#D97A66] rounded-full"></div>
              </div>
            </div>
            <button
              onClick={() => setShowFavorites(false)}
              className="px-6 py-3 rounded-full border transition-colors flex items-center gap-2 font-medium"
              style={{
                borderColor: '#D97A66',
                color: '#8B4513',
                backgroundColor: 'white'
              }}
            >
              <ArrowLeft className="w-4 h-4 text-[#D97A66]" />
              Back to Home
            </button>
          </div>

          <div className="bg-[#F5EBE0] rounded-3xl p-8 min-h-[400px]">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: '#8B4513' }}>Your Favorites</h2>
            {favorites.length === 0 ? (
              <p className="text-center py-12 text-[#A0826D]">No favorites yet. Save quotes you love!</p>
            ) : (
              <div className="space-y-4">
                {favorites.map((quote, index) => (
                  <div key={index} className="bg-[#FBF7F4] rounded-2xl p-6 relative group">
                    <p className="text-lg mb-3 pr-8" style={{ color: '#6B4423' }}>"{quote.text}"</p>
                    <p className="text-sm font-medium" style={{ color: '#8B4513' }}>— {quote.author}</p>
                    {quote.source && <p className="text-xs mt-1" style={{ color: '#A0826D' }}>({quote.source})</p>}
                    <button
                      onClick={() => toggleFavorite(quote)}
                      className="absolute top-4 right-4 p-2 hover:bg-red-100 rounded-full transition-colors"
                      title="Delete from favorites"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- Home Page ---
  return (
    <div className="min-h-screen bg-[#FBF7F4] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold" style={{ color: '#8B4513' }}>Philo</h1>
            <div className="flex justify-center mt-2">
              <div className="w-6 h-3 bg-[#D97A66] rounded-full"></div>
            </div>
          </div>
          <button
            onClick={() => setShowFavorites(true)}
            className="px-6 py-3 rounded-full border transition-colors text-sm font-medium"
            style={{
              borderColor: '#D97A66',
              color: '#8B4513',
              backgroundColor: 'white'
            }}
          >
            View Favorites
          </button>
        </div>

        <div className="bg-[#F5EBE0] rounded-3xl p-12 mb-6 min-h-[400px] flex flex-col justify-center">
          <div className="mb-8">
            <span className="inline-block w-3 h-3 bg-[#D97A66] rounded-full"></span>
          </div>
          <blockquote className="mb-8">
            <p className="text-2xl leading-relaxed mb-6" style={{ color: '#6B4423' }}>
              "{currentQuote.text}"
            </p>
            <footer className="text-base">
              <p className="font-semibold" style={{ color: '#8B4513' }}>— {currentQuote.author}</p>
              {currentQuote.source && (
                <p className="text-sm mt-1" style={{ color: '#A0826D' }}>({currentQuote.source})</p>
              )}
            </footer>
          </blockquote>
        </div>

        <button
          onClick={getNewQuote}
          className="w-full py-4 rounded-full text-base font-medium transition-colors mb-4 shadow-sm"
          style={{
            backgroundColor: '#D97A66',
            color: 'white'
          }}
        >
          New Thought
        </button>

        <div className="flex items-center justify-between px-2">
          <button
            onClick={() => toggleFavorite()}
            className="px-6 py-3 rounded-full border transition-colors bg-white"
            style={{
              borderColor: '#D97A66',
              color: '#8B4513'
            }}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorited()
                  ? 'fill-[#D97A66] text-[#D97A66]'
                  : 'text-[#D97A66]'
              }`}
            />
          </button>

          <div
            className="text-center px-6 py-3 rounded-full border"
            style={{
              borderColor: '#D97A66',
              backgroundColor: 'white',
              color: '#8B4513'
            }}
          >
            <p className="font-medium text-sm">Read Today: {readCount}</p>
          </div>

          <button
            onClick={shareQuote}
            className="px-6 py-3 rounded-full border transition-colors bg-white relative"
            style={{
              borderColor: '#D97A66',
              color: '#8B4513'
            }}
          >
            <Share2 className="w-5 h-5 text-[#D97A66]" />
            {copied && (
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#8B4513] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}