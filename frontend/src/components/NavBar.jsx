
export default function NavBar() {

    return (
      <nav className="font-clash-bold border-none relative w-full flex flex-wrap 
      items-center justify-between pt-2 bg-orange-50">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-3 ">
          <a className="flex items-center text-2xl" href="/">
            CookReview
          </a>
          <a className="font-serif text-md bg-tangerine-light px-3 rounded-xl text-slate-800" href="/favorites">
          ★ Favorites
          </a>
        </div>
      </nav>
    )
  }