import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';

// const ProtectedRoute = ({ component: Component, ...props }) => {
//   return (
//     <Route>
//       {() =>
//         props.isLoggedIn ? <Component {...props} /> : <Redirect to='/' />
//       }
//     </Route>
//   );
// };

function ProtectedRoute({ ...props }) {
  return (
    <Route {...props}>
      {() => (props.isLoggedIn ? props.children : <Redirect to='./' />)}
    </Route>
  );
}

export default ProtectedRoute;
