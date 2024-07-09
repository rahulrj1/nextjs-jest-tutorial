import '@testing-library/jest-dom';
import { useParams, usePathname, useRouter  } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn(),
}));