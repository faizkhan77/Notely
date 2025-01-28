import React from "react";
import { useNavigate } from "react-router";
import { FaStickyNote, FaCloud, FaLightbulb, FaInstagram, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/signup"); // Navigates to the Signup page
    };

    return (
        <div className="notely-home">
            <div className="notely-container">
                {/* Hero Section */}
                <section className="hero-section">
                    <h1 className="notely-title">Welcome to <span className="notely-highlight">Notely</span>! 📝</h1>
                    <p className="notely-description">
                        A magical concoction brewed by <span className="notely-author">Mohd Faiz Khan</span>,
                        combining the spicy elegance of <strong>Django</strong>, the fresh zest of <strong>React</strong>,
                        and the timeless flavor of <strong>PostgreSQL</strong>. 🍹
                    </p>
                    <button className="notely-get-started" onClick={handleGetStarted}>
                        Get Started 🚀
                    </button>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <h2 className="section-title">Features</h2>
                    <div className="features">
                        <div className="feature-item">
                            <FaStickyNote className="feature-icon" />
                            <h3>Write Notes</h3>
                            <p>Jot down your thoughts instantly with our seamless interface.</p>
                        </div>
                        <div className="feature-item">
                            <FaCloud className="feature-icon" />
                            <h3>Access Anywhere</h3>
                            <p>Save your notes securely and access them from any device.</p>
                        </div>
                        <div className="feature-item">
                            <FaLightbulb className="feature-icon" />
                            <h3>Creative Tools</h3>
                            <p>Organize your ideas with style using our creative features.</p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="contact-section">
                    <h2 className="section-title">Contact</h2>
                    <p className="contact-freelance">
                        I also take on freelance projects! Feel free to reach out if you have something in mind.
                    </p>

                    <div className="contact-links">
                        <a href="https://www.instagram.com/m_faiz_k_/?hl=en" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="contact-icon" /> Instagram
                        </a>
                        <a href="https://github.com/faizkhan77" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="contact-icon" /> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/faiz-khan77/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="contact-icon" /> LinkedIn
                        </a>
                        <a href="https://faizkhanpy.pythonanywhere.com/" target="_blank" rel="noopener noreferrer">
                            <FaGlobe className="contact-icon" /> Portfolio
                        </a>
                    </div>
                </section>

                {/* Footer */}
                <footer className="notely-footer">
                    <p>© 2025 Notely. Crafted with ❤️ by Mohd Faiz Khan.</p>
                </footer>
            </div>
        </div>
    );
};

export default Home;
