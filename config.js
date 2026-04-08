const CONFIG = {
  adminEmail: 's51.saugatsingh@gmail.com',
  emailjs: {
    publicKey:  'nBrv0rPpGqu7UbhI9',
    serviceId:  'service_gw3kngx',
    templateId: 'template_eg2y64c',
  },
  teachers: [
    {
      username: 'saugat',
      displayName: 'Admin',
      grades: [1,2,3,4,5,6,7,8],
      isAdmin: true,
      passwordHash: 'f17511d7dbe579cd55e6bbb52b64e21e97b975c4a096d343eaaa6f0293bdb19b'
    },
    {
      username: 'Grade1',
      displayName: 'Grade 1',
      grades: [1],
      isAdmin: false,
      passwordHash: 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9'
    },
    {
      username: 'Grade2',
      displayName: 'Grade 2',
      grades: [2],
      isAdmin: false,
      passwordHash: 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9'
    },
    {
      username: 'teacher3',
      displayName: 'Grade 3',
      grades: [3],
      isAdmin: false,
      passwordHash: 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9'
    },
    {
      username: 'teacher4',
      displayName: 'Grade 4',
      grades: [4],
      isAdmin: false,
      passwordHash: 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9'
    },
    {
      username: 'teacher5',
      displayName: 'Grade 5',
      grades: [5],
      isAdmin: false,
      passwordHash: 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9'
    },
    {
      username: 'teacher6',
      displayName: 'Grade 6',
      grades: [6],
      isAdmin: false,
      passwordHash: 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9'
    },
    {
      username: 'teacher7',
      displayName: 'Grade 7',
      grades: [7],
      isAdmin: false,
      passwordHash: 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9'
    },
    {
      username: 'teacher8',
      displayName: 'Grade 8',
      grades: [8],
      isAdmin: false,
      passwordHash: 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9'
    }
  ]
};

async function hashPassword(plain) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(plain));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}
