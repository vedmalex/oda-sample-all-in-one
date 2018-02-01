const linkEntities = [
  'UsersToGroupsMap',
  'ToDoItemsSharedToGroupsMap',
].map(f => f.trim()).join(',');

const publicEntities = [
  'User',
  'ToDoItem',
].map(f => f.trim()).join(',');


export let adapter = {
  name: 'mongoose',
  'entities.*.metadata.storage.adapter': 'mongoose',
};

export const accessFixEntities = {
  name: 'Defatult Mutation access',
  'entities.*.metadata.acl.create': [],
  'entities.*.metadata.acl.read': [],
  'entities.*.metadata.acl.update': [],
  'entities.*.metadata.acl.delete': [],
  'entities.*.fields.*.metadata.acl.read': [],
  'entities.*.fields.*.metadata.acl.update': [],
};

export const accessFixMutations = {
  name: 'Defatult Mutation access',
  'mutations.*.metadata.acl.execute': [],
};

export let linkEntitiesVisibility = {
  name: 'linkEntities visibility',
  [`entities.[${linkEntities}].metadata.acl.read`]: 'system',
  [`entities.[${linkEntities}].fields.*.metadata.acl.read`]: 'system',
};

export let securityFields = {
  name: 'security',
  [`entities.*.fields.[createdBy,updateBy]`]: {
    indexed: true,
    relation: {
      belongsTo: 'User#',
    },
  },
  'entities.*.fields.[createdAt,updatedAt]': {
    indexed: true,
    type: 'Date',
  },
};

export let securityAcl = {
  name: 'security',
  'entities.*.fields.[createdBy,updateBy,createdAt,updatedAt].metadata.acl.read': 'system',
};

export let ownerFields = {
  name: 'security',
  [`entities.^[${linkEntities}].fields`]: [
    {
      name: 'owner',
      indexed: true,
    },
  ],
};

export let ownerAcl = {
  name: 'security',
  [`entities.^[${linkEntities}].fields.owner.metadata.acl.read`]: 'admin',
};


export let defaultVisibility = {
  name: 'default visibility',
  'entities.*.metadata.acl.read': 'authenticated',
  'entities.*.fields.*.metadata.acl.read': 'authenticated',
};





export let defaultMutationAccess = {
  name: 'Defatult Mutation access',
  'mutations.*.metadata.acl.execute': 'users',
  'mutations.loginUser.metadata.acl.execute': 'public',
};

export let defaultIdVisibility = {
  name: 'default id field visibility',
  'entities.*.fields.id.metadata.acl.read': 'public',
};

export let publicVisibility = {
  name: 'linkEntities visibility',
  [`entities.[${publicEntities}].metadata.acl.read`]: 'public',
  [`entities.[${publicEntities}].fields.*.metadata.acl.read`]: 'authenticated',
  'entities.User.fields.[userName].metadata.acl.read': 'public',
  'entities.ToDoItem.fields.[name, description, dueTo, creator].metadata.acl.read': 'public',
};

export let runtimeMutationAcl = {
  '*': false,
  system: {
    '*': true,
  },
  authenticated: {
    '*': true,
    loginUser: false,
  },
  public: {
    loginUser: true,
    '*': false,
  },
};