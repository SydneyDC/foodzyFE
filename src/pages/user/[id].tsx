import { useRouter } from 'next/router';
import { FC } from 'react';
import useSwr from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

type Props = {
   id: string;
   firstName: string;
   lastName: string;
   password: string;
   email: string;
};

const UserPage: FC<Props> = () => {
   const router = useRouter();

   const { data, error } = useSwr(
      router.query.id ? `/api/users/${router.query.id}` : null,
      fetcher,
   );

   if (error) return <div>Failed to load users</div>;
   if (!data) return <div>Loading...</div>;

   const { id, firstName, lastName, password, email } = data;

   return (
      <div>
         {data.map((user) => (
            <ul key={user.id}>
               <li>{user.id}</li>
               <li>{user.firstName}</li>
               <li>{user.lastName}</li>
               <li>{user.password}</li>
               <li>{user.email}</li>
            </ul>
         ))}
      </div>
   );
};

export default UserPage;
