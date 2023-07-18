import React from 'react';

const ContactPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dapibus varius massa sed consequat. Nullam
                ultrices elit at ligula feugiat consectetur.
            </p>
            <form className="max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Your Name</label>
                    <input type="text" id="name" className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Your Email</label>
                    <input type="email" id="email" className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                    <textarea id="message" rows="4" className="w-full px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-500"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">Send Message</button>
            </form>
        </div>
    );
};

export default ContactPage;
