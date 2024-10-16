import logo from '../img/flocon-neige-icone-temps-ensoleille.png';

function Header() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Bienvenue sur votre App météo</p>
      </header>
    </div>
  );
}

export default Header;