### Error Page  - 
- page.tsx → route ফাইল, যেখানে শুধু ErrorCard কল করা হয়েছে।
- ErrorCard → আইকন + মেসেজ সহ error UI তৈরি করে।
- CardWrapper → common UI layout (Header, Footer, Social, BackButton) হ্যান্ডেল করে।


### Login Page  - 
- page.tsx → route ফাইল, যেখানে শুধু LoginForm কল করা হয়েছে।
- ErrorCard → আইকন + মেসেজ সহ error UI তৈরি করে।
- CardWrapper → common UI layout (Header, Footer, Social, BackButton) হ্যান্ডেল করে।






```python
my-next-app/
│── src/
│   │── app/                 
│   │   │── layout.tsx       
│   │   │── page.tsx         
│   │   │── globals.css      
│   │   │
│   │   ├── about/           
│   │   ├── dashboard/       
│   │   └── api/             
│   │
│   │── components/          
│   │   └── Header.tsx
│   │
│   │── styles/              
│   │   └── variables.css
│   │
│   │── hooks/        
│   │── data/   
│   │── lib/        
│   │── prisma/    
│   │── schemas/    
│   │── auth.ts   
│   │── auth.config.ts    
│   │── middleware.ts    
│   │── next-auth.d.ts     
│   │── routes.ts
│
│── public/                  
│   └── favicon.ico
│
│── package.json
│── tsconfig.json
│── next.config.js
│── tailwind.config.js
│── postcss.config.js
│── .gitignore
│── .eslintrc.json
│── next-env.d.ts
```