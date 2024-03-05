// import { render, fireEvent, screen } from '@testing-library/react';
// import { Navbar } from './Navbar';
// import { AuthProvider } from '../../context/AuthProvider';
// import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
// import { apiSlice } from '../../state/api/apiSlice';
// import { BrowserRouter } from 'react-router-dom';



// const mockSetIsShowProfile = jest.fn();

// const MockApp = () => {
//     return (
//       <AuthProvider>
//         <ApiProvider api={apiSlice}>
//           <BrowserRouter>
//             <Navbar isShowProfile={false} setIsShowProfile={mockSetIsShowProfile} />
//           </BrowserRouter>
//         </ApiProvider>
//       </AuthProvider>
//     );
//   };

// describe('Navbar Component', () => {
//   test('renders Navbar component correctly', () => {
   
//      render(
//       <MockApp  />
//     );

//     // Assert Navbar renders Logo component
//     expect(screen.getByAltText('Logo')).toBeInTheDocument();

//     // Assert Navbar renders Tabs components with correct text and images
//     expect(screen.getByAltText('Links Icon')).toBeInTheDocument();
//     expect(screen.getByText('Links')).toBeInTheDocument();
//     expect(screen.getByAltText('Profile Details Icon')).toBeInTheDocument();
//     expect(screen.getByText('Profile Details')).toBeInTheDocument();

//     // Simulate click on 'Links' tab and check if setIsShowProfile is called with false
//     fireEvent.click(screen.getByText('Links'));
//     expect(mockSetIsShowProfile).toHaveBeenCalledWith(false);

//     // Simulate click on 'Profile Details' tab and check if setIsShowProfile is called with true
//     fireEvent.click(screen.getByText('Profile Details'));
//     expect(mockSetIsShowProfile).toHaveBeenCalledWith(true);

//     // Assert Navbar renders Button component with correct text
//     expect(screen.getByText('Preview')).toBeInTheDocument();
//   });
// });
