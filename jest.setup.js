import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));