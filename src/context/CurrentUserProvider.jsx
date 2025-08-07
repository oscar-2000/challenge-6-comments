import { useState } from "react";
import CommentsData from "@lib/data.json";
import CurrentUserContext from "@context/CurrentUserContext";

export default function CurrentUserProvider({children}) {
    const [currentUser, setUserCurrent] = useState(CommentsData.currentUser);

    return (
        <CurrentUserContext.Provider value={{currentUser}}>
            {children}
        </CurrentUserContext.Provider>
    )
}