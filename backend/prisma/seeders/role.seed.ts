const adminPermissions = []
for (let i = 1; i <= 48; i++) {
  adminPermissions.push({id: i})
}

const role = {
  tag: 'role',
  data: [
    {
      id: 1,
      tag: "admin",
      description: "Admin",
      Permissions: {
        connect: adminPermissions
      }
    },
    {
      id: 2,
      tag: "teacher",
      description: "Teacher",
      Permissions: {
        connect: [{id:6},{id:10},{id:14},{id:18},{id:22}]
      }
    },
    {
      id: 3,
      tag: "student",
      description: "Student",
    },
    {
      id: 4,
      tag: "manager",
      description: "Manager",
      Permissions: {
        connect: [
          {id:1},{id:2},{id:3},{id:4},
          {id:5},{id:6},{id:7},{id:8},
          {id:9},{id:10},{id:11},{id:12},
          {id:13},{id:14},{id:15},
          {id:17},{id:18},{id:19},{id:20},
          {id:21},{id:22},{id:23},{id:24},
          {id:25},{id:26},{id:27},
          {id:29},{id:30},{id:31},{id:32},
          {id:41},{id:42},{id:43},{id:44},
          {id:45},{id:46},{id:47},
        ]
      }
    },
  ]
}

export default role