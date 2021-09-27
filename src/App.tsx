import InputSession from "./components/InputSession";
import ListSessions from "./components/ListSessions";
import Header from "./components/Header";
import Footer from "./components/Footer"
import SuggestionBox from "./components/Suggestions";
import "./css/style.css"

function App() {
  return (
    <section>
      <Header />
      <body className="body">
      <div className = "input">
        <InputSession />
      </div>
        <SuggestionBox />
        <ListSessions />
      </body>
      <Footer />
    </section>
  );
}

export default App;