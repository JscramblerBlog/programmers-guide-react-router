import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';

interface AppState {
  stocks: Array<StockState>
}

interface StockState {
  name: string;
  symbol: string;
  description: string;
  value: number;
}

interface StockProps extends StockState {
}

const StockComponent: React.FC<StockProps> =
  ({name, symbol, value, description}) =>
  <>
    <p style={{textAlign: "left"}}>
      {name} <br />
      Symbol: {symbol} <br />
      Value: ${value}
    </p>

    <p style={{textAlign: "justify", margin: "1em 2em"}}>
      {description}
    </p>
  </>;

class App extends Component<{}, AppState> {
  state: AppState = {
    stocks: []
  };

  async componentDidMount() {
    const payload = await fetch('/stocks.json');
    const data: Array<StockState> = await payload.json();

    this.setState({stocks: data});
  }

  render() {
    const links = this.state.stocks.map(s =>
      <NavLink to={"/" + s.symbol}
        key={s.symbol}
        className="App-link" style={{marginRight: "1em"}}
        activeStyle={{color: "white", textDecorationLine: "none"}}>
        {s.symbol}
      </NavLink>);

    const routes = this.state.stocks.map(s =>
      <Route key={s.symbol} path={"/" + s.symbol}
        render={() => <StockComponent {...s} />} />);

    return (
      <div className="App">
        <header className="App-header">

          <BrowserRouter>
            <p>
              {links}
            </p>
            <Switch>
              {routes}
            </Switch>
          </BrowserRouter>

          <p style={{position: "absolute", bottom: 0}}>
            Programmer’s Guide to React Router
          </p>
        </header>
      </div>
    );
  }
}

export default App;
