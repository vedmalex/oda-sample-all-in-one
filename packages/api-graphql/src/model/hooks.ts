// tslint:disable-next-line:max-line-length
// const dictionary = [].map(f => f.trim()).join(',');
const businessEntities = [
  'BusinessBuyer',
  'BusinessDataItem',
  'BusinessItem',
  'BusinessLink',
  'BusinessProjectPicker',
  'BusinessTemplate',
  'BusinessUser',
].map(f => f.trim()).join(',');

export let securityFields = {
  name: 'security',
  [`entities.^[${businessEntities}].fields.[createdBy,updateBy]`]: {
    name: 'createdBy',
    indexed: true,
    relation: {
      belongsTo: 'User#',
    },
  },
  'entities.^[${businessEntities}].fields.[createdAt,updatedAt]': {
    indexed: true,
    type: 'Date',
  },
  'entities.^[${businessEntities}].fields.removed': {
    type: 'boolean',
    indexed: true,
  },
};

export let securityAcl = {
  name: 'security',
  'entities.*.fields.[createdBy,updateBy,createdAt, updatedAt].metadata.acl.read': 'admin',
};

export let ownerFields = {
  name: 'security',
  // [`entities.^[${dictionary}].fields`]: [
  [`entities.^[${businessEntities}].fields`]: [
    {
      name: 'owner',
      indexed: true,
    },
  ],
};

export let ownerAcl = {
  name: 'security',
  // [`entities.^[${dictionary}].fields.owner.metadata.acl.read`]: 'admin',
};

export let adapter = {
  name: 'mongoose',
  'entities.*.metadata.storage.adapter': 'mongoose',
};

export let userCollectionName = {
  name: 'set collectionName for User',
  'entities.User.metadata.storage': {
    adapter: 'mongoose',
    collectionName: '_users_',
  },
};

export let userIsModerator = {
  name: 'setup user.isModerator field',
  'entities.User.fields': [
    {
      name: 'isModerator',
      type: 'boolean',
      indexed: true,
    },
  ],
  'entities.User.fields.isModerator.metadata.acl.read': 'moderator',
};

export let userIsAdmin = {
  name: 'setup user.isAdmin field',
  'entities.User.fields': [
    {
      name: 'isAdmin',
      type: 'boolean',
      indexed: true,
    },
  ],
  'entities.User.fields.isAdmin.metadata.acl.read': 'admin',
};

export let userIsSystem = {
  name: 'setup user.isSystem field',
  'entities.User.fields': [
    {
      name: 'isSystem',
      type: 'boolean',
      indexed: true,
    },
  ],
  'entities.User.fields.isSystem.metadata.acl.read': 'system',
};

export let defaultVisibility = {
  name: 'default visibility',
  'entities.*.metadata.acl.read': 'users',
  'entities.*.fields.*.metadata.acl.read': 'users',
};

export let dictionariesVisibility = {
  name: 'dictionaries visibility',
  // [`entities.[${dictionary}].metadata.acl.read`]: 'public',
  // [`entities.[${dictionary}].fields.*.metadata.acl.read`]: 'public',
};

export const accessFixEntities = {
  name: 'Defatult Mutation access',
  'entities.*.metadata.acl.create': [],
  'entities.*.fields.*.metadata.acl.create': [],
  'entities.*.metadata.acl.read': [],
  'entities.*.fields.*.metadata.acl.read': [],
  'entities.*.metadata.acl.update': [],
  'entities.*.fields.*.metadata.acl.update': [],
  'entities.*.metadata.acl.delete': [],
  'entities.*.fields.*.metadata.acl.delete': [],
};

export const accessFixMutations = {
  name: 'Defatult Mutation access',
  'mutations.*.metadata.acl.execute': [],
};

export let defaultMutationAccess = {
  name: 'Defatult Mutation access',
  'mutations.*.metadata.acl.execute': 'users',
  'mutations.loginUser.metadata.acl.execute': 'public',
  'mutations.checkLoginEnable.metadata.acl.execute': 'public',
  'mutations.restorePassword.metadata.acl.execute': 'public',
  'mutations.startRestorePasswordProcess.metadata.acl.execute': 'public',
};

export let defaultIdVisibility = {
  name: 'default id field visibility',
  'entities.*.fields.id.metadata.acl.read': 'public',
};

export let runtimeMutationAcl = {
  '*': false,
  system: {
    '*': true,
  },
  admin: {
    '*': true,
  },
  moderator: {
    '*': true,
  },
  users: {
    '*': true,
  },
  public: {
    loginUser: true,
    registerUser: true,
    checkLoginEnable: true,
    restorePassword: true,
    startRestorePasswordProcess: true,
    '*': false,
  },
};
