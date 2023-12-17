// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import courses from "./courses";
import users from "./users";
import news from "./news";
import teachers from "./teachers";
import userComments from "./userCommentsById"

const rootReducer = { navbar, layout, courses, users, news, teachers ,userComments };

export default rootReducer;
