import BookContentProvider from "./contexts/BookContext";
import Navbar from "./components/Navbar";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

function App() {
  return (
    <div className="App">
      <BookContentProvider>
          <Navbar>
          </Navbar>
          <BookList></BookList>
          <BookForm></BookForm>
      </BookContentProvider>
    </div>
  );
}

export default App;
