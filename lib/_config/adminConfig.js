this.AdminConfig = {
  name: Config.name,
  collections: {
    Authors: {
      color: 'blue',
      icon: 'pencil',
      tableColumns: [
        {
          label: 'English Name',
          name: 'english_name'
        }
      ]
    },
    Editors: {
      color: 'blue',
      icon: 'pencil',
      tableColumns: [
        {
          label: 'English Name',
          name: 'english_name'
        }
      ]
    },
    Corpora: {
      color: 'blue',
      icon: 'pencil',
      tableColumns: [
        {
          label: 'Title',
          name: 'title'
        },
        {
          label: 'Language',
          name: 'language'
        },
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
    Texts: {
      color: 'blue',
      icon: 'pencil',
      tableColumns: [
        {
          label: 'Work',
          name: 'work'
        },
        {
          label: 'N1',
          name: 'n_1'
        },
        {
          label: 'N2',
          name: 'n_2'
        },
        {
          label: 'N3',
          name: 'n_3'
        },
      ]
    },
    Annotation: {
      color: 'blue',
      icon: 'pencil',
      tableColumns: [
        {
          label: 'User',
          name: 'user'
        },
        {
          label: 'Work',
          name: 'work'
        },
      ]
    },
    Commentary: {
      color: 'blue',
      icon: 'pencil',
      tableColumns: [
        {
          label: 'Work',
          name: 'work'
        },
        {
          label: 'N1',
          name: 'n1'
        },
        {
          label: 'N2',
          name: 'n2'
        },
        {
          label: 'N3',
          name: 'n3'
        },
      ]
    },
  },
  dashboard: {
    homeUrl: '/admin'
  },
};
