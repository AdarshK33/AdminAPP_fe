import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientReducer";
import emailReducer from "./emailReducer";
import loginReducer from "./loginReducer";
import notificationReducer from "./notificationReducer";
import projectReducer from "./projectReducer";
import userReducer from "./userReducer";
import projectreportReducer from "./projectsreportsReducer";
import taskReducer from "./taskReducer";
import commonReducer from "./commonReducer";
import dailyWorkReducer from "./dailyWorkReducer";
import profileReducer from './profileReducer'
import dashboardReducer from "./dashboardReducer";


const store = configureStore({
    reducer: {
        client: clientReducer,
        project: projectReducer,
        task: taskReducer,
        login:loginReducer,
        user:userReducer,
        email:emailReducer,
        projectreport:projectreportReducer,
        notification: notificationReducer,
        daily_work: dailyWorkReducer,
        common: commonReducer,
        profile:profileReducer,
        dashboard:dashboardReducer
    }
})

export default store;