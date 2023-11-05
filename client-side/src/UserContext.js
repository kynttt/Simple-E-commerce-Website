import React from 'react';

// Creates a Context object
// A context object as the name states is a data type of an object that can be used to store information that can be shared to other components within the app.
const UserContext = React.createContext();

// The "Provider" component allows other components to consume/use the context object and supply the necessary information need to the context object.
export const UserProvider = UserContext.Provider;

export default UserContext;