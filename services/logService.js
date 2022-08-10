import Log from "../models/log_model.js";

const createProject = async ({ authorId, authorName, projectId, projectName }) => {
    return Log.create({
        type: 'project',
        authorId,
        projectId,
        action: 'create',
        message: `The project ${projectName} was created by ${authorName}`,
        date: new Date().toISOString()
    });
};

const updateProject = async ({ authorId, authorName, projectId, projectName }) => {
    return Log.create({
        type: 'project',
        authorId,
        projectId,
        action: 'update',
        message: `The project ${projectName} was updated by ${authorName}`,
        date: new Date().toISOString()
    });
};

const addProjectMember = async ({ authorId, authorName, projectId, projectName, memberName }) => {
    return Log.create({
        type: 'project',
        authorId,
        projectId,
        action: 'add_member',
        message: `${memberName} was added to the project ${projectName} as a member by ${authorName}`,
        date: new Date().toISOString()
    });
};

const deleteProject = async ({ authorId, authorName, projectId, projectName }) => {
    return Log.create({
        type: 'project',
        authorId,
        projectId,
        action: 'delete',
        message: `The project ${projectName} was deleted by ${authorName}`,
        date: new Date().toISOString()
    });
};

const getLogs = async ({ type }) => {
    const queryObject=  {};

    if (type) queryObject.type = type;

    return Log.find({...queryObject}).sort({date: 'desc'});
}

export default {
    createProject,
    updateProject,
    addProjectMember,
    getLogs,
    deleteProject
};