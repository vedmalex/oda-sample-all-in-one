export default {
  name: 'ToDoItem',
  description: 'ToDo item',
  fields: {
    done: {
      type: 'Boolean',
    },
    name: {
      indexed: 'text',
    },
    description: {
      indexed: 'text'
    },
    dueTo: {
      type: 'Date',
    },
    isPrivate: {
      type: 'Boolean',
    },
    assignedTo: {
      indexed: true,
      relation: {
        belongsTo: 'User#'
      }
    },
    creator: {
      indexed: true,
      relation: {
        belongsTo: 'User#'
      }
    },
    sharedTo: {
      relation: {
        belongsToMany: 'Group#',
        using: 'ToDoItemsSharedToGroupsMap#item',
      }
    }
  },
};
