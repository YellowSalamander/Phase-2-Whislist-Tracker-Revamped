import React from "react";
import "./About.css"
function About() {
    const title = 'Wishlist Deal Tracker'

    return (
        <div className="about-us-container">
            <h1>About {title}</h1>
                <p>Welcome to {title}, your ultimate destination for tracking and managing your video game wishlist. 
                 At {title}, we're passionate about helping gamers like you discover the best deals and build your dream 
                 game collection.</p>

            <h2>What We Do</h2>
                <p>At {title}, we connect you to the exciting world of video game deals and savings. We do this by aggregating 
                    real-time data from various online stores through the powerful CheapShark API. This means you can easily access information 
                    on the current prices, discounts, and the cheapest prices ever recorded for your favorite games across multiple platforms.</p>

            <h2>Why {title}</h2>
                <p>We understand that gaming can be an expensive hobby, and finding the best deals can be a time-consuming process. That's where 
                     {title} comes in. We're here to simplify your gaming experience by providing you with up-to-date information on 
                    game prices and deals, all in one place.</p>

            <h2>Our Mission</h2>
                <p>Our mission at {title} is to empower gamers with the tools and knowledge they need to make informed decisions about their 
                     game purchases. We're committed to helping you save money while building your gaming library with the titles you love.</p>

            <h2>Join Us</h2>
                <p>Join the {title} community today and start building your ultimate video game wishlist. Whether you're a casual gamer, a seasoned collector, 
                    or simply looking for great deals, we've got you covered. Explore our site, search for your favorite games, and start creating your personalized wishlist. 
                    Never miss out on a great deal again!</p>
        </div>
    );
}
export default About