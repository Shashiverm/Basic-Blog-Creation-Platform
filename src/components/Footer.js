import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault(); // Prevent form submission
    setMessage("");

    // Validate the email input
    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      // Send a POST request to the backend
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Thank you for subscribing!");
        setEmail(""); // Clear the input field
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Could not connect to the server. Please try again later.");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Newsletter</h3>
      <p className="text-blue-100">Stay updated with our latest posts.</p>
      <form className="flex" onSubmit={handleSubscribe}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
        />
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-400 transition-colors"
        >
          Subscribe
        </button>
      </form>
      {message && (
        <p
          className={`mt-2 text-sm ${
            message.includes("Thank you") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Footer;
