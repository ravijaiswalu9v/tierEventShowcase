## 🛠️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/tier-event-showcase.git
cd tier-event-showcase
```

2. **Install dependencies**
```bash
npm install
```

3. **Add environment variables**

Create a .env.local file in the root directory and add the following:
```
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the development server**
```
npm run dev
```

5. **Live Demo**
https://tier-event-showcase-nine.vercel.app/


6. ## 👤 Demo User Credentials
Use the following test accounts to log in and explore different tiers of event access:

| Tier      | Email                  | Password     |
|-----------|------------------------|--------------|
| Free      | free@demo.com          | Testuser@clerk25  |
| Silver    | silver@demo.com        | Testuser@clerk25  |
| Gold      | gold@demo.com          | Testuser@clerk25  |
| Platinum  | platinum@demo.com      | Testuser@clerk25  |



