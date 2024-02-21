import React, { useState, useEffect } from 'react';
import './LibraryPage.css'; // Import CSS file for styling

const bookData = [
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
    { id: 21, title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', subject: 'Adventure', publishDate: '1844' },
    { id: 22, title: 'Frankenstein', author: 'Mary Shelley', subject: 'Gothic fiction', publishDate: '1818' },
    { id: 23, title: 'The Adventures of Huckleberry Finn', author: 'Mark Twain', subject: 'Adventure', publishDate: '1884' },
    { id: 24, title: 'Jane Eyre', author: 'Charlotte Brontë', subject: 'Gothic fiction', publishDate: '1847' },
    { id: 25, title: 'Dracula', author: 'Bram Stoker', subject: 'Gothic fiction', publishDate: '1897' },
    { id: 26, title: 'The Scarlet Letter', author: 'Nathaniel Hawthorne', subject: 'Romance', publishDate: '1850' },
    { id: 27, title: 'The Odyssey', author: 'Homer', subject: 'Epic', publishDate: '8th century BCE' },
    { id: 28, title: 'Les Misérables', author: 'Victor Hugo', subject: 'Historical fiction', publishDate: '1862' },
    { id: 29, title: 'Anna Karenina', author: 'Leo Tolstoy', subject: 'Romance', publishDate: '1877' },
    { id: 30, title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', subject: 'Philosophical fiction', publishDate: '1880' },
    { id: 31, title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', subject: 'Magical realism', publishDate: '1967' },
    { id: 32, title: 'Don Quixote', author: 'Miguel de Cervantes', subject: 'Satire', publishDate: '1605' },
    { id: 33, title: 'War and Peace', author: 'Leo Tolstoy', subject: 'Historical fiction', publishDate: '1869' },
    { id: 34, title: 'The Bell Jar', author: 'Sylvia Plath', subject: 'Autobiographical fiction', publishDate: '1963' },
    { id: 35, title: 'Heart of Darkness', author: 'Joseph Conrad', subject: 'Adventure', publishDate: '1899' },
    { id: 36, title: 'The Road', author: 'Cormac McCarthy', subject: 'Post-apocalyptic', publishDate: '2006' },
    { id: 37, title: 'The Stranger', author: 'Albert Camus', subject: 'Philosophical fiction', publishDate: '1942' },
    { id: 38, title: 'Slaughterhouse-Five', author: 'Kurt Vonnegut', subject: 'Science fiction', publishDate: '1969' },
    { id: 39, title: 'The Sun Also Rises', author: 'Ernest Hemingway', subject: 'Modernist', publishDate: '1926' },
    { id: 40, title: 'Middlemarch', author: 'George Eliot', subject: 'Social realism', publishDate: '1871' },
    { id: 41, title: 'Great Expectations', author: 'Charles Dickens', subject: 'Social criticism', publishDate: '1861' },
    { id: 42, title: 'A Tale of Two Cities', author: 'Charles Dickens', subject: 'Historical fiction', publishDate: '1859' },
    { id: 43, title: 'The Adventures of Sherlock Holmes', author: 'Arthur Conan Doyle', subject: 'Mystery', publishDate: '1892' },
    { id: 44, title: 'The Metamorphosis', author: 'Franz Kafka', subject: 'Absurdist fiction', publishDate: '1915' },
    { id: 45, title: 'The Trial', author: 'Franz Kafka', subject: 'Philosophical fiction', publishDate: '1925' },
    { id: 46, title: 'A Clockwork Orange', author: 'Anthony Burgess', subject: 'Dystopian', publishDate: '1962' },
    { id: 47, title: 'Lord of the Flies', author: 'William Golding', subject: 'Allegorical', publishDate: '1954' },
    { id: 48, title: 'The Shining', author: 'Stephen King', subject: 'Horror', publishDate: '1977' },
    { id: 49, title: 'Catch-22', author: 'Joseph Heller', subject: 'Satire', publishDate: '1961' },
    { id: 50, title: 'Of Mice and Men', author: 'John Steinbeck', subject: 'Tragedy', publishDate: '1937' },
  ];


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
