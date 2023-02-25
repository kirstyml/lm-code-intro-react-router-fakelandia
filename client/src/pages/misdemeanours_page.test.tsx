import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Misdemeanours } from "./misdemeanours_page";
import { MisdemeanoursProvider } from "../context/misdemeanour_provider";

const handlers = [
  rest.get(`http://localhost:8080/api/misdemeanours/20`, (req, res, ctx) => {
    return res(
      ctx.json({
        misdemeanours: [
          {
            citizenId: 7449,
            misdemeanour: "vegetables",
            date: "2/18/2023",
          },
          {
            citizenId: 14281,
            misdemeanour: "rudeness",
            date: "2/18/2023",
          },
        ],
      })
    );
  }),
  rest.get("https://picsum.photos/v2/list", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "0",
          author: "Alejandro Escamilla",
          width: 5000,
          height: 3333,
          url: "https://unsplash.com/photos/yC-Yzbqy7PY",
          download_url: "https://picsum.photos/id/0/5000/3333",
        },
        {
          id: "1",
          author: "Alejandro Escamilla",
          width: 5000,
          height: 3333,
          url: "https://unsplash.com/photos/LNRyGwIJr5c",
          download_url: "https://picsum.photos/id/1/5000/3333",
        },
      ])
    );
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<MisdemeanoursPage />", () => {
  test("renders the table headings", async () => {
    render(
      <MisdemeanoursProvider>
        <Misdemeanours />
      </MisdemeanoursProvider>
    );
    await waitFor(() => screen.findByText("vegetables"));
    const tableHeader = screen.getAllByText(/Citizen ID/i);
    expect(tableHeader.length >= 1).toBe(true);
  });

  test("loads and displays the misdemeanours", async () => {
    render(
      <MisdemeanoursProvider>
        <Misdemeanours />
      </MisdemeanoursProvider>
    );
    await waitFor(() => screen.findByText("vegetables"));
    expect(screen.getByText("rudeness")).toBeInTheDocument();
  });

  test("loads and display the punishment ideas", async () => {
    render(
      <MisdemeanoursProvider>
        <Misdemeanours />
      </MisdemeanoursProvider>
    );
    await waitFor(() => screen.findByText("vegetables"));
    expect(screen.getAllByAltText("punishment idea")[0]).toHaveAttribute(
      "src",
      "https://picsum.photos/id/0/100"
    );
  });

  test("handles 500 error for misdemeanours", async () => {
    server.use(
      rest.get(
        "http://localhost:8080/api/misdemeanours/20",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    render(
      <MisdemeanoursProvider>
        <Misdemeanours />
      </MisdemeanoursProvider>
    );
    await waitFor(() => screen.findByText(/error/i));
    expect(
      screen.getByText(/Error: Something went wrong/i)
    ).toBeInTheDocument();
  });

  test("handles 500 error for punishments when misdemeanours are present", async () => {
    server.use(
      rest.get("https://picsum.photos/v2/list", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(
      <MisdemeanoursProvider>
        <Misdemeanours />
      </MisdemeanoursProvider>
    );
    await waitFor(() => screen.findByText("vegetables"));
    expect(screen.getAllByText("?")[0]).toBeInTheDocument();
  });
});
