import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider, useDispatch } from 'react-redux';
import DisplayBox from '@/app/Components/displayBox';
import store from '@/app/store';
import { mySliceActions } from '@/app/store';
import { configureStore } from '@reduxjs/toolkit';
import About from '@/app/about/[param]/page';
import { useParams, usePathname } from 'next/navigation';

describe('DisplayBox Component using real store', () => {
    test('renders initial state and can change state', () => {
        usePathname.mockReturnValue('/specific-path');
        useParams.mockReturnValue({param: 'test'})
        
        // Dispatch action to change mystate to 'mock-state'
        store.dispatch(mySliceActions.setMyState('mock-state'));

        const { getByText } = render(
            <Provider store={store}>
                <About />
            </Provider>
        );

        // Check if initial state is rendered
        expect(getByText('mock-state')).toBeInTheDocument();

        // Click on the Change button
        fireEvent.click(getByText('Change'));

        // Check if state is changed
        expect(getByText('changed-state')).toBeInTheDocument();

        // Click on the Reset button
        fireEvent.click(getByText('Reset'));

        // Check if state is changed
        expect(getByText('initial-state')).toBeInTheDocument();

    });
});

describe('DisplayBox Component using mock store', () => {
    test('renders initial state and can change state', () => {

        // Create a mock store with a mocked initial state
        const store = configureStore({
            reducer: {
                mySlice: (state = { mystate: 'mock-state' }, action) => {
                    if (action.type === mySliceActions.setMyState.type) {
                        return { ...state, mystate: action.payload };
                    }
                    return state;
                },
            },
        });

        const { getByText } = render(
            <Provider store={store}>
                <DisplayBox />
            </Provider>
        );

        // Check if initial state is rendered
        expect(getByText('mock-state')).toBeInTheDocument();

        // Click on the Change button
        fireEvent.click(getByText('Change'));

        // Check if state is changed
        expect(getByText('changed-state')).toBeInTheDocument();

        // Click on the Reset button
        fireEvent.click(getByText('Reset'));

        // Check if state is changed
        expect(getByText('initial-state')).toBeInTheDocument();

    });
});