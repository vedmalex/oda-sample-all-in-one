export default {
  name: 'User',
  description: 'User',
  fields: {
    userName: {
      identity: true,
    },
    password: {
      required: true,
    },
    isAdmin: {
      type: 'boolean',
    },
    isSystem: {
      type: 'boolean',
    },
    enabled: {
      type: 'boolean',
    },
    groups: {
      relation: {
        belongsToMany: "Group#",
        using: "UsersToGroups#user",
      }
    }
  },
};
