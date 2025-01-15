import React, { useEffect, useRef, useState } from "react";
import "../styles/Login.scss";
import { Link, useNavigate } from 'react-router-dom'; 
import useAuthStore from '../store/AuthStore'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const ModalComponent: React.FC = () => {
  const bodyRef = useRef(document.body);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  
  // State to store form values
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loading, setLoading] = useState(false); 

  // Access Zustand store
  const { login, isAuthenticated, error } = useAuthStore();
  const navigate = useNavigate(); 



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await login(email, password);
    } catch (err) {
      // Error will be managed by Zustand or error state
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Login successful!');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]); // Run when isAuthenticated changes

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]); // Run when error changes



  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("is-open");
      console.log("Modal opened");
    }
    if (bodyRef.current) {
      bodyRef.current.style.overflow = "hidden"; // Disable page scroll when modal is open
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.remove("is-open");
      console.log("Modal closed");
    }
    if (bodyRef.current) {
      bodyRef.current.style.overflow = "initial"; // Re-enable page scroll when modal is closed
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 500 && !isOpened) { // Change the scroll threshold as needed
      setIsOpened(true);
      if (scrollDownRef.current) {
        scrollDownRef.current.style.display = "none"; // Hide the scroll-down indicator
      }
      openModal();
    }
  };

  // Handle form submission


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    console.log("Scroll event listener added");

    return () => {
      window.removeEventListener("scroll", handleScroll);
      console.log("Scroll event listener removed");
    };
  }, [isOpened]);

  useEffect(() => {
    if (modalButtonRef.current) {
      modalButtonRef.current.addEventListener("click", openModal);
      console.log("Modal button event listener added");
    }

    if (closeButtonRef.current) {
      closeButtonRef.current.addEventListener("click", closeModal);
      console.log("Close button event listener added");
    }

    document.onkeydown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape" || evt.keyCode === 27) {
        closeModal();
      }
    };

    return () => {
      if (modalButtonRef.current) {
        modalButtonRef.current.removeEventListener("click", openModal);
        console.log("Modal button event listener removed");
      }

      if (closeButtonRef.current) {
        closeButtonRef.current.removeEventListener("click", closeModal);
        console.log("Close button event listener removed");
      }
    };
  }, []);

  return (
    <div className="container" style={{ height: "200vh" }}> {/* Increased height for scrolling */}
      {/* Scroll down indicator */}
      <div className="scroll-down" ref={scrollDownRef}>
        SCROLL DOWN
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z" />
        </svg>
      </div>

      {/* Modal Layout */}
      <div className={`modal ${isOpened ? 'is-open' : ''}`} ref={modalRef}>
        <div className="modal-container">
          <div className="modal-left">
            <h1 className="modal-title">Welcome!</h1>
            <p className="modal-desc">
              Fanny pack hexagon food truck, street art waistcoat kitsch.
            </p>
            
            {/* Form inside the modal */}
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Controlled input
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Controlled input
                  required
                />
              </div>
              <div className="modal-buttons">
                <a href="#">Forgot your password?</a>
                <button className="input-button" type="submit">Login</button>
              </div>
            </form>

            <p className="sign-up">
              Don't have an account? <a href="#">Sign up now</a>
            </p>
          </div>
          <div className="modal-right">
            <img
              src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80"
              alt="modal image"
            />
          </div>
          <button className="icon-button close-button" ref={closeButtonRef}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z" />
            </svg>
          </button>
        </div>
        {/* Button to trigger modal for manual testing */}
        <button className="modal-button" ref={modalButtonRef}>
        Click here to login
      </button>
      </div>
    </div>
  );
};

export default ModalComponent;
