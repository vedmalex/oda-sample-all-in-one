export default {
  name: 'Group',
  description: 'Group of users that can share common ToDos',
  fields: {
    name: {
      indexed: 'text',
      identity: true,
    },
    description: {
      indexed: 'text',
    },
    users: {
      relation: {
        belongsToMany: "User#",
        using: "UsersToGroups#group",
      }
    },
    todoItems: {
      relation: {
        belongsToMany: 'ToDoItem#',
        using: 'ToDoItemsSharedToGroups#group'
      }
    }
  },
};
