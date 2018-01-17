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
      relation: {
        indexed: true,
        belongsTo: 'User#'
      }
    },
    creator: {
      relation: {
        indexed: true,
        belongsTo: 'User#'
      }
    },
    sharedTo: {
      relation: {
        belongsToMany: 'Group#',
        using: 'ToDoItemsSharedToGroups#item',
      }
    }
  },
};
