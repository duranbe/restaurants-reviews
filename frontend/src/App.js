import './App.css';

function NavBar() {

  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-2 bg-gray-100 font-semibold">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-3 ">
          <a className="flex items-center" href="/">
            CookReview
          </a>
      </div>
    </nav>
  )
}

function App() {
  return (
    <div className="mx-5">
      <NavBar />
    </div>
  );
}

export default App;
