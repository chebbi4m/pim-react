import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { SignUp } from './pages/login-signup/signup'

function App() {
  return (
    <main className='main__container'>
      <SignUp/>
    </main>
    
  );
}

const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}

function MyButton() {
  
  const [count, setCount] = useState(0);
  
  function handleClick() {
    setCount(count + 1);
    let btn = document.getElementById("buttonnn");
    btn.classList.toggle("btnColor");
  }

  return (
    <button id='buttonnn' onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

function RegisterPage() {

  return(
    <div className='register__section'>
      <div className='register__container'>
        <div className='register__title'>Register Now</div>
        <div className='r__username__container'>
          <div className='r__text r__username__text'>username :</div>
          <div className='r__input r__username__input'></div>
        </div>
        <div className='r__email__container'>
          <div className='r__text r__email__text'> email :</div>
          <div className='r__input r__email__input'></div>
        </div>
        <div className='r__password__container'>
          <div className='r__text r__password__text'>password :</div>
          <div className='r__input r__password__input'></div>
        </div>
        <div className='r__cpassword__container'>
          <div className='r__text r__cpassword__text'>confirm the password :</div>
          <div className='r__input r__cpassword__input'></div>
        </div>
      </div>
      
    </div>
    
  );

}


export default App;
