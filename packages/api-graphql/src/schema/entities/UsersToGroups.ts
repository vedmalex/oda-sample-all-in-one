export default {
  name: 'UsersToGroups',
  description: 'Users to Groups mapping',
  fields: {
    user: {
      identity: 'linkTable',
    },
    group: {
      identity: 'linkTable',
    },
    userLink: {
      relation: {
        belongsTo: 'user@User#'
      }
    },
    groupLink: {
      relation: {
        belongsTo: 'group@Group#'
      }
    },
  },
};
