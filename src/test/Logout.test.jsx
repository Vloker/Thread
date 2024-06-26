/**
 * test scenario for LogoutButton
 * 
 * - LogoutButton component
 *   - should render correctly
 */
import React from 'react';
import { describe, expect, it } from 'vitest';
import Logout from '../components/Logout';
import { render, screen } from '@testing-library/react';

describe('Logout', () => {
    it('should render correctly', () => {
        render(<Logout />);
        const logoutButton = screen.getByRole('button', { name: /logout/i });
        expect(logoutButton).toBeInTheDocument();
    });
});
