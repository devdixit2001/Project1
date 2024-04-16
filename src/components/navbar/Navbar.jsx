import "./Navbar.css"

const Navbar = () => {
  return (
   <div className="navbar">
    <div className="navContainer"> {/* in this logo or the name of app written */}
      <span className="logo">Stay Station</span>
      <div className="navItems">
        <button className="navButton">Register</button>
        <button className="navButton">Login</button>
      </div>
    </div>
   </div>
  )
}

export default Navbar
