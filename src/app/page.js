import LoginForm from "./components.js/LoginForm";
import './styles/globals.scss'
import Image from 'next/image';
import logo from './images/wtvision-image.png'

export default function Home() {
  return (
    <>
      <div className="wtvision-logo">
        <Image src={logo} alt="wtvision" />
      </div>
      <div className="signup-container">
        <LoginForm />
      </div>
    </>
  );
}
