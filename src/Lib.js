import React, { useState, useEffect } from 'react';
import './LibraryPage.css'; // Import CSS file for styling

const LibraryPage = () => {
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksData, setData] = useState([]);
  const booksPerPage = 10;

  useEffect(() => {
    // Define the URL of your Flask server endpoint
    const endpointUrl = 'http://127.0.0.1:5000/books';

    // Send a GET request to the Flask server
    fetch(endpointUrl)
      .then(response => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
      })
      .then(data => {
        // Log the response data to the console
        console.log('Response from server:', data);
        setData(data)
      })
      .catch(error => {
        // Log any errors to the console
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Filtered books based on search input
  const filteredBooks = booksData.filter(book =>
    (book.title && book.title.toLowerCase().includes(filter.toLowerCase())) ||
    (book.author && book.author.toLowerCase().includes(filter.toLowerCase())) ||
    (book.subject && book.subject.toLowerCase().includes(filter.toLowerCase())) ||
    (book.publishDate && book.publishDate.toLowerCase().includes(filter.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handleChange = (e) => {
    setCurrentPage(1);
    setFilter(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="library-container">
      <h1>Library Management</h1>
      <input
        type="text"
        placeholder="Search by title, author, subject, or publish date"
        value={filter}
        onChange={handleChange}
        className="search-input"
      />
      <p className="total-books">Total Books: {filteredBooks.length}</p>
      <table className="books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Subject</th>
            <th>Publish Year</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.subject}</td>
              <td>{book.publishDate}</td> {/* Displaying the publish year directly */}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={filteredBooks.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const Pagination = ({ booksPerPage, totalBooks, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LibraryPage;
