// import { FaPhoneAlt } from "react-icons/fa";

// const Header = () => {
//   return (
//     <section className="bg-gradient-to-r from-blue-500 to-indigo-600 py-2">
//       <div className="container mx-auto">
//         <div className="flex justify-center items-center">
//           <p className="mb-0 text-white">
//             <a className="flex items-center space-x-2 text-white hover:underline" href="tel:918824453320">
//               <FaPhoneAlt />
//               <span>+91-8824453320</span>
//             </a>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Header;

import { FaPhoneAlt } from "react-icons/fa";
import { Container } from "react-bootstrap";

const Header = () => {
  return (
    <section style={{ background: "linear-gradient(to right, #3b82f6, #6366f1)", padding: "10px 0" }}>
      <Container>
        <div className="d-flex justify-content-center align-items-center">
          <p className="mb-0 text-white">
            <a className="d-flex align-items-center text-white text-decoration-none" href="tel:918824453320">
              <FaPhoneAlt className="me-2" />
              <span>+91-8824453320</span>
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Header;
