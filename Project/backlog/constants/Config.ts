import Constants from "expo-constants";

export const Config = {
    ApiUrl: Constants.expoConfig?.extra?.ApiUrl,
    GetTasksByUser: Constants.expoConfig?.extra?.GetTasksByUser,
    CreateTask: Constants.expoConfig?.extra?.CreateTask,
    UpdateTask: Constants.expoConfig?.extra?.UpdateTask,
    PostUser: Constants.expoConfig?.extra?.PostUser,
    PostTask: Constants.expoConfig?.extra?.PostTask,
    FileName: Constants.expoConfig?.extra?.FileName,
    GoogleClientID: Constants.expoConfig?.extra?.GoogleClientID
};
