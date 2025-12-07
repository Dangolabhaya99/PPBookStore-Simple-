import React from 'react';
import { Link } from 'react-router-dom';
import Image from './Banner.png';

const HomeComponent = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100" style={{ backgroundImage: 'url(https://via.placeholder.com/1500)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex flex-col lg:flex-row items-center justify-center flex-grow bg-white bg-opacity-80 p-8">
                <div className="text-center lg:text-left lg:w-1/2">
                    <h1 className="text-green-500 text-4xl md:text-5xl lg:text-6xl font-bold">
                        Hello, Welcome To PP BookStore
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-600">
                        At PP Book Store, we pride ourselves on being the go-to destination for students and educators alike, offering a wide selection of academic books for both college and school curricula.
                    </p>
                    <div className="mt-8">
                        <Link to="/books">
                            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                For Books
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
                    <img
                        src={Image}
                        alt="Books"
                        className="w-full h-auto max-w-md mx-auto"
                    />
                </div>
            </div>
            <footer className="bg-gray-200 text-black py-4">
                <div className="container mx-auto text-center text-lg">
                    <p>&copy; 2024 PP BookStore. All rights reserved.</p>
                    <div className="flex justify-center mt-4 space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.676 0h-21.352c-.731 0-1.324.593-1.324 1.324v21.352c0 .731.593 1.324 1.324 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.096 1.893-4.784 4.657-4.784 1.325 0 2.463.098 2.794.142v3.24h-1.918c-1.504 0-1.797.715-1.797 1.763v2.31h3.594l-.467 3.622h-3.127v9.294h6.13c.731 0 1.324-.593 1.324-1.324v-21.352c0-.731-.593-1.324-1.324-1.324z"/></svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.955-2.173-1.55-3.591-1.55-2.717 0-4.917 2.201-4.917 4.917 0 .386.043.762.128 1.124-4.083-.205-7.702-2.16-10.126-5.134-.423.725-.666 1.568-.666 2.465 0 1.701.866 3.199 2.181 4.078-.805-.025-1.562-.247-2.229-.616-.001.021-.001.042-.001.063 0 2.376 1.692 4.355 3.94 4.806-.412.111-.847.171-1.296.171-.316 0-.624-.031-.923-.088.625 1.956 2.444 3.379 4.6 3.418-1.683 1.319-3.809 2.105-6.115 2.105-.397 0-.79-.023-1.175-.069 2.179 1.396 4.768 2.209 7.548 2.209 9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.426-.013-.637.964-.695 1.8-1.562 2.462-2.549z"/></svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-3.313 0-3.75.012-5.053.073-1.305.061-2.203.27-2.985.574-.793.308-1.47.72-2.138 1.388-.668.668-1.08 1.345-1.388 2.138-.305.782-.514 1.68-.574 2.985-.061 1.303-.073 1.74-.073 5.053s.012 3.75.073 5.053c.061 1.305.27 2.203.574 2.985.308.793.72 1.47 1.388 2.138.668.668 1.345 1.08 2.138 1.388.782.305 1.68.514 2.985.574 1.303.061 1.74.073 5.053.073s3.75-.012 5.053-.073c1.305-.061 2.203-.27 2.985-.574.793-.308 1.47-.72 2.138-1.388.668-.668 1.08-1.345 1.388-2.138.305-.782.514-1.68.574-2.985.061-1.303.073-1.74.073-5.053s-.012-3.75-.073-5.053c-.061-1.305-.27-2.203-.574-2.985-.308-.793-.72-1.47-1.388-2.138-.668-.668-1.345-1.08-2.138-1.388-.782-.305-1.68-.514-2.985-.574-1.303-.061-1.74-.073-5.053-.073zm0 2.162c3.243 0 3.633.011 4.918.071 1.185.056 1.829.247 2.257.41.57.221.978.485 1.406.913.428.428.692.836.913 1.406.163.428.354 1.072.41 2.257.061 1.285.071 1.675.071 4.918s-.011 3.633-.071 4.918c-.056 1.185-.247 1.829-.41 2.257-.221.57-.485.978-.913 1.406-.428.428-.836.692-1.406.913-.428.163-1.072.354-2.257.41-1.285.061-1.675.071-4.918.071s-3.633-.011-4.918-.071c-1.185-.056-1.829-.247-2.257-.41-.57-.221-.978-.485-1.406-.913-.428-.428-.692-.836-.913-1.406-.163-.428-.354-1.072-.41-2.257-.061-1.285-.071-1.675-.071-4.918s.011-3.633.071-4.918c.056-1.185.247-1.829.41-2.257.221-.57.485-.978.913-1.406.428-.428.836-.692 1.406-.913.428-.163 1.072-.354 2.257-.41 1.285-.061 1.675-.071 4.918-.071zm0 2.838c-2.966 0-5.373 2.407-5.373 5.373s2.407 5.373 5.373 5.373 5.373-2.407 5.373-5.373-2.407-5.373-5.373-5.373zm0 1.616c2.075 0 3.757 1.682 3.757 3.757s-1.682 3.757-3.757 3.757-3.757-1.682-3.757-3.757 1.682-3.757 3.757-3.757zm7.788-.041c.621 0 1.125-.504 1.125-1.125s-.504-1.125-1.125-1.125-1.125.504-1.125 1.125.504 1.125 1.125 1.125z"/></svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0h-20.46c-.974 0-1.77.796-1.77 1.77v20.46c0 .974.796 1.77 1.77 1.77h20.46c.974 0 1.77-.796 1.77-1.77v-20.46c0-.974-.796-1.77-1.77-1.77zm-14.146 20.333h-3.411v-10.687h3.411v10.687zm-1.705-12.145c-1.095 0-1.982-.888-1.982-1.982s.888-1.982 1.982-1.982 1.982.888 1.982 1.982-.888 1.982-1.982 1.982zm12.145 12.145h-3.411v-5.772c0-1.376-.026-3.148-1.918-3.148-1.919 0-2.214 1.499-2.214 3.047v5.873h-3.411v-10.687h3.273v1.461h.048c.455-.861 1.566-1.766 3.225-1.766 3.448 0 4.086 2.27 4.086 5.225v6.297h-.001z"/></svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomeComponent;
