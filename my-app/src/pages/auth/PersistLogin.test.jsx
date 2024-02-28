// import { render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// // import { useRefreshToken, useAuth } from "./hooks/useAuth"; // Assuming these are the correct import paths
// import PersistLogin from "./PersistLogin";
// // import { useAuth } from "../../context/AuthProvider";
// import  useRefreshToken  from "../../hooks/useRefreshToken";
// import  useAuth  from "../../hooks/useAuth";


// jest.mock("../../hooks/useRefreshToken", () => jest.fn());
// jest.mock("../../hooks/useAuth", () => jest.fn());



// describe("PersistLogin component", () => {
//   test("renders loading state when isLoading is true", () => {
//     useRefreshToken.mockReturnValue(jest.fn());
//     useAuth.mockReturnValue({ auth: null, persist: true });

//     render(
//       <MemoryRouter>
//         <PersistLogin />
//       </MemoryRouter>
//     );

//     const loadingElement = screen.getByText(/loading/i);

//     expect(loadingElement).toBeInTheDocument();
//   });

//   test("renders Outlet when persist is false", () => {
//     useRefreshToken.mockReturnValue(jest.fn());
//     useAuth.mockReturnValue({ auth: null, persist: false });

//     render(
//       <MemoryRouter>
//         <PersistLogin />
//       </MemoryRouter>
//     );

//     const outletElement = screen.getByRole("main");

//     expect(outletElement).toBeInTheDocument();
//   });

//   test("renders Outlet when auth.accessToken is truthy", () => {
//     useRefreshToken.mockReturnValue(jest.fn());
//     useAuth.mockReturnValue({ auth: { accessToken: "token" }, persist: true });

//     render(
//       <MemoryRouter>
//         <PersistLogin />
//       </MemoryRouter>
//     );

//     const outletElement = screen.getByRole("main");

//     expect(outletElement).toBeInTheDocument();
//   });

//   test("calls refresh function when auth.accessToken is falsy and persist is true", () => {
//     const refreshMock = jest.fn();
//     useRefreshToken.mockReturnValue(refreshMock);
//     useAuth.mockReturnValue({ auth: { accessToken: null }, persist: true });

//     render(
//       <MemoryRouter>
//         <PersistLogin />
//       </MemoryRouter>
//     );

//     expect(refreshMock).toHaveBeenCalled();
//   });
// });


import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PersistLogin from "./PersistLogin";
import  useAuth  from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

jest.mock("../../hooks/useRefreshToken", () => jest.fn());
jest.mock("../../hooks/useAuth", () => jest.fn());

describe("PersistLogin component", () => {
  test("renders loading state when isLoading is true", async () => {
    useRefreshToken.mockReturnValue(jest.fn());
    useAuth.mockReturnValue({ auth: null, persist: true });

    render(
      <MemoryRouter>
        <PersistLogin />
      </MemoryRouter>
    );

    // Wait for the loading element to be present
    await waitFor(() => {
      const loadingElement = screen.getByText(/loading/i);
      expect(loadingElement).toBeInTheDocument();
    });
  });


  test("calls refresh function when auth.accessToken is falsy and persist is true", () => {
    const refreshMock = jest.fn();
    useRefreshToken.mockReturnValue(refreshMock);
    useAuth.mockReturnValue({ auth: { accessToken: null }, persist: true });

    render(
      <MemoryRouter>
        <PersistLogin />
      </MemoryRouter>
    );

    expect(refreshMock).toHaveBeenCalled();
  });
});