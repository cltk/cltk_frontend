this.AdminConfig = {
  name: Config.name,
  collections: {
    Authors: {
      color: 'blue',
      icon: 'pencil',
      tableColumns: [
        {
          label: 'Title',
          name: 'title'
        }
      ]
    },
    Editors: {
      color: 'blue',
      icon: 'pencil',
      tableColumns: [
        {
          label: 'Title',
          name: 'title'
        }
      ]
    },
    Works: {
      color: 'blue',
      icon: 'pencil',
      extraFields: ['authors', 'editors'],
      tableColumns: [
        {
          label: 'Title',
          name: 'title'
        }
      ]
    },
    Subworks: {
      color: 'blue',
      icon: 'pencil',
      tableColumns: [
        {
          label: 'Title',
          name: 'title'
        }, {
          label: 'N',
          name: 'n'
        }
      ]
    },
    Texts: {
      color: 'blue',
      icon: 'pencil',
      tableColumns: [
        {
          label: 'N',
          name: 'n'
        }
      ]
    },
  },
  dashboard: {
    homeUrl: '/dashboard'
  },
  autoForm: {
    omitFields: ['createdAt', 'updatedAt']
  }
};
