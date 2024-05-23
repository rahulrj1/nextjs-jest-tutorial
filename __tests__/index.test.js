import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import Home from '../src/app/page';
import axios from 'axios';
import { act } from 'react';
import store from '@/app/store';

// Mocking Axios requests
jest.mock('axios');

// Mock data for users and products
const mockUserData = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Jane', lastName: 'Smith' },
];
const mockProductData = [
  { id: 1, title: 'Product 1', description: 'Description 1' },
  { id: 2, title: 'Product 2', description: 'Description 2' },
];

describe('Tests related to the home page', () => {
  // Create a mapping object for API endpoints and mock data
  const apiMockDataMap = {
    'https://dummyjson.com/users': { users: mockUserData },
    'https://dummyjson.com/products': { products: mockProductData }
    // Add mappings for other API endpoints as needed
  };

  beforeEach(() => {
    // Mock Axios requests for each API endpoint
    Object.entries(apiMockDataMap).forEach(([url, data]) => {
      axios.get.mockResolvedValueOnce({ status: 200, data });
    });
  })


  test('home page heading & rendering of users and products', async () => {
    
    act(()=>{
      render(
        <Provider store={store}>
          <Home />
        </Provider>
      );
    })

    const heading = screen.getByRole('heading', {
      name: /Nextjs Jest Tutorial/i,
    });
    expect(heading).toBeInTheDocument();

    await waitFor(() => {
      // Assert that users are rendered
      expect(screen.getByText('Here is a list of our users')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();

      expect(screen.getByText('Here is a list of our products')).toBeInTheDocument();
      expect(screen.getByText('Product 1 : Description 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2 : Description 2')).toBeInTheDocument();
    });

  });
});