import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import React from 'react';
import { useNavigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// import React from 'react';

const Header = () => (
  <header className="bg-ethosBlue text-ethosWhite p-4 flex justify-between items-center">
    <img src="/logo.png" alt="ETHOS Logo" className="h-8" />
    <div>
      <button className="bg-white text-ethosBlue px-4 py-2 rounded">Sign In</button>
      <button className="ml-2 bg-white text-ethosBlue px-4 py-2 rounded">Sign Up</button>
    </div>
  </header>
);

export { Header };

const Buttons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-10">
      <button
        onClick={() => navigate('/upload')}
        className="bg-ethosBlue text-ethosWhite px-6 py-3 rounded mb-4"
      >
        UPLOAD DOC
      </button>
      <button
        onClick={() => navigate('/previewdoc')}
        className="bg-ethosBlue text-ethosWhite px-6 py-3 rounded mb-4"
      >
        PREVIEW DOC
      </button>
      <button
        onClick={() => navigate('/paymentportal')}
        className="bg-ethosBlue text-ethosWhite px-6 py-3 rounded"
      >
        PAYMENT PORTAL
      </button>
    </div>
  );
};

export default Buttons;
