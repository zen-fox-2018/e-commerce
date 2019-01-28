//copas command on mongod cli 

db.users.insertMany([{
  email: 'user1@mail.com',
  name: 'theo',
  role: 'admin',
  password: '12345',
},
{
  email:'user2@mail.com',
  name: 'dan',
  role:'admin',
  password: '12345',
},
{
  email:'user3@mail.com',
  name: 'test',
  role:'user',
  password: '12345',
})]

db.items.insertMany([
  
{
  name :'Indonesia',
  price : 500,
  category: 'Asia/Oceania',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl: 'assets/destinations/bali.jpg',
   createdBy:'5be8877e37899199b056664e'
},
{
  name :'China - Japan',
  price : 500,
  category: 'Asia/Oceania',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/japan.jpg',
   createdBy:'5be8877e37899199b056664e'
},
{
  name :'West Coast USA',
  price : 500,
  category: 'Americas',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/oceania-2.jpg',
   createdBy:'5be8877e37899199b056664e'
},
{
  name :'Latin-America',
  price : 500,
  category: 'Americas',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/usa.jpg',
   createdBy:'5be8877e37899199b056664e'
},
{
  name :'Scandinavia',
  price : 500,
  category: 'Europe',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/usa.jpg',
   createdBy:'5be8877e37899199b056664e'
},
{
  name :'Italy -Greece',
  price : 500,
  category: 'Europe',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/washington.jpg',
   createdBy:'5be8877e37899199b056664f'
},
{
  name :'Carribean',
  price : 500,
  category: 'Other',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/bahamas.jpg',
   createdBy:'5be8877e37899199b056664f'
},
{
  name :'South Africa -Madagascar',
  price : 500,
  category: 'Other',
  ratings : [4,3,3,3],
  reviews : ['ok room','somewhat enjoyable stay'],
  imageUrl:'assets/destinations/bali.jpg',
  createdBy:'5be8877e37899199b056664f'
}]
)