import './App.css';

// layout
import Header from './components/header/Header';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);


function App() {
    return (
        <div className="App">
            <div className={'headerContent'}/>
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}

export default App;
