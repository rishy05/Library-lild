import React, { useState } from 'react';
import './LibraryPage.css'; // Import CSS file for styling

const booksData = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', subject: 'Fiction', publishDate: '1960' },
    { id: 2, title: '1984', author: 'George Orwell', subject: 'Dystopian', publishDate: '1949' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', subject: 'Fiction', publishDate: '1925' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', subject: 'Romance', publishDate: '1813' },
    { id: 5, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', subject: 'Fantasy', publishDate: '1997' },
    { id: 6, title: 'The Catcher in the Rye', author: 'J.D. Salinger', subject: 'Fiction', publishDate: '1951' },
    { id: 7, title: 'Animal Farm', author: 'George Orwell', subject: 'Satire', publishDate: '1945' },
    { id: 8, title: 'The Hobbit', author: 'J.R.R. Tolkien', subject: 'Fantasy', publishDate: '1937' },
    { id: 9, title: 'Brave New World', author: 'Aldous Huxley', subject: 'Dystopian', publishDate: '1932' },
    { id: 10, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', subject: 'Fantasy', publishDate: '1954' },
    { id: 11, title: 'Fahrenheit 451', author: 'Ray Bradbury', subject: 'Dystopian', publishDate: '1953' },
    { id: 12, title: 'The Da Vinci Code', author: 'Dan Brown', subject: 'Mystery', publishDate: '2003' },
    { id: 13, title: 'The Chronicles of Narnia', author: 'C.S. Lewis', subject: 'Fantasy', publishDate: '1950' },
    { id: 14, title: 'The Alchemist', author: 'Paulo Coelho', subject: 'Philosophical fiction', publishDate: '1988' },
    { id: 15, title: 'Gone with the Wind', author: 'Margaret Mitchell', subject: 'Historical fiction', publishDate: '1936' },
    { id: 16, title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', subject: 'Gothic fiction', publishDate: '1890' },
    { id: 17, title: 'Moby-Dick', author: 'Herman Melville', subject: 'Adventure', publishDate: '1851' },
    { id: 18, title: 'The Grapes of Wrath', author: 'John Steinbeck', subject: 'Historical fiction', publishDate: '1939' },
    { id: 19, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', subject: 'Psychological fiction', publishDate: '1866' },
    { id: 20, title: 'Wuthering Heights', author: 'Emily Brontë', subject: 'Gothic fiction', publishDate: '1847' },
    // Add more books to reach a total of 50
  ];

const LibraryPage = () => {
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Filtered books based on search input
  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(filter.toLowerCase()) ||
    book.author.toLowerCase().includes(filter.toLowerCase()) ||
    book.subject.toLowerCase().includes(filter.toLowerCase()) ||
    book.publishDate.toLowerCase().includes(filter.toLowerCase())
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
      <h1>Library Management Page</h1>
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
            <th>Publish Date</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.subject}</td>
              <td>{book.publishDate}</td>
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
