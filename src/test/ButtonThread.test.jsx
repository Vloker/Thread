/**
 * test scenario for ButtonThread
 * 
 * - ButtonThread component
 *   - should render correctly
 */

import { describe, expect, test, beforeEach } from 'vitest';
import ButtonThread from '../components/ButtonThread';
import { render } from '@testing-library/react';

describe('ButtonThread', () => {
    let button;

    beforeEach(() => {
        // Render the component
        const { getByRole } = render(<ButtonThread />);
        button = getByRole('button', { name: '+' });
    });

    test('renders button correctly', () => {
        expect(button).toBeInTheDocument();
    });

});
