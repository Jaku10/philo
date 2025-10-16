# philo 📚

> *"The unexamined life is not worth living."* — Socrates

A beautiful, minimal daily philosophy quoting app designed for mental health and motivation. Get inspired with wisdom from philosophers throughout history in a clean, distraction-free interface.

![philo App](https://via.placeholder.com/800x400/faf8f5/4a4a4a?text=philo+-+Daily+Philosophy+Quotes)

## ✨ Features

- **📖 50+ Philosophical Quotes**: Curated collection from Socrates, Aristotle, Buddha, Camus, and more
- **❤️ Favorites System**: Save quotes you love with persistent localStorage
- **📊 Daily Counter**: Track your daily reading progress (auto-resets at midnight)
- **📤 Share Quotes**: One-click clipboard copy for sharing anywhere
- **📱 Responsive Design**: Beautiful on desktop, tablet, and mobile
- **🎨 Minimal UI**: Clean, warm design focused on calm and reflection

## 🚀 Live Demo

**[Try philo live on GitHub Pages →](https://jaku10.github.io/philo)**

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: CSS3 with modern features
- **Storage**: localStorage for persistence
- **Deployment**: GitHub Pages
- **Icons**: Custom SVG icons

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jaku10/philo.git
   cd philo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🎯 Key Features Deep Dive

### Daily Quote Generation
- Random selection from 50+ curated philosophical quotes
- Smooth transitions and animations
- Instant loading with no API dependencies

### Favorites Management
- Heart/unheart quotes with visual feedback
- Dedicated favorites view with remove functionality
- Persistent storage across browser sessions

### Daily Progress Tracking
- Automatic counter increment on each new quote
- Midnight reset functionality
- Visual progress indicator

### Share Functionality
- One-click clipboard copy
- Properly formatted quote text with attribution
- Cross-platform compatibility

## 🎨 Design Philosophy

philo was designed with mental health and mindfulness in mind:

- **Warm Color Palette**: Cream and coral tones for calm, peaceful experience
- **Minimal Interface**: Reduces cognitive load and distractions
- **Typography**: Clean, readable fonts optimized for reflection
- **Spacing**: Generous whitespace for breathing room
- **Micro-interactions**: Subtle animations that enhance rather than distract

## 📱 Responsive Design

- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Optimized touch interactions
- **Mobile**: Streamlined interface with thumb-friendly buttons

## 🔧 Customization

### Adding New Quotes
Edit `src/quotes.js` to add more philosophical quotes:

```javascript
{
  id: 51,
  text: "Your new quote here",
  author: "Philosopher Name",
  source: "Source/Work"
}
```

### Styling Changes
Modify `src/App.css` to customize colors, fonts, and layout.

## 📈 Performance

- **Fast Loading**: No external dependencies or APIs
- **Offline Ready**: Works without internet connection
- **Lightweight**: Minimal bundle size
- **Smooth Animations**: 60fps transitions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Quotes from philosophers throughout history
- React community for excellent documentation
- Design inspiration from minimal, mindful interfaces

---

**Built with ❤️ for mental health and daily inspiration**

*"The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion."* — Albert Camus
