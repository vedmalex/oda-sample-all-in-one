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
        using: "UsersToGroupsMap#group",
      }
    },
    todoItems: {
      relation: {
        belongsToMany: 'ToDoItem#',
        using: 'ToDoItemsSharedToGroupsMap#group'
      }
    }
  },
};
