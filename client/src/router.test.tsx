import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router-dom";
import SiteRouter from './router'

it("navigates to the home page when home is clicked", async () => {
    render(<MemoryRouter initialEntries={['/confess']}><SiteRouter /></MemoryRouter>)
    await userEvent.click(screen.getByText("Home"));
    expect(screen.getByText("Welcome to the home of the Justice Department of Fakelandia")).toBeInTheDocument();
});

it("navigates to the misdemeanours page when misdemeanours is clicked", async () => {
    render(<MemoryRouter initialEntries={['/confess']}><SiteRouter /></MemoryRouter>)
    await userEvent.click(screen.getByText("Misdemeanours"));
    expect(screen.getByText("Citizen ID")).toBeInTheDocument();
});

it("navigates to the confession page when confession is clicked", async () => {
    render(<MemoryRouter initialEntries={['/misdemeanours']}><SiteRouter /></MemoryRouter>)
    await userEvent.click(screen.getByText("Confess to Us"));
    expect(screen.getByText("Subject")).toBeInTheDocument();
});
