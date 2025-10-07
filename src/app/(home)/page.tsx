import { Suspense } from 'react';

import { UserGreeting } from './greeting';

export default async function Page() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      I will videos in the future: <UserGreeting />
    </Suspense>
  );
}
